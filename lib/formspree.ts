const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqpqlryl";

/**
 * Forward a validated website enquiry to the shared Formspree inbox.
 * Values are flattened so arrays and structured fields remain readable in submissions.
 */
export async function forwardToFormspree(
  payload: Record<string, unknown>,
  subject: string,
): Promise<boolean> {
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined || value === null) continue;
    const normalized = Array.isArray(value)
      ? value.map((item) => String(item)).join(", ")
      : typeof value === "object"
        ? JSON.stringify(value)
        : String(value);
    body.append(key, normalized);
  }
  body.set("_subject", subject.slice(0, 180));

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      console.error("Formspree submission failed", { status: response.status });
      return false;
    }
    return true;
  } catch {
    console.error("Formspree submission request failed");
    return false;
  }
}
