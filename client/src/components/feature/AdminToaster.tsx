import { useEffect, useState } from 'react';
import { subscribeAdminToasts, type AdminToast } from '@/lib/adminToast';

const DISMISS_MS = 3200;

export default function AdminToaster() {
  const [toasts, setToasts] = useState<AdminToast[]>([]);

  useEffect(() => {
    return subscribeAdminToasts((toast) => {
      setToasts((prev) => [...prev, toast]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((item) => item.id !== toast.id));
      }, DISMISS_MS);
    });
  }, []);

  if (!toasts.length) return null;

  return (
    <div className="fixed top-20 right-4 z-[80] flex flex-col gap-2 w-[min(100%-2rem,360px)]">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg text-white ${
            toast.kind === 'error' ? 'bg-red-600' : 'bg-emerald-600'
          }`}
        >
          <i
            className={`${
              toast.kind === 'error' ? 'ri-error-warning-line' : 'ri-checkbox-circle-line'
            } text-lg leading-none mt-0.5`}
          ></i>
          <p className="text-sm font-medium leading-snug flex-1">{toast.message}</p>
          <button
            type="button"
            onClick={() => setToasts((prev) => prev.filter((item) => item.id !== toast.id))}
            className="text-white/80 hover:text-white cursor-pointer"
            aria-label="Dismiss"
          >
            <i className="ri-close-line text-lg"></i>
          </button>
        </div>
      ))}
    </div>
  );
}
