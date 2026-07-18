import { useState } from 'preact/hooks';

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    company: '',
    email: '',
    area: 'Cloud Infrastructure',
    message: ''
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const { name, value } = target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: Event) => {
    e.preventDefault();
    setFormError(null);

    const { name, company, email, message } = formState;

    if (!name.trim() || !company.trim() || !email.trim() || !message.trim()) {
      setFormError('Please complete all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setFormError('Please enter a valid business email address.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSuccess(true);
      setFormState({
        name: '',
        company: '',
        email: '',
        area: 'Cloud Infrastructure',
        message: ''
      });
    }, 1000);
  };

  return (
    <div className="md:col-span-7">
      <div className="p-6 sm:p-8 rounded border border-stone-200 bg-[#FAF9F6]">
        {formSuccess ? (
          <div id="form-success-container" className="text-center py-8">
            <span className="p-2 bg-stone-100 text-stone-800 rounded-full inline-block mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
            </span>
            <h3 className="font-display font-semibold text-sm text-stone-950 mb-1">Inquiry Registered</h3>
            <p className="text-xs text-stone-600 max-w-xs mx-auto font-light leading-relaxed">
              Technical specification sheet has been filed. An architect will connect shortly.
            </p>
            <button
              onClick={() => setFormSuccess(false)}
              className="mt-4 text-xs font-mono uppercase tracking-wider text-stone-950 border-b border-stone-950 hover:border-transparent pb-0.5 transition-all"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {formError && (
              <div id="form-error-container" className="p-3 text-[11px] bg-stone-100 border border-stone-200 text-stone-700 rounded font-mono">
                {formError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-[10px] font-mono uppercase tracking-wider text-stone-600 mb-1 font-medium">Contact Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-3 py-2 bg-white border border-stone-200 text-stone-900 placeholder-stone-400 text-xs rounded focus:outline-none focus:border-stone-400"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-[10px] font-mono uppercase tracking-wider text-stone-600 mb-1 font-medium">Organization *</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formState.company}
                  onChange={handleInputChange}
                  placeholder="Acme Corp"
                  required
                  className="w-full px-3 py-2 bg-white border border-stone-200 text-stone-900 placeholder-stone-400 text-xs rounded focus:outline-none focus:border-stone-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-[10px] font-mono uppercase tracking-wider text-stone-600 mb-1 font-medium">Business Email *</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  placeholder="j.doe@company.com"
                  required
                  className="w-full px-3 py-2 bg-white border border-stone-200 text-stone-900 placeholder-stone-400 text-xs rounded focus:outline-none focus:border-stone-400"
                />
              </div>
              <div>
                <label htmlFor="area" className="block text-[10px] font-mono uppercase tracking-wider text-stone-600 mb-1 font-medium">Practice Area</label>
                <select
                  id="area"
                  name="area"
                  value={formState.area}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white border border-stone-200 text-stone-900 text-xs rounded focus:outline-none focus:border-stone-400 cursor-pointer"
                >
                  <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="Enablement / Workshops">Enablement / Workshops</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-[10px] font-mono uppercase tracking-wider text-stone-600 mb-1 font-medium">Requirements *</label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={formState.message}
                onChange={handleInputChange}
                placeholder="Core deliverables..."
                required
                className="w-full px-3 py-2 bg-white border border-stone-200 text-stone-900 placeholder-stone-400 text-xs rounded focus:outline-none focus:border-stone-400 resize-none font-light"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-stone-950 hover:bg-stone-800 disabled:bg-stone-300 text-white text-xs font-mono uppercase tracking-widest rounded transition-colors cursor-pointer"
            >
              {isSubmitting ? 'Submitting...' : 'Send Corporate Inquiry'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
