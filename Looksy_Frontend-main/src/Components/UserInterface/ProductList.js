import React, { useState, useEffect } from "react";
import { Grid, CircularProgress, Alert } from "@mui/material";
import { postData } from "../Services/NodeServices";
import { useParams } from "react-router-dom";
import ProductDetailsComponent from "./UserComponents/ProductDetailsComponent";
import MainBar from "./UserComponents/MainBar";
import SearchBar from "./UserComponents/SearchBar";
import Footer from "./UserComponents/Footer";
import FilterComponent from "./UserComponents/FilterComponent";
import PropTypes from 'prop-types';

export default function ProductList() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { sid, cid } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchAllProductBySubCategory = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const body = { subcategoryid: sid, categoryid: cid };
        const result = await postData("api/products/fetch_all_product", body, { 
          signal: controller.signal 
        });

        if (result?.data) {
          setProductList(result.data);
          console.log("Fetched Products:", result.data);
        } else {
          setProductList([]);
          setError("No products available");
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError("Failed to load products");
          console.error("Error:", err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    if (sid && cid) {
      fetchAllProductBySubCategory();
    }

    return () => controller.abort();
  }, [sid, cid]);

  return (
    <div>
      <SearchBar setProductList={setProductList} search={true} />
      <MainBar />

      <div style={{ padding: "0 70px" }}>
        <div style={{ margin: "25px 0 10px" }}></div>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <FilterComponent setProductList={setProductList} />
        </Grid>
        <Grid item xs={9}>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            margin: "15px 40px",
            width: "95%",
            minHeight: "300px",
            padding: 2
          }}>
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : productList.length > 0 ? (
              <ProductDetailsComponent data={productList} />
            ) : (
              <Alert severity="info">No products found in this category</Alert>
            )}
          </div>
        </Grid>
      </Grid>

      <Footer />
    </div>
  );
}

ProductList.propTypes = {
  // Add if receiving any props
};