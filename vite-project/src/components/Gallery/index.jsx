/* eslint-disable react/prop-types */
import "./gallery.css";
import ImageGallery from "react-image-gallery";

const Gallery = ({ images }) => {
  const galleryImages = images?.map((url) => ({
    original: url,
    thumbnail: url,
  }));
  return (
    <>
      {galleryImages && (
        <ImageGallery
          items={galleryImages}
          showFullscreenButton={false}
          showPlayButton={false}
        />
      )}
    </>
  );
};

export default Gallery;
