import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Pagination } from "@mui/material";
import SortingControl from "../SortingController/SortingController";
import { styled } from "@mui/material/styles";
import DeleteProduct from "./DeleteProduct";
import { getProducts } from "../Api/api";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

const useStyles = styled((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
}));

const Products = () => {
  const classes = useStyles();
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("date");
  const [data, setData] = useState([]);

  const fetchProduct = async () => {
    const response = await getProducts();

    if (response?.status === "success") {
      setData(response?.data);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const sortedData = [...data].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const paginatedData = sortedData.slice(startIndex, endIndex);

  return (
    <div style={{ marginTop: "2rem" }}>
      <SortingControl sortBy={sortBy} onSortChange={handleSortChange} />
      <AddProduct fetchProduct={fetchProduct} />
      {data.length > 0 ? (
        <Grid container spacing={4}>
          {paginatedData?.map((item, index) => (
            <Grid item xs={4} key={index}>
              <Paper className={classes.paper}>
                <Typography variant="h5">{item.name}</Typography>
                <Typography variant="subtitle1">{item.date}</Typography>
                <EditProduct
                  fetchProduct={fetchProduct}
                  id={item.id}
                  productToEdit={item}
                />
                <DeleteProduct fetchProduct={fetchProduct} id={item.id} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No data provided</p>
      )}
      <div className={classes.paginationContainer}>
        <Pagination
          count={Math.ceil(data.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
};

export default Products;
