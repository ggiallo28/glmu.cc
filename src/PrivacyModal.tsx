import { useEffect } from 'react';

export default function PrivacyModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs transition-opacity duration-300"
      onClick={onClose}
      id="privacy-modal-overlay"
    >
      <div
        className="w-full max-w-lg bg-white border border-stone-200 rounded shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        id="privacy-modal-content"
      >
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50 shrink-0">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-stone-500" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-600 font-semibold">
              Privacy Policy
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-stone-600 hover:text-stone-700 transition-colors p-1 rounded-full hover:bg-stone-100 cursor-pointer"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-5 overflow-y-auto">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-600 block mb-0.5">
              Data Controller
            </span>
            <p className="text-xs text-stone-700 font-light leading-relaxed">
              Gianluigi Mucciolo<br />
              Contrada Fontana Salerno 6<br />
              84049 Castel San Lorenzo SA, Italy<br />
              VAT: 06158220654<br />
              Email: gianlu@glmu.cc
            </p>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-600 block mb-0.5">
              Data We Collect
            </span>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              When you submit the contact form, we collect your name, email address, and company name. We use <strong className="font-medium text-stone-800">Web3Forms</strong> as the form processing service — your submission is sent to us via email through their API. We do not store form submissions in any database.
            </p>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-600 block mb-0.5">
              How We Use Your Data
            </span>
            <ul className="text-xs text-stone-600 font-light leading-relaxed list-disc list-inside space-y-1">
              <li>To respond to your inquiry</li>
              <li>To verify your corporate email before responding</li>
            </ul>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-600 block mb-0.5">
              Third-Party Services
            </span>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              <strong className="font-medium text-stone-800">Web3Forms</strong> processes contact form submissions. Their privacy policy is available at{' '}
              <a href="https://web3forms.com/privacy" target="_blank" rel="noopener" className="underline decoration-stone-300 hover:decoration-stone-600 transition-colors text-stone-600 hover:text-stone-900">
                web3forms.com/privacy
              </a>.
            </p>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-600 block mb-0.5">
              Data Retention
            </span>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              Emails sent via Web3Forms are retained in our mailbox. You may request deletion at any time by emailing gianlu@glmu.cc.
            </p>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-600 block mb-0.5">
              Your Rights (GDPR)
            </span>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              You have the right to access, rectify, erase, and port your data. To exercise these rights, contact gianlu@glmu.cc.
            </p>
          </div>

          <div className="text-[10px] font-mono text-stone-400 pt-2 border-t border-stone-100">
            Last updated: July 2026
          </div>
        </div>

        <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-mono uppercase tracking-wider rounded transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
