import { Fragment } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

export default function ConfirmDialog({
  open,
  onConfirm,
  onClose,
  dialogTitle,
  itemName,
}) {
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disablePortal={false}
        keepMounted={false}
        disableEnforceFocus={false}
        disableAutoFocus={false}
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {itemName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm} autoFocus color='error'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

ConfirmDialog.propTypes = {
  open: PropTypes.bool,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
  itemName: PropTypes.string,
  dialogTitle: PropTypes.string,
};
