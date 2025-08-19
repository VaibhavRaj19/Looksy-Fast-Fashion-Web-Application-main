import React from "react"

import { useNavigate } from "react-router"

export default function OneCardComponent(props) {
  var navigate = useNavigate()

  const handleClick = (scid, icon) => {
    navigate(`/${props.url}/${scid}/${icon}`)
  }

  // Ensure props.data is an array before mapping.
  // If props.data is undefined or null, default to an empty array.
  const dataToRender = props.data || [];

  return dataToRender.map((item, index) => { // Added 'index' for unique key
    return (
      <div
        key={index} // Added unique key prop
        onClick={() => handleClick(item.subcategoryid, item.subcategoryicon)}
        style={{ padding: 2, margin: 3, position: 'relative', width: 1235, height: 'auto', cursor: 'pointer', marginBottom: 37 }}
      >
        <img title={item.categoryname} src={`${item.subcategoryicon}`} style={{ width: '100%', height: '100%' }} alt={item.subcategoryname || 'Subcategory Image'}/> {/* Added alt attribute */}
      </div>
    )
  })
}