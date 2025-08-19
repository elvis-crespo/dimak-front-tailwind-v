import Swal from "sweetalert2";
import {
  FormContainer,
  FormTitle,
  FormSubtitle,
  FormField,
  FormButton,
} from "../components/Form";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { validateFields } from "../utils/validateFields";
import Layout from "../components/Layout";
import Icon from "../components/Icon";

export default function DeleteVehicle() {
  const [inputValue, setInputValue] = useState("");
  const [lastSearchedValue, setLastSearchedValue] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validar la placa antes de enviar
    const validationError = validateFields.plate(inputValue.trim());
    if (validationError) {
      Swal.fire({
        icon: "error",
        title: "Error de Validación",
        text: validationError,
      });
      return;
    }

    // Confirmación de SweetAlert
    Swal.fire({
      title: `¿Estás seguro?`,
      html: `¡No podrás revertir esta acción!<br />Se eliminará el vehículo con placa <b>${inputValue}</b>.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      customClass: {
        title: ".swal2-title",
        html: ".swal2-html-container",
        confirmButton: ".swal2-confirm",
        cancelButton: ".swal2-cancel",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await handleFetch();

        setLastSearchedValue(inputValue.trim()); // Actualiza el último valor buscado.
        if (response.isSuccess === true) {
          Swal.fire({
            title: "¡Eliminado!",
            text: `Vehículo con placa ${inputValue} ha sido eliminado.`,
            icon: "success",
          });
          setInputValue("");
        } else {
          Swal.fire({
            title: "Error",
            text:
              response.message || "Hubo un problema al eliminar el vehículo.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleFetch = async () => {
    try {
      const response = await axiosInstance.delete(
        `/vehicle/delete?plate=${inputValue}`,
        {
          headers: {
            "Content-Type": "application/json", // Cambié a json porque no parece necesario multipart
          },
        }
      );

      return response.data;
    } catch (error) {
      // Verifica si el error es de red (servidor caído o no accesible)
      if (error.message === "Network Error" || error.code === "ECONNREFUSED") {
        // Error de conexión, el servidor no está disponible
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Hubo un problema al conectar con el servidor! Verifica si el servidor está en ejecución.",
        });
      } else if (!error.response) {
        // Otro tipo de error en la respuesta del servidor (sin respuesta)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema desconocido con el servidor.",
        });
      } else {
        // Si hay una respuesta del servidor con un error (404, 500, etc.)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Error al eliminar el vehículo: ${
            error.response.data?.message || error.message
          }`,
        });
      }

      return error.response.data;
    }
  };

  return (
    <>
      <Layout>
        <FormContainer onSubmit={handleFormSubmit} className>
          <FormTitle>Eliminar un Vehículo</FormTitle>
          <FormSubtitle className="text-sm text-gray-600 dark:text-gray-400">
            Esta acción es irreversible y no se podrá recuperar el registro
            eliminado.
          </FormSubtitle>
          <FormField
            id="plate"
            name="plate"
            type="text"
            label="Placa"
            autoComplete="off"
            placeholder={"Ej. AAA-1234 o AA-123A"}
            required
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="md:col-span-2"
          ></FormField>

          <div className="flex items-center justify-center md:col-span-2 mt-4">
            <FormButton
              icon={<Icon name="icon-delete-all" className={"w-6 h-6 text-white"} />}
              text="Eliminar"
              color="red"
              type="submit"
              disabled={
                !inputValue.trim() || inputValue.trim() === lastSearchedValue
              }
            />
          </div>
        </FormContainer>
      </Layout>
    </>
  );
}
