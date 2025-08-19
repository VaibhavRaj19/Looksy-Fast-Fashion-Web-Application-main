import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function TwoCardComponent(props) {
  const navigate = useNavigate();

  const handleClick = (item) => {
    navigate(`/${props.url}/${item.categoryid}/${item.subcategoryid}`);
  };

  const dataToRender = props.data || [];

  if (dataToRender.length === 0) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        No items to display
      </div>
    );
  }

  return dataToRender.map((item) => (
    <div
      key={item.subcategoryid}
      onClick={() => handleClick(item)}
      style={{
        padding: 2,
        margin: 3,
        position: "relative",
        width: "100%",
        maxWidth: 580,
        height: 350,
        cursor: "pointer",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <img
        title={item.categoryname}
        src={item.subcategoryicon}
        style={{
          width: "60%",
          height: "100%",
          // objectFit: "cover",
          transition: "transform 0.3s ease",
        }}
        alt={item.subcategoryname || "Subcategory"}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://via.placeholder.com/580x350?text=Image+Not+Available";
        }}
      />
      <div
        style={{
          width: "56%",
          fontSize: 20,
          fontWeight: "bold",
          position: "absolute",
          bottom: 3,
          left: 119,
          right: 0,
          padding: "10px",
          color: "#FFF",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          textShadow: "1px 1px 3px rgba(0,0,0,0.8)",
        }}
      >
        {item.subcategoryname}
      </div>
    </div>
  ));
}

TwoCardComponent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      categoryid: PropTypes.string.isRequired,
      subcategoryid: PropTypes.string.isRequired,
      categoryname: PropTypes.string,
      subcategoryname: PropTypes.string,
      subcategoryicon: PropTypes.string.isRequired,
      bannerpriority: PropTypes.string,
    })
  ),
  url: PropTypes.string.isRequired,
};

TwoCardComponent.defaultProps = {
  data: [],
};
