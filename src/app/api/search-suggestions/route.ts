import { NextRequest, NextResponse } from "next/server";
import https from "node:https";

type SearchEngine = "bing" | "google";

const maxSuggestions = 8;
const maxQueryLength = 80;
const requestTimeoutMs = 2500;

export const runtime = "nodejs";

function isSearchEngine(value: string | null): value is SearchEngine {
  return value === "bing" || value === "google";
}

function normalizeSuggestions(value: unknown): string[] {
  if (!Array.isArray(value) || !Array.isArray(value[1])) {
    return [];
  }

  const seen = new Set<string>();

  return value[1]
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter((item) => {
      const normalized = item.toLowerCase();

      if (!item || seen.has(normalized)) {
        return false;
      }

      seen.add(normalized);
      return true;
    })
    .slice(0, maxSuggestions);
}

async function fetchJsonWithTimeout(url: string): Promise<unknown | null> {
  return new Promise((resolve) => {
    let settled = false;

    function finish(value: unknown | null) {
      if (settled) {
        return;
      }

      settled = true;
      resolve(value);
    }

    const request = https.get(
      url,
      {
        family: 4,
        headers: {
          accept: "application/json,text/plain,*/*",
          "user-agent": "Mozilla/5.0 yizhesite-search-suggestions/0.1",
        },
        timeout: requestTimeoutMs,
      },
      (response) => {
        if (response.statusCode !== 200) {
          response.resume();
          finish(null);
          return;
        }

        response.setEncoding("utf8");

        let raw = "";

        response.on("data", (chunk: string) => {
          raw += chunk;
        });

        response.on("end", () => {
          try {
            finish(JSON.parse(raw));
          } catch {
            finish(null);
          }
        });
      },
    );

    request.on("timeout", () => {
      request.destroy();
      finish(null);
    });

    request.on("error", () => {
      finish(null);
    });
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const engine = searchParams.get("engine");
  const query = searchParams.get("q")?.trim() ?? "";

  if (!isSearchEngine(engine) || !query) {
    return NextResponse.json({ suggestions: [] });
  }

  const safeQuery = query.slice(0, maxQueryLength);
  const encodedQuery = encodeURIComponent(safeQuery);
  const url =
    engine === "bing"
      ? `https://api.bing.com/osjson.aspx?query=${encodedQuery}`
      : `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodedQuery}`;

  const data = await fetchJsonWithTimeout(url);

  return NextResponse.json({
    suggestions: normalizeSuggestions(data),
  });
}
