interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmModal({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="confirm-modal">
        <div className="modal-icon">{danger ? "⚠️" : "❓"}</div>

        <h2 className="modal-title">{title}</h2>

        <p className="modal-description">{description}</p>

        <div className="modal-actions">
          <button className="modal-btn modal-cancel" onClick={onCancel}>
            {cancelText}
          </button>

          <button
            className={`modal-btn ${danger ? "modal-danger" : "modal-confirm"}`}
            onClick={() => {
              onConfirm();
              onCancel();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
