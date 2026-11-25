import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Github,
  Linkedin,
  CheckCircle2,
  AlertCircle,
  Copy,
  Terminal,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SectionHeading } from '../common/SectionHeading';
import { personalInfo } from '../../data/portfolioData';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Please enter a subject.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 5) {
      errs.message = 'Message must be at least 5 characters long.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent duplicate submissions while sending
    if (status === 'loading') return;

    if (!validate()) return;

    setStatus('loading');
    setStatusMessage('');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      // FormSubmit official AJAX endpoint with application/json
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(personalInfo.email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          _subject: `[Portfolio Contact] ${formData.subject.trim()} - from ${formData.name.trim()}`,
          _replyto: formData.email.trim(),
          _captcha: 'false',
          _template: 'table',
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Verify HTTP response status
      if (!response.ok) {
        let errDetail = `Server returned status ${response.status}.`;
        try {
          const errJson = await response.json();
          if (errJson?.message) errDetail = errJson.message;
        } catch {
          // fallback to status code
        }
        throw new Error(errDetail);
      }

      // Parse JSON response
      const result = await response.json();

      // FormSubmit returns { success: "true", message: "..." }
      const isSuccess =
        result &&
        (result.success === 'true' ||
          result.success === true ||
          (typeof result.message === 'string' &&
            result.message.toLowerCase().includes('success')));

      if (isSuccess) {
        setStatus('success');
        setStatusMessage(
          typeof result.message === 'string' && result.message.trim().length > 0
            ? result.message
            : 'Your message has been sent successfully! Thank you for reaching out.'
        );

        // Reset form fields
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setErrors({});

        // Celebratory confetti
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.7 },
            colors: ['#38BDF8', '#22D3EE', '#2563EB', '#10B981'],
          });
        } catch {
          // Ignore if blocked
        }
      } else {
        throw new Error(
          (result && result.message) ||
            'FormSubmit was unable to process your submission. Please try again.'
        );
      }
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      console.error('FormSubmit transmission error:', err);
      setStatus('error');
      if (err instanceof Error && err.name === 'AbortError') {
        setStatusMessage(
          'Request timed out. Please check your internet connection and try submitting again.'
        );
      } else if (err instanceof Error) {
        setStatusMessage(err.message);
      } else {
        setStatusMessage(
          'Unable to deliver message at this time. Please check your connection and retry.'
        );
      }
    }
  };

  const handleResetStatus = () => {
    setStatus('idle');
    setStatusMessage('');
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Direct Communication"
          title="Let's Connect & Collaborate"
          subtitle="Have a question, project proposal, or want to discuss technology? Send a message directly."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column: Direct Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-panel p-8 rounded-3xl border border-electricBlue/20 space-y-6">
              <div>
                <h3 className="text-xl font-bold dark:text-white text-slate-900 mb-2 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-cyanAccent" />
                  Contact Information
                </h3>
                <p className="text-xs sm:text-sm dark:text-mutedText text-slate-600 leading-relaxed">
                  I typically respond within 24 hours. Send a message using the form or connect through GitHub and LinkedIn.
                </p>
              </div>

              {/* Email Card with Copy Trigger */}
              <div className="p-4 rounded-2xl dark:bg-slate-900/80 bg-slate-100 border dark:border-slate-800 border-slate-200 space-y-2">
                <div className="text-[11px] font-mono dark:text-mutedText text-slate-500 uppercase flex items-center justify-between">
                  <span>Direct Email</span>
                  <button
                    onClick={handleCopyEmail}
                    className="text-cyanAccent hover:text-white flex items-center gap-1 text-[11px] transition-colors cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-sm sm:text-base font-mono font-bold dark:text-white text-slate-900 break-all select-all">
                  {personalInfo.email}
                </div>
              </div>

              {/* Academic Location */}
              <div className="p-4 rounded-2xl dark:bg-slate-900/80 bg-slate-100 border dark:border-slate-800 border-slate-200 space-y-1">
                <div className="text-[11px] font-mono dark:text-mutedText text-slate-500 uppercase">
                  Location & Campus
                </div>
                <p className="text-sm font-medium dark:text-slate-200 text-slate-800">
                  {personalInfo.college}
                </p>
                <p className="text-xs text-sky-400 font-medium">
                  {personalInfo.location}
                </p>
              </div>

              {/* Social Channels */}
              <div className="pt-2">
                <div className="text-xs font-mono uppercase tracking-widest dark:text-mutedText text-slate-500 mb-3">
                  Online Profiles
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl dark:bg-slate-900 bg-slate-100 border dark:border-electricBlue/20 border-slate-200 hover:border-cyanAccent flex items-center gap-3 dark:text-slate-200 text-slate-700 hover:text-cyanAccent transition-all group"
                  >
                    <Github className="w-5 h-5 text-cyanAccent group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="text-xs font-bold">GitHub</div>
                      <div className="text-[10px] dark:text-mutedText text-slate-500">@DIVAKAR-31</div>
                    </div>
                  </a>

                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl dark:bg-slate-900 bg-slate-100 border dark:border-electricBlue/20 border-slate-200 hover:border-cyanAccent flex items-center gap-3 dark:text-slate-200 text-slate-700 hover:text-cyanAccent transition-all group"
                  >
                    <Linkedin className="w-5 h-5 text-cyanAccent group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="text-xs font-bold">LinkedIn</div>
                      <div className="text-[10px] dark:text-mutedText text-slate-500">divakar-s</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Direct In-Page FormSubmit Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-electricBlue/20 relative shadow-card-glow">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Form Status Banner */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-sm text-emerald-300">
                            Message Transmitted Successfully!
                          </div>
                          <p className="mt-1 leading-relaxed text-emerald-200/90">
                            {statusMessage}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-emerald-500/30 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={handleResetStatus}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[11px] font-semibold transition-colors cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Send Another Message</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-5 rounded-2xl bg-rose-950/60 border border-rose-500/50 text-rose-200 text-xs space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-sm text-rose-300">
                            Message Delivery Failed
                          </div>
                          <p className="mt-1 leading-relaxed">{statusMessage}</p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-rose-500/30 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={handleResetStatus}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-mono text-[11px] font-semibold transition-colors cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Retry Submission</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider dark:text-mutedText text-slate-600 block mb-2">
                      Your Name <span className="text-cyanAccent">*</span>
                    </label>
                    <input
                      type="text"
                      disabled={status === 'loading'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Johnson"
                      className={`w-full px-4 py-3 rounded-xl dark:bg-slate-900/90 bg-white border text-sm dark:text-lightWhite text-slate-900 dark:placeholder:text-slate-600 placeholder:text-slate-400 focus:outline-none transition-colors shadow-sm disabled:opacity-60 ${
                        errors.name
                          ? 'border-red-500 focus:border-red-400'
                          : 'dark:border-slate-800 border-slate-300 focus:border-cyanAccent'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] font-mono text-rose-400 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider dark:text-mutedText text-slate-600 block mb-2">
                      Your Email <span className="text-cyanAccent">*</span>
                    </label>
                    <input
                      type="email"
                      disabled={status === 'loading'}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@example.com"
                      className={`w-full px-4 py-3 rounded-xl dark:bg-slate-900/90 bg-white border text-sm dark:text-lightWhite text-slate-900 dark:placeholder:text-slate-600 placeholder:text-slate-400 focus:outline-none transition-colors shadow-sm disabled:opacity-60 ${
                        errors.email
                          ? 'border-red-500 focus:border-red-400'
                          : 'dark:border-slate-800 border-slate-300 focus:border-cyanAccent'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] font-mono text-rose-400 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider dark:text-mutedText text-slate-600 block mb-2">
                    Subject <span className="text-cyanAccent">*</span>
                  </label>
                  <input
                    type="text"
                    disabled={status === 'loading'}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Technical Collaboration"
                    className={`w-full px-4 py-3 rounded-xl dark:bg-slate-900/90 bg-white border text-sm dark:text-lightWhite text-slate-900 dark:placeholder:text-slate-600 placeholder:text-slate-400 focus:outline-none transition-colors shadow-sm disabled:opacity-60 ${
                      errors.subject
                        ? 'border-red-500 focus:border-red-400'
                        : 'dark:border-slate-800 border-slate-300 focus:border-cyanAccent'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-[11px] font-mono text-rose-400 mt-1">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider dark:text-mutedText text-slate-600 block mb-2">
                    Message <span className="text-cyanAccent">*</span>
                  </label>
                  <textarea
                    rows={5}
                    disabled={status === 'loading'}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    className={`w-full px-4 py-3 rounded-xl dark:bg-slate-900/90 bg-white border text-sm dark:text-lightWhite text-slate-900 dark:placeholder:text-slate-600 placeholder:text-slate-400 focus:outline-none transition-colors shadow-sm disabled:opacity-60 ${
                      errors.message
                        ? 'border-red-500 focus:border-red-400'
                        : 'dark:border-slate-800 border-slate-300 focus:border-cyanAccent'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] font-mono text-rose-400 mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Action Controls */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-primaryBlue to-sky-500 hover:from-blue-600 hover:to-cyan-400 text-white font-medium text-sm tracking-wide transition-all shadow-neon-blue border border-electricBlue/30 hover:scale-102 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 text-cyanAccent group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
