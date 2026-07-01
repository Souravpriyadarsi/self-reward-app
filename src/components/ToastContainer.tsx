import Toast from "./Toast";
import { useUIStore } from "../store/useUIStore";

function ToastContainer() {
  const toasts = useUIStore((state) => state.toasts);

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
}

export default ToastContainer;
