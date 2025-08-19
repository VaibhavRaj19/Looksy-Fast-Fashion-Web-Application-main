import { ServerURL } from "../../Services/NodeServices";
import { useNavigate } from 'react-router-dom';


export default function SmallCardComponent(props) {
  var navigate = useNavigate();
  const handleProductDetails = (item) => {
    navigate("/setproductdetails", {
      state: { product: JSON.stringify(item) },
    });
  };
  return props.data.map((item) => {
    return (
      <div
        key={item.subcategoryid}
        onClick={() => handleProductDetails(item)}
        style={{
          padding: 2,
          margin: 3,
          position: "relative",
          width: 330,
          height: 330,
          cursor: "pointer",
        }}
      >
        <img
          title={item.subcategoryname}
          // src={`${item.icon}`}
           src={`${item.icon}`}
          style={{ width: "95%", height: "95%" }}
        />
        <div
          style={{
            position: "absolute",
            top: "87%",
            color: "#FFF",
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
            width: "94%",
            zIndex: 1,
            background: "#0000002e",
          }}
        >
          {item.productname}
        </div>
      </div>
    );
  });
}
