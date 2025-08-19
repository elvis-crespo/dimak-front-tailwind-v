import Swal from "sweetalert2";
import axiosInstance from "../utils/axiosInstance";

const useDeleteVehicle = () => {
  const handleFetchDelete = async (plateVehicle) => {
    try {
      const response = await axiosInstance.delete(
        `/vehicle/delete?plateVehicle=${plateVehicle}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

    //   Devuelve los datos, asumiendo que response.data contiene success y message
      if (response.data.isSuccess) {
        Swal.fire("Éxito", response.data.message, "success");
      }

      return response.data;
    } catch (error) {
      // Muestra el error con SweetAlert
      if (error.message === "Network Error" || error.code === "ECONNREFUSED") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Hubo un problema al conectar con el servidor! Verifica si el servidor está en ejecución.",
        });
      } else if (!error.response) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema desconocido con el servidor.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Error al eliminar el vehículo: ${
            error.response.data?.message || error.message
          }`,
        });
      }
    }
  };

  return {
    handleFetchDelete,
  };
};

export default useDeleteVehicle;
