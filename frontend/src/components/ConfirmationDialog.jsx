import PropTypes from "prop-types";

export default function ConfirmationDialog({ open, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="confirmation-dialog">
      <p>Êtes-vous sûr de vouloir supprimer votre compte ?</p>
      <button type="button" onClick={onConfirm}>
        Oui
      </button>
      <button type="button" onClick={onCancel}>
        Non
      </button>
    </div>
  );
}

ConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
