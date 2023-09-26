import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

const SortingControl = ({ sortBy, onSortChange }) => {
  const handleChange = (event) => {
    onSortChange(event.target.value);
  };

  return (
    <FormControl>
      <div style={{ marginBottom: "0.5rem" }}>Sort By</div>
      <Select value={sortBy} onChange={handleChange}>
        <MenuItem value="date">Date</MenuItem>
        <MenuItem value="name">Name</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortingControl;
