import { createClientFromRequest } from "npm:@base44/sdk@0.8.54";

// Native, JavaScript-free fallback for the public contact form on index.html.
// A plain HTML form POST lands here; we validate it and record a Lead, then
// return a finished HTML page so the visitor never needs JavaScript.
const SITE_URL = "https://codelustre.com";
const PROJECT_TYPES = ["web", "app", "both"];
const LIMITS = { name: 120, email: 200, company: 160, message: 4000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function htmlPage(status, heading, text) {
  const body = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="noindex" />
<title>${heading} | CodeLustre</title>
<style>
  :root { color-scheme: dark; }
  body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #080808; color: #f1f1f1; font-family: "Inter", system-ui, -apple-system, Segoe UI, Arial, sans-serif; padding: 32px; }
  main { max-width: 34rem; border: 1px solid #242424; border-radius: 6px; background: #0e0e0e; padding: 40px; }
  h1 { margin: 0 0 12px; font-family: "Space Grotesk", system-ui, sans-serif; font-size: 1.75rem; line-height: 1.2; }
  p { margin: 0 0 24px; color: #a0a0a0; line-height: 1.6; }
  a { color: #c8ff00; font-weight: 600; text-decoration: none; }
  a:hover { text-decoration: underline; }
</style>
</head>
<body>
<main>
<h1>${heading}</h1>
<p>${text}</p>
<a href="${SITE_URL}">Back to CodeLustre</a>
</main>
</body>
</html>`;
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}

const invalid = () =>
  htmlPage(400, "We need a couple more details", "Please go back and add your name and a valid email address, then send again.");

export default async function (req) {
  try {
    if (req.method !== "POST") {
      return htmlPage(405, "This page only accepts enquiries", "Head back to the contact form and send your project brief from there.");
    }

    const form = await req.formData().catch(() => null);
    if (!form) return invalid();

    const field = (key) => String(form.get(key) ?? "").trim();

    // Bots fill the hidden field; a real visitor never sees it.
    if (field("website")) {
      return htmlPage(200, "Thanks, we'll be in touch.", "Your brief is in. We reply to every enquiry within one business day.");
    }

    const name = field("name").slice(0, LIMITS.name);
    const email = field("email").slice(0, LIMITS.email);
    const company = field("company").slice(0, LIMITS.company);
    const message = field("message").slice(0, LIMITS.message);
    const requestedType = field("project_type");
    const projectType = PROJECT_TYPES.includes(requestedType) ? requestedType : "both";

    if (!name || !EMAIL_PATTERN.test(email)) return invalid();

    const base44 = createClientFromRequest(req);
    await base44.asServiceRole.entities.Lead.create({
      name,
      email,
      company,
      project_type: projectType,
      message,
      status: "new",
    });

    return htmlPage(
      200,
      "Thanks, we'll be in touch.",
      "Your project brief is in. We reply to every enquiry within one business day."
    );
  } catch (error) {
    console.log("submitLead: could not record the enquiry", error?.message || error);
    return htmlPage(500, "Something went wrong", "Your brief didn't reach us. Please try again in a moment.");
  }
}