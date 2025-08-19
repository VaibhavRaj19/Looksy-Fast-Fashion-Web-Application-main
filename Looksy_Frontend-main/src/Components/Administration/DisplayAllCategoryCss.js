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
    marginTop: 55,
    marginLeft: 200,
    marginRight: 5,
    background: "white",
    height: "auto",
    width: "55vw",
    borderRadius: 10,
  },
  headingText: {
    fontSize: 30,
    fontFamily: "Merriweather Sans",
    color: "#01579b",
    letterSpacing: 0.5,
    fontWeight: 700,
    display: "flex",
    justifyContent: "center",
  },
  gridStyle: {
    padding: 20,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
