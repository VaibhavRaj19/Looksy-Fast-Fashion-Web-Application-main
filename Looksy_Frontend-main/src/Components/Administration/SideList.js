import * as React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link } from "@material-ui/core";
import { useTheme, useMediaQuery } from "@mui/material";

export default function SideList() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: isMobile ? "100%" : "auto",
        overflowX: isMobile ? "auto" : "visible",
      }}
    >
      <div
        style={{
          minWidth: isMobile ? "250px" : "auto",
          width: isMobile ? "100%" : "auto",
        }}
      >
        <List component="nav">
          <React.Fragment>
            <Link
              href={"/dashboard"}
              style={{
                textDecoration: "None",
                color: "black",
                display: "block",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: isMobile ? 56 : 48,
                  px: isMobile ? 2 : 2,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: isMobile ? 56 : 40 }}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Home"
                  primaryTypographyProps={{
                    fontSize: isMobile ? "16px" : "14px",
                  }}
                />
              </ListItemButton>
            </Link>

            <Link
              href={"/dashboard/category"}
              style={{
                textDecoration: "None",
                color: "black",
                display: "block",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: isMobile ? 56 : 48,
                  px: isMobile ? 2 : 2,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: isMobile ? 56 : 40 }}>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Category"
                  primaryTypographyProps={{
                    fontSize: isMobile ? "16px" : "14px",
                  }}
                />
              </ListItemButton>
            </Link>

            <Link
              href={"/dashboard/subcategory"}
              style={{
                textDecoration: "None",
                color: "black",
                display: "block",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: isMobile ? 56 : 48,
                  px: isMobile ? 2 : 2,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: isMobile ? 56 : 40 }}>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText
                  primary="SubCategory"
                  primaryTypographyProps={{
                    fontSize: isMobile ? "16px" : "14px",
                  }}
                />
              </ListItemButton>
            </Link>

            <Link
              href={"/dashboard/product"}
              style={{
                textDecoration: "None",
                color: "black",
                display: "block",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: isMobile ? 56 : 48,
                  px: isMobile ? 2 : 2,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: isMobile ? 56 : 40 }}>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Product"
                  primaryTypographyProps={{
                    fontSize: isMobile ? "16px" : "14px",
                  }}
                />
              </ListItemButton>
            </Link>

            <Link
              href={"/dashboard/size"}
              style={{
                textDecoration: "None",
                color: "black",
                display: "block",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: isMobile ? 56 : 48,
                  px: isMobile ? 2 : 2,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: isMobile ? 56 : 40 }}>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Size"
                  primaryTypographyProps={{
                    fontSize: isMobile ? "16px" : "14px",
                  }}
                />
              </ListItemButton>
            </Link>

            <Link
              href={"/dashboard/color"}
              style={{
                textDecoration: "None",
                color: "black",
                display: "block",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: isMobile ? 56 : 48,
                  px: isMobile ? 2 : 2,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: isMobile ? 56 : 40 }}>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Color"
                  primaryTypographyProps={{
                    fontSize: isMobile ? "16px" : "14px",
                  }}
                />
              </ListItemButton>
            </Link>

            <Link
              href={"/dashboard/dalle"}
              style={{
                textDecoration: "None",
                color: "black",
                display: "block",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: isMobile ? 56 : 48,
                  px: isMobile ? 2 : 2,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: isMobile ? 56 : 40 }}>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText
                  primary="AI-Image generation"
                  primaryTypographyProps={{
                    fontSize: isMobile ? "16px" : "14px",
                  }}
                />
              </ListItemButton>
            </Link>

            <Link
              href={"/dashboard/bannerimages"}
              style={{
                textDecoration: "None",
                color: "black",
                display: "block",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: isMobile ? 56 : 48,
                  px: isMobile ? 2 : 2,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: isMobile ? 56 : 40 }}>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Banner Images"
                  primaryTypographyProps={{
                    fontSize: isMobile ? "16px" : "14px",
                  }}
                />
              </ListItemButton>
            </Link>
          </React.Fragment>

          <Divider
            style={{
              width: "90%",
              margin: isMobile ? "16px auto" : "8px auto",
            }}
          />

          <React.Fragment>
            <Link
              href={"/dashboard/displayallcategory"}
              style={{
                textDecoration: "None",
                color: "black",
                display: "block",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: isMobile ? 56 : 48,
                  px: isMobile ? 2 : 2,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: isMobile ? 56 : 40 }}>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText
                  primary="DisplayCategory"
                  primaryTypographyProps={{
                    fontSize: isMobile ? "16px" : "14px",
                  }}
                />
              </ListItemButton>
            </Link>

            <Link
              href={"/dashboard/displayallsubcategory"}
              style={{
                textDecoration: "None",
                color: "black",
                display: "block",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: isMobile ? 56 : 48,
                  px: isMobile ? 2 : 2,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: isMobile ? 56 : 40 }}>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText
                  primary="DisplaySubCategory"
                  primaryTypographyProps={{
                    fontSize: isMobile ? "16px" : "14px",
                  }}
                />
              </ListItemButton>
            </Link>

            <Link
              href={"/dashboard/displayallproduct"}
              style={{
                textDecoration: "None",
                color: "black",
                display: "block",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: isMobile ? 56 : 48,
                  px: isMobile ? 2 : 2,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: isMobile ? 56 : 40 }}>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText
                  primary="DisplayProduct"
                  primaryTypographyProps={{
                    fontSize: isMobile ? "16px" : "14px",
                  }}
                />
              </ListItemButton>
            </Link>

            <Link
              href={"/dashboard/displayallsize"}
              style={{
                textDecoration: "None",
                color: "black",
                display: "block",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: isMobile ? 56 : 48,
                  px: isMobile ? 2 : 2,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: isMobile ? 56 : 40 }}>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText
                  primary="DisplaySize"
                  primaryTypographyProps={{
                    fontSize: isMobile ? "16px" : "14px",
                  }}
                />
              </ListItemButton>
            </Link>

            <Link
              href={"/dashboard/displayallcolor"}
              style={{
                textDecoration: "None",
                color: "black",
                display: "block",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: isMobile ? 56 : 48,
                  px: isMobile ? 2 : 2,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: isMobile ? 56 : 40 }}>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText
                  primary="DisplayColor"
                  primaryTypographyProps={{
                    fontSize: isMobile ? "16px" : "14px",
                  }}
                />
              </ListItemButton>
            </Link>
          </React.Fragment>
        </List>
      </div>
    </div>
  );
}
