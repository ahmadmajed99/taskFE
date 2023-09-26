import React from "react";
import { useState } from "react";
import ProductFormDialog from "./ProductFormDialog";
import IconButton from "@mui/material/IconButton";
import { editProducts } from "../Api/api";
import EditIcon from "@mui/icons-material/Edit";
import Alert from "../Alert/Alert";

const EditProduct = ({ fetchProduct, id, productToEdit }) => {
  //   const [progress, setProgress] = useState(false);
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

  const handleEditProduct = (editedProduct) => {
    editProducts(editedProduct, id).then((res) => {
      if (res?.status === "success") {
        fetchProduct();
        // setProgress(false);
        setMessage(res.message);
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
          <EditIcon variant="outlined" color="primary">
            Edit
          </EditIcon>
        </IconButton>
        <ProductFormDialog
          open={dialogOpen}
          handleClose={handleClose}
          mode="edit"
          initialProduct={productToEdit}
          onSubmit={handleEditProduct}
        />
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

export default EditProduct;
