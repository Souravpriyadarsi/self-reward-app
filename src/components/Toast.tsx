import type { Toast as ToastType } from "../store/useUIStore";

interface Props {
  toast: ToastType;
}

function Toast({ toast }: Props) {
  const icons = {
    success: "✅",
    achievement: "🏆",
    reward: "🪙",
    error: "❌",
    info: "ℹ️",
  };

  return (
    <div className={`toast toast-${toast.type}`}>
      <div className="toast-icon">{icons[toast.type]}</div>

      <div className="toast-content">
        <div className="toast-title">{toast.title}</div>

        {toast.description && (
          <div className="toast-description">{toast.description}</div>
        )}
      </div>
    </div>
  );
}

export default Toast;
