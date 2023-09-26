import React, { useState } from "react";
import { Button } from "@mui/material";
import { addProducts } from "../Api/api";
import ProductFormDialog from "./ProductFormDialog";
import Alert from "../Alert/Alert";

const AddProduct = ({ fetchProduct }) => {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [severity, setSeverity] = useState("");
  //   const [progress, setProgress] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleAddProduct = (newProduct) => {
    addProducts(newProduct).then((res) => {
      if (res?.status === "success") {
        fetchProduct();
        setMessage(res?.message);
        setSeverity("success");
        setOpen(true);
      }
    });
  };
  return (
    <>
      <div>
        <Button variant="outlined" onClick={handleOpen}>
          Add Product
        </Button>
        <ProductFormDialog
          open={openDialog}
          handleClose={handleClose}
          mode="add"
          initialProduct={{ name: "", date: "" }}
          onSubmit={handleAddProduct}
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

export default AddProduct;
