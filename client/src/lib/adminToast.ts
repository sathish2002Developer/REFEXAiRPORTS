export type AdminToastKind = 'success' | 'error';

export type AdminToast = {
  id: number;
  kind: AdminToastKind;
  message: string;
};

type Listener = (toast: AdminToast) => void;

const listeners = new Set<Listener>();
let nextId = 1;

export function subscribeAdminToasts(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function showAdminToast(message: string, kind: AdminToastKind = 'success') {
  const toast: AdminToast = { id: nextId++, kind, message };
  listeners.forEach((listener) => listener(toast));
}

export const adminToast = {
  saved: () => showAdminToast('Saved successfully'),
  added: () => showAdminToast('Added successfully'),
  deleted: () => showAdminToast('Deleted successfully'),
  updated: () => showAdminToast('Updated successfully'),
  error: (message = 'Something went wrong') => showAdminToast(message, 'error'),
};
