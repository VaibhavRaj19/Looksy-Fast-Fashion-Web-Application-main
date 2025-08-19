import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import useStyles from "./setProductDetailsLogoCss";
import ft from "../../../Assets/ft.png";

export default function SetProductDetailsLogo() {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <div className={classes.root}>
        <FormatQuoteIcon />
        <i>Fashion That Never Ends</i>
        <FormatQuoteIcon />
      </div>
      <div className={classes.content}>
        We provide free shipping on all orders. Pay online to avoid charges of
        ₹50/product applicable on COD orders. The return or exchange can be done
        within 15 days after delivery. Every delivery from{" "}
        <b>
          <i> Looksy – Fast Fashion </i>
        </b>{" "}
        is processed under excellent condition and in the fastest time possible.
        for our beloved customer’s care, we give contactless delivery. Refer to
        FAQ for more information.
      </div>
      <div className={classes.quote}>
        WE PROVIDE BETTER....{" "}
        <img src={ft} width="20%" style={{ marginLeft: 90 }} />
      </div>
    </div>
  );
}
