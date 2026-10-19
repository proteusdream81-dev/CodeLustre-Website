import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { ArrowRight, Check } from "lucide-react";

const types = [
  { id: "web", label: "Web" },
  { id: "app", label: "App" },
  { id: "both", label: "Both" },
];

export default function Contact() {
  const params = new URLSearchParams(window.location.search);
  const product = params.get("product");
  const waitlist = params.get("waitlist");
  const enquiry = product || waitlist;
  const defaultMessage = product
    ? `I'd like to order the ${product}.`
    : waitlist
      ? `Add me to the ${waitlist} waitlist.`
      : "";
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    project_type: "both",
    message: defaultMessage,
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError("Please add your name and email.");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      await base44.entities.Lead.create({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        project_type: form.project_type,
        message: form.message.trim(),
        status: "new",
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError("Something went wrong. Please try again or reach us directly.");
    }
  };

  if (status === "success") {
    return (
      <section id="contact" className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Check className="w-7 h-7 text-primary" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">Thanks, we&apos;ll be in touch.</h2>
          <p className="mt-4 text-muted-foreground">Your project brief is in. We&apos;ll reply within one business day.</p>
          <button
            onClick={() => { setStatus("idle"); setForm({ name: "", email: "", company: "", project_type: "both", message: defaultMessage }); }}
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Send another brief <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">[ Start a project ]</div>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              Let&apos;s build something that launches.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-md">
              Tell us a little about your project. We&apos;ll get back to you within one business day to talk scope, timeline, and next steps.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-6">
            {enquiry && (
              <div className="inline-block font-mono text-xs uppercase tracking-widest text-primary border border-primary/30 rounded-full px-3 py-1">
                {product ? "Shop enquiry" : "Waitlist"} · {enquiry}
              </div>
            )}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Name</label>
                <input value={form.name} onChange={update("name")} className="mt-2 w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-chart-2 transition" placeholder="Your name" />
              </div>
              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Email</label>
                <input type="email" value={form.email} onChange={update("email")} className="mt-2 w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-chart-2 transition" placeholder="you@company.com" />
              </div>
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Company <span className="lowercase">(optional)</span></label>
              <input value={form.company} onChange={update("company")} className="mt-2 w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-chart-2 transition" placeholder="Company name" />
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Project type</label>
              <div className="mt-2 flex gap-3">
                {types.map((t) => (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => setForm({ ...form, project_type: t.id })}
                    className={`flex-1 px-4 py-3 rounded-md border text-sm font-medium transition ${form.project_type === t.id ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Project details</label>
              <textarea value={form.message} onChange={update("message")} rows={4} className="mt-2 w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-chart-2 transition resize-none" placeholder="What are you building, and what does success look like?" />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition disabled:opacity-50 shadow-[0_0_40px_-12px_hsl(var(--primary))]"
            >
              {status === "submitting" ? "Sending…" : "Send brief"} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}