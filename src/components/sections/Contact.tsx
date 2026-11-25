import React, { useState, useRef, useEffect } from 'react';
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
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const isSubmittingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (status === 'loading') {
      setElapsedSeconds(0);
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setElapsedSeconds(0);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [status]);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent duplicate submissions while in-flight
    if (status === 'loading') {
      e.preventDefault();
      return;
    }

    if (!validate()) {
      e.preventDefault();
      return;
    }

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      e.preventDefault();
      setStatus('error');
      setStatusMessage('You appear to be offline. Please check your internet connection and try again.');
      return;
    }

    setStatus('loading');
    setStatusMessage('Transmitting message via FormSubmit secure gateway...');
    isSubmittingRef.current = true;

    // Safety timeout: 90 seconds (FormSubmit mail routing may take 30-60s during peak traffic)
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (isSubmittingRef.current) {
        isSubmittingRef.current = false;
        setStatus('error');
        setStatusMessage(
          'Transmission took longer than expected. Please check your internet connection or reach out directly at ' +
            personalInfo.email
        );
      }
    }, 90000);

    // Form will naturally submit via POST to the hidden iframe target
  };

  const handleIframeLoad = () => {
    // Only react if submission was actively in-flight
    if (!isSubmittingRef.current) {
      return;
    }

    isSubmittingRef.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setStatus('success');
    setStatusMessage('Your message has been sent successfully! Thank you for reaching out.');

    // Clear form fields
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
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
      // Ignore if confetti blocked
    }
  };

  const handleResetStatus = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    isSubmittingRef.current = false;
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
              {/* Hidden iframe target for seamless in-page FormSubmit delivery */}
              <iframe
                name="formsubmit_iframe"
                id="formsubmit_iframe"
                title="FormSubmit Target Frame"
                className="hidden"
                style={{ display: 'none', width: 0, height: 0, border: 0 }}
                onLoad={handleIframeLoad}
              />

              <form
                action={`https://formsubmit.co/${personalInfo.email}`}
                method="POST"
                target="formsubmit_iframe"
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate
              >
                {/* FormSubmit Directives */}
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input
                  type="hidden"
                  name="_subject"
                  value={`[Portfolio Contact] ${formData.subject.trim() || 'New Message'} - from ${formData.name.trim() || 'Visitor'}`}
                />
                <input type="hidden" name="_replyto" value={formData.email.trim()} />

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
                      name="name"
                      readOnly={status === 'loading'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Johnson"
                      className={`w-full px-4 py-3 rounded-xl dark:bg-slate-900/90 bg-white border text-sm dark:text-lightWhite text-slate-900 dark:placeholder:text-slate-600 placeholder:text-slate-400 focus:outline-none transition-colors shadow-sm ${
                        status === 'loading' ? 'opacity-60 cursor-not-allowed' : ''
                      } ${
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
                      name="email"
                      readOnly={status === 'loading'}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@example.com"
                      className={`w-full px-4 py-3 rounded-xl dark:bg-slate-900/90 bg-white border text-sm dark:text-lightWhite text-slate-900 dark:placeholder:text-slate-600 placeholder:text-slate-400 focus:outline-none transition-colors shadow-sm ${
                        status === 'loading' ? 'opacity-60 cursor-not-allowed' : ''
                      } ${
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
                    name="subject"
                    readOnly={status === 'loading'}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Technical Collaboration"
                    className={`w-full px-4 py-3 rounded-xl dark:bg-slate-900/90 bg-white border text-sm dark:text-lightWhite text-slate-900 dark:placeholder:text-slate-600 placeholder:text-slate-400 focus:outline-none transition-colors shadow-sm ${
                      status === 'loading' ? 'opacity-60 cursor-not-allowed' : ''
                    } ${
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
                    name="message"
                    rows={5}
                    readOnly={status === 'loading'}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    className={`w-full px-4 py-3 rounded-xl dark:bg-slate-900/90 bg-white border text-sm dark:text-lightWhite text-slate-900 dark:placeholder:text-slate-600 placeholder:text-slate-400 focus:outline-none transition-colors shadow-sm ${
                      status === 'loading' ? 'opacity-60 cursor-not-allowed' : ''
                    } ${
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

                  {status === 'loading' && (
                    <div className="flex flex-col gap-1 text-left">
                      <div className="text-[12px] font-mono dark:text-cyanAccent text-blue-600 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                        <span>
                          {elapsedSeconds < 8
                            ? 'Connecting to FormSubmit gateway...'
                            : elapsedSeconds < 35
                            ? 'FormSubmit is routing email to inbox...'
                            : 'Awaiting mail server delivery confirmation...'}
                        </span>
                        <span className="dark:text-slate-400 text-slate-500 text-[11px] font-bold">
                          ({elapsedSeconds}s)
                        </span>
                      </div>
                      <p className="text-[10px] dark:text-slate-400 text-slate-500 font-mono">
                        FormSubmit verifies outbound delivery through spam filters before returning confirmation. Please do not close this tab.
                      </p>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
