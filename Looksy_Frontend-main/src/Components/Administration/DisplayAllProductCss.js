import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  box: {
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 200,
    width: "70%",
    height: "auto",
    padding: 20,
    background: "white",
    borderRadius: 10,
  },
  gridStyle: {
    padding: 20,
  },
  headingText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    fontFamily: "Merriweather Sans",
    color: "#01579b",
    letterSpacing: 0.5,
    fontWeight: 700,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
