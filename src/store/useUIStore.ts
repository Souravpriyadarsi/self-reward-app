import { create } from "zustand";

export type ToastType = "success" | "achievement" | "reward" | "error" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface UIStore {
  toasts: Toast[];

  showToast: (toast: Omit<Toast, "id">) => void;

  removeToast: (id: string) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  toasts: [],

  showToast: (toast) => {
    const id = crypto.randomUUID();

    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 4000);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
