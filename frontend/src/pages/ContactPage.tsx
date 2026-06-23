import { useState, type FormEvent, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { submitContactForm, type ContactPayload } from "../utils/api";

const initialForm: ContactPayload = { name: "", email: "", subject: "", message: "" };

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validate(payload: ContactPayload): FieldErrors {
  const errors: FieldErrors = {};
  if (payload.name.length < 2 || payload.name.length > 100) errors.name = "Name must be between 2 and 100 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) errors.email = "A valid email address is required.";
  if (payload.subject.length < 3 || payload.subject.length > 200) errors.subject = "Subject must be between 3 and 200 characters.";
  if (payload.message.length < 10 || payload.message.length > 5000) errors.message = "Message must be between 10 and 5000 characters.";
  return errors;
}

function FormField({ label, name, value, error, multiline, onChange }: {
  label: string;
  name: keyof ContactPayload;
  value: string;
  error?: string;
  multiline?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  const inputClass =
    "w-full bg-deep-void border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-muted/50 transition-colors duration-200 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20";

  return (
    <div>
      <label htmlFor={name} className="block text-xs font-medium text-text-secondary mb-1.5 font-mono uppercase tracking-wider">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={5}
          placeholder={`Your ${label.toLowerCase()}...`}
          className={`${inputClass} resize-y min-h-[100px]`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={name === "email" ? "email" : "text"}
          value={value}
          onChange={onChange}
          placeholder={`Your ${label.toLowerCase()}`}
          className={inputClass}
        />
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-error mt-1.5 font-mono"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactPayload>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setStatus("sending");
    setServerError("");

    try {
      await submitContactForm(form);
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
              <svg aria-hidden="true" className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gradient mb-2">Message sent!</h1>
            <p className="text-text-secondary mb-8">Thank you for reaching out. I&apos;ll get back to you shortly.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Back to Command Center
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary font-mono transition-colors"
          >
            <svg aria-hidden="true" className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Command Center
          </Link>
        </motion.div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono text-primary bg-primary/10 border border-primary/20 rounded-full mb-4">
            <svg aria-hidden="true" className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            GET IN TOUCH
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Let&apos;s <span className="text-gradient">Connect</span>
          </h1>
          <p className="mt-3 text-text-secondary max-w-xl mx-auto">
            Have a project in mind or just want to say hi? Drop me a message and I&apos;ll reply as soon as possible.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-lg mx-auto"
        >
          <form onSubmit={handleSubmit} className="glass-border rounded-xl p-6 sm:p-8 space-y-5" noValidate>
            <FormField label="Name" name="name" value={form.name} error={errors.name} onChange={handleChange} />
            <FormField label="Email" name="email" value={form.email} error={errors.email} onChange={handleChange} />
            <FormField label="Subject" name="subject" value={form.subject} error={errors.subject} onChange={handleChange} />
            <FormField label="Message" name="message" value={form.message} error={errors.message} multiline onChange={handleChange} />

            {status === "error" && serverError && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-error font-mono bg-error/5 border border-error/20 rounded-lg px-4 py-3"
              >
                {serverError}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={status !== "sending" ? { scale: 1.02 } : undefined}
              whileTap={status !== "sending" ? { scale: 0.98 } : undefined}
              className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? (
                <>
                  <svg aria-hidden="true" className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Message
                </>
              )}
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <span className="text-xs text-text-muted font-mono">
              &gt; Responses typically within 24 hours
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
