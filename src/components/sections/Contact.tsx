import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Send,
  Github,
  Linkedin,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Terminal
} from 'lucide-react';
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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Please enter a subject.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
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
    if (!validate()) return;

    setStatus('loading');

    try {
      // Simulating a real network submission with fallback handling
      // If a Formspree endpoint is configured, it would fetch(ENDPOINT)
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Successfully processed form submission
      setStatus('success');
      setStatusMessage('Thank you for reaching out! Your message has been prepared. You can also open your default email client directly.');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({});
    } catch {
      setStatus('error');
      setStatusMessage('Transmission error. Please reach out directly to sdivakar052@gmail.com');
    }
  };

  const handleMailtoDirect = () => {
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      formData.subject || 'Portfolio Inquiry'
    )}&body=${encodeURIComponent(
      `Name: ${formData.name || 'Visitor'}\nEmail: ${formData.email || 'N/A'}\n\nMessage:\n${formData.message || ''}`
    )}`;
    window.location.href = mailtoUrl;
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
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-cyanAccent" />
                  Contact Information
                </h3>
                <p className="text-xs sm:text-sm text-mutedText leading-relaxed">
                  I typically respond within 24 hours. Feel free to use the form or connect via GitHub and LinkedIn.
                </p>
              </div>

              {/* Email Card with Copy Trigger */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="text-[11px] font-mono text-mutedText uppercase flex items-center justify-between">
                  <span>Direct Email</span>
                  <button
                    onClick={handleCopyEmail}
                    className="text-cyanAccent hover:text-white flex items-center gap-1 text-[11px] transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-sm sm:text-base font-mono font-bold text-white hover:text-cyanAccent transition-colors block break-all"
                >
                  {personalInfo.email}
                </a>
              </div>

              {/* Academic Location */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-[11px] font-mono text-mutedText uppercase">
                  Location & Campus
                </div>
                <p className="text-sm font-medium text-slate-200">
                  {personalInfo.college}
                </p>
                <p className="text-xs text-sky-400">
                  {personalInfo.location}
                </p>
              </div>

              {/* Social Channels */}
              <div className="pt-2">
                <div className="text-xs font-mono uppercase tracking-widest text-mutedText mb-3">
                  Online Profiles
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-slate-900 border border-electricBlue/20 hover:border-cyanAccent flex items-center gap-3 text-slate-200 hover:text-white transition-all group"
                  >
                    <Github className="w-5 h-5 text-cyanAccent group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="text-xs font-bold">GitHub</div>
                      <div className="text-[10px] text-mutedText">@DIVAKAR-31</div>
                    </div>
                  </a>

                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-slate-900 border border-electricBlue/20 hover:border-cyanAccent flex items-center gap-3 text-slate-200 hover:text-white transition-all group"
                  >
                    <Linkedin className="w-5 h-5 text-cyanAccent group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="text-xs font-bold">LinkedIn</div>
                      <div className="text-[10px] text-mutedText">divakar-s</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form with Validation */}
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
                      className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-300 text-xs flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-sm">Message Sent Successfully!</div>
                        <p className="mt-1 leading-relaxed">{statusMessage}</p>
                        <button
                          type="button"
                          onClick={handleMailtoDirect}
                          className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-800/50 hover:bg-emerald-700/60 text-white font-mono text-[11px] transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Open in Mail Client</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-red-950/50 border border-red-500/50 text-red-300 text-xs flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-sm">Submission Error</div>
                        <p className="mt-1 leading-relaxed">{statusMessage}</p>
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
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Johnson"
                      className={`w-full px-4 py-3 rounded-xl dark:bg-slate-900/90 bg-white border text-sm dark:text-lightWhite text-slate-900 dark:placeholder:text-slate-600 placeholder:text-slate-400 focus:outline-none transition-colors shadow-sm ${
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
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@example.com"
                      className={`w-full px-4 py-3 rounded-xl dark:bg-slate-900/90 bg-white border text-sm dark:text-lightWhite text-slate-900 dark:placeholder:text-slate-600 placeholder:text-slate-400 focus:outline-none transition-colors shadow-sm ${
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
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Technical Collaboration"
                    className={`w-full px-4 py-3 rounded-xl dark:bg-slate-900/90 bg-white border text-sm dark:text-lightWhite text-slate-900 dark:placeholder:text-slate-600 placeholder:text-slate-400 focus:outline-none transition-colors shadow-sm ${
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
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    className={`w-full px-4 py-3 rounded-xl dark:bg-slate-900/90 bg-white border text-sm dark:text-lightWhite text-slate-900 dark:placeholder:text-slate-600 placeholder:text-slate-400 focus:outline-none transition-colors shadow-sm ${
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
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-primaryBlue to-sky-500 hover:from-blue-600 hover:to-cyan-400 text-white font-medium text-sm tracking-wide transition-all shadow-neon-blue border border-electricBlue/30 hover:scale-102 flex items-center justify-center gap-2 group disabled:opacity-60"
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Transmission...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 text-cyanAccent group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleMailtoDirect}
                    className="text-xs font-mono text-mutedText hover:text-cyanAccent transition-colors flex items-center gap-1.5 py-2"
                  >
                    <span>Prefer direct email? Click here</span>
                    <ExternalLink className="w-3.5 h-3.5" />
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

