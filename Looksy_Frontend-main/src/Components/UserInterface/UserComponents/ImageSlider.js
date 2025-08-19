import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Slider settings
const sliderSettingsMain = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  focusOnSelect: true,
};

const sliderSettingsThumbnails = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  focusOnSelect: true,
  responsive: [
    { breakpoint: 768, settings: { slidesToShow: 3 } },
    { breakpoint: 480, settings: { slidesToShow: 2 } },
  ],
};

// ImageSlider component for showing images from product object
const ImageSlider = ({ product }) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  if (!product) {
    return <div>No product data</div>;
  }

  const { picture = [] } = product;

  const renderImage = (img, index) => (
    <div key={index} style={{ padding: "5px" }}>
      <img
        src={img}
        alt={`Product view ${index + 1}`}
        style={{
          width: "100%",
          height: "400px",
          maxHeight: "100%",
          objectFit: "contain",
          margin: "0 auto",
          display: "block",
        }}
        onError={(e) => {
          e.target.src = `default-product.png`;
          e.target.onerror = null;
        }}
      />
    </div>
  );

  return (
    <div style={{ width: "100%", margin: "0 auto", textAlign: "center" }}>
      {picture.length > 0 ? (
        <>
          <Slider
            {...sliderSettingsMain}
            asNavFor={nav2}
            ref={(slider) => setNav1(slider)}
          >
            {picture.map(renderImage)}
          </Slider>

          <div style={{ marginTop: "10px" }}>
            <Slider
              {...sliderSettingsThumbnails}
              asNavFor={nav1}
              ref={(slider) => setNav2(slider)}
            >
              {picture.map(renderImage)}
            </Slider>
          </div>
        </>
      ) : (
        <div>No images available</div>
      )}
    </div>
  );
};

// ProductWithSlider fetches product data and renders ImageSlider
const ProductWithSlider = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) {
      setError("Missing product ID");
      return;
    }

    const fetchProductById = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "http://localhost:8080/api/products/fetch_by_ids",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([productId]), // Sending array of IDs
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data?.data?.length > 0) {
          setProduct(data.data[0]);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProductById();
  }, [productId]);

  if (loading) return <div>Loading product...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!product) return null;

  return <ImageSlider product={product} />;
};

export default ProductWithSlider;
