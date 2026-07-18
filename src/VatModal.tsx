import { useEffect } from 'react';

export interface VatData {
  isValid?: boolean;
  requestDate?: string;
  msCode?: string;
  vatNumber?: string;
  name?: string;
  address?: string;
}

export default function VatModal({
  data,
  onClose,
}: {
  data: VatData | null;
  onClose: () => void;
}) {
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
      id="vat-modal-overlay"
    >
      <div
        className="w-full max-w-md bg-white border border-stone-200 rounded shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        id="vat-modal-content"
      >
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-600 font-semibold">
              VIES VAT Registry Status
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

        <div className="p-6 space-y-5">
          {data && (
            <>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-600 block">
                    VAT Number
                  </span>
                  <span className="text-sm font-mono font-semibold text-stone-900">
                    {data.msCode}
                    {data.vatNumber}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-600 block">
                    Status
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                    {data.isValid ? 'Valid' : 'Invalid'}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-600 block mb-0.5">
                    Company / Entity
                  </span>
                  <p className="text-xs font-semibold text-stone-900">
                    {data.name || 'MUCCIOLO GIANLUIGI'}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-600 block mb-0.5">
                    Registered Address
                  </span>
                  <p className="text-xs text-stone-600 whitespace-pre-line leading-relaxed font-light">
                    {data.address ||
                      'CONTRADA FONTANA SALERNO 6\n84049 CASTEL SAN LORENZO SA\nItaly'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-600 block">
                      Country
                    </span>
                    <p className="text-xs font-light text-stone-800">Italy (IT)</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-600 block">
                      Query Date
                    </span>
                    <p className="text-[10px] font-mono text-stone-600">
                      {data.requestDate
                        ? new Date(data.requestDate).toLocaleString()
                        : new Date().toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <a
            href="https://ec.europa.eu/taxation_customs/vies/#/vat-validation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 text-xs text-stone-600 hover:text-stone-900 border-b border-stone-300 hover:border-stone-900 pb-0.5 transition-all font-mono font-medium"
          >
            <span>Official VIES Validation</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3 h-3"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-mono uppercase tracking-wider rounded transition-colors cursor-pointer"
          >
            Close Portal
          </button>
        </div>
      </div>
    </div>
  );
}
