import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  Button,
} from '@mui/material';

const ConfirmDeleteModal = ({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Delete Task</DialogTitle>
    <DialogContent>
      <Typography>Are you sure you want to delete this task?</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button variant="contained" color="error" onClick={onConfirm}>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDeleteModal;
