import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { deleteProducts } from "../Api/api";
import IconButton from "@mui/material/IconButton";
import Alert from "../Alert/Alert";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteProduct = ({ onClose, fetchProduct, id }) => {
  // const [progress, setProgress] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const handleOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    // setProgress(true);
    deleteProducts(id).then((res) => {
      if (res?.status === "success") {
        fetchProduct();
        // setProgress(false);
        setMessage(res?.message);
        setSeverity("success");
        setOpen(true);
        setDialogOpen(false);
      }
    });
  };

  return (
    <>
      <div>
        <IconButton aria-label="Edit" onClick={handleOpen}>
          <DeleteIcon variant="outlined" color="error">
            Delete
          </DeleteIcon>
        </IconButton>
        <Dialog open={dialogOpen} onClose={onClose}>
          <DialogTitle>Delete Item</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this item?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Alert
          message={message}
          open={open}
          setOpen={setOpen}
          severity={severity}
        ></Alert>
      </div>
    </>
  );
};

export default DeleteProduct;
