import "server-only";

// Screenshot an external URL for a project thumbnail. Uses microlink (free tier
// works with no key; SCREENSHOT_API_KEY raises the rate limit if set).
export async function screenshotUrl(
  url: string,
): Promise<{ bytes: ArrayBuffer; contentType: string }> {
  const api = new URL("https://api.microlink.io/");
  api.searchParams.set("url", url);
  api.searchParams.set("screenshot", "true");
  api.searchParams.set("meta", "false");

  const headers: Record<string, string> = {};
  const key = process.env.SCREENSHOT_API_KEY;
  if (key) headers["x-api-key"] = key;

  const res = await fetch(api, { headers });
  if (!res.ok) throw new Error(`Screenshot service error ${res.status}`);
  const json = (await res.json()) as {
    data?: { screenshot?: { url?: string } };
  };
  const shot = json.data?.screenshot?.url;
  if (!shot) throw new Error("No screenshot returned for that URL.");

  const img = await fetch(shot);
  if (!img.ok) throw new Error("Could not download the screenshot.");
  return {
    bytes: await img.arrayBuffer(),
    contentType: img.headers.get("content-type") || "image/png",
  };
}
