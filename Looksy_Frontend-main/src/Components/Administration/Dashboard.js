import * as React from "react";
// App Bar
import AdminAppBar from "./AdminAppBar";
// Side List
import SideList from "./SideList";
import { Routes, Route } from "react-router-dom";
// Administration Component
import Category from "./Category";
import DisplayAllCategory from "./DisplayAllCategory";
import SubCategory from "./SubCategory";
import DisplayAllSubCategory from "./DisplayAllSubCategory";
import Product from "./Product";
import DisplayAllProduct from "./DisplayAllProduct";
import Size from "./Size";
import DisplayAllSize from "./DisplayAllSize";
import Color from "./Color";
import DisplayAllColor from "./DisplayAllColor";
import BannerImages from "./BannerImages";
import Dalle from "./Dalle";
// Jwt Required fn
import { isValidAuth } from "../Services/NodeServices";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

export default function Dashboard(props) {
  // Jwt Manupilation..............
  const [authState, setAuthState] = useState(false);
  const checkAuth = async () => {
    var result = await isValidAuth();
    if (result.auth) {
      setAuthState(true);
    } else {
      setAuthState(false);
      // navigate('/adminlogin')
    }
  };
  useEffect(function () {
    checkAuth();
  }, []);
  // ...............................

  return (
    <div>
      {authState ? (
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <AdminAppBar />

          <div style={{ display: "flex" }}>
            <div style={{ width: "15%" }}>
              <SideList />
            </div>
            <div
              style={{
                width: "85%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "80vh",
              }}
            >
              <Routes>
                <Route element={<Category />} path="/category" />
                <Route
                  element={<DisplayAllCategory />}
                  path="/displayallcategory"
                />
                <Route element={<SubCategory />} path="/subcategory" />
                <Route
                  element={<DisplayAllSubCategory />}
                  path="/displayallsubcategory"
                />
                <Route element={<Product />} path="/product" />
                <Route
                  element={<DisplayAllProduct />}
                  path="/displayallproduct"
                />
                <Route element={<Size />} path="/size" />
                <Route element={<DisplayAllSize />} path="/displayallsize" />
                <Route element={<Color />} path="/color" />
                <Route element={<DisplayAllColor />} path="/displayallcolor" />
                <Route element={<BannerImages />} path="/bannerimages" />
                <Route element={<Dalle />} path="/dalle" />
                {/* Default dashboard view when no route matches */}
                <Route
                  path="*"
                  element={
                    <div
                      style={{
                        textAlign: "center",
                        padding: "2rem",
                        maxWidth: "800px",
                      }}
                    >
                      <h1
                        style={{
                          fontSize: "2.5rem",
                          marginBottom: "1rem",
                          color: "#1976d2",
                        }}
                      >
                        Welcome to Admin Dashboard
                      </h1>
                      <p
                        style={{
                          fontSize: "1.2rem",
                          marginBottom: "2rem",
                          color: "#555",
                        }}
                      >
                        Manage your store efficiently with our comprehensive
                        admin panel
                      </p>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1329/1329016.png"
                        alt="Dashboard"
                        style={{
                          width: "300px",
                          height: "auto",
                          opacity: 0.8,
                        }}
                      />
                    </div>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1>
            <Spinner />
          </h1>
        </>
      )}
    </div>
  );
}
