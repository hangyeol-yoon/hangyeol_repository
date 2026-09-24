import React, { useEffect } from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div className="pointer-events-auto bg-[#3D2C27] text-white p-4 rounded-2xl shadow-xl border border-[#5C4A3E] flex items-start space-x-3 text-left animate-in slide-in-from-bottom duration-200">
      <div className="shrink-0 mt-0.5">
        {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#BDE0BD]" />}
        {toast.type === 'info' && <Info className="w-5 h-5 text-[#E8D0B3]" />}
        {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-[#D4AF37]" />}
      </div>

      <div className="flex-1">
        <h5 className="font-bold text-xs text-[#FAF7F2]">{toast.title}</h5>
        <p className="text-xs text-[#D8C8B8] mt-0.5 leading-relaxed">{toast.message}</p>
      </div>

      <button
        onClick={() => onDismiss(toast.id)}
        className="text-[#9A8B7E] hover:text-white p-1 transition-colors cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
