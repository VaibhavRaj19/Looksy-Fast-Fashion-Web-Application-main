import { useState, useEffect } from "react";

export default function ColorRadio(props) {
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    if (props.colorName) {
      setSelectedColor(props.colorName); // Ensure this is an object
    }
  }, [props.colorName]);

  const handleColor = (colorObj) => {
    setSelectedColor(colorObj);
    props.onClick(colorObj); // Pass whole object back to parent
  };

  const showColor = () => {
    return props.colorlist.map((colorObj, index) => {
      const isSelected = selectedColor?.color === colorObj.color;
      return (
        <div
          key={index}
          onClick={() => handleColor(colorObj)}
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            backgroundColor: colorObj.colorCode || "#fff",
            border: isSelected ? "3px solid #51cccc" : "1px solid #ddd",
            cursor: "pointer",
            marginRight: 8,
            boxShadow: "0 1px 3px rgba(0,0,0,0.33)",
          }}
          title={colorObj.color}
        ></div>
      );
    });
  };

  return (
    <div>
      <div style={{ paddingBottom: "10px" }}>
        <span style={{ fontWeight: "600", fontSize: "16px" }}>Color: </span>
        <span style={{ color: "grey", fontSize: "15px" }}>
          {selectedColor?.color || "Select a color"}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {props.colorlist && props.colorlist.length > 0 ? (
          showColor()
        ) : (
          <>Please select a size first...</>
        )}
      </div>
    </div>
  );
}
