import Swal from "sweetalert2";

const showImage = (url) => {
  Swal.fire({
    imageUrl: url,
    imageAlt: "Imagen",
    showCloseButton: true,
    showConfirmButton: false,
    scrollbarPadding: false,
    backdrop: `rgba(0, 0, 0, 0.8)`,
    customClass: {
      popup: "swal-image-popup",
      image: "swal-image-content",
    },
  });
};

export default showImage;
