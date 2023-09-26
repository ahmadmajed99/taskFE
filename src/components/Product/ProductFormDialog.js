import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ProductFormDialog = ({
  open,
  handleClose,
  mode,
  initialProduct,
  onSubmit,
}) => {
  const [product, setProduct] = useState(initialProduct);

  useEffect(() => {
    setProduct(initialProduct);
  }, [initialProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(product);
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {mode === "add" ? "Add Product" : "Edit Product"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          value={product.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {mode === "add" ? "Add" : "Save"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
