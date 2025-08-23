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
import { customSwal } from "../utils/swalConfig";

export default function DeleteVehicle() {
  const [inputValue, setInputValue] = useState("");
  const [lastSearchedValue, setLastSearchedValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      return customSwal.fire({
        icon: "warning",
        title: "Campo vacío",
        text: "Por favor, ingrese un valor en el campo de búsqueda.",
      });
    }

    if (inputValue.trim() === lastSearchedValue) {
      return customSwal.fire({
        icon: "info",
        title: "Sin cambios",
        text: "Ya has buscado esta placa anteriormente.",
      });
    }

    // Validar la placa antes de enviar
    const validationError = validateFields.plate(inputValue.trim());
    if (validationError) {
      customSwal.fire({
        icon: "error",
        title: "Error de Validación",
        text: validationError,
      });
      return;
    }

    // Confirmación de SweetAlert
    customSwal
      .fire({
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
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const response = await handleFetch();

          setLastSearchedValue(inputValue.trim()); // Actualiza el último valor buscado.
          if (response.isSuccess === true) {
            customSwal.fire({
              title: "¡Eliminado!",
              text: `Vehículo con placa ${inputValue} ha sido eliminado.`,
              icon: "success",
            });
            setInputValue("");
          } else {
            customSwal.fire({
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
      setIsLoading(true);
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
      if (error.response && error.response.status === 404) {
        // setAllFetched(false);
        customSwal.fire({
          icon: "info",
          title: "No encontrado",
          text: `No existe ningún vehículo registrado con la placa ${inputValue}.`,
        });
      } else if (!error.response) {
        // Otro tipo de error en la respuesta del servidor (sin respuesta)
        customSwal.fire({
          icon: "error",
          title: "Error del servidor",
          text: "Ocurrió un error en el servidor. Por favor, inténtalo más tarde.",
        });
      } else {
        customSwal.fire({
          icon: "warning",
          title: "Error",
          text: `Ocurrió un error al buscar el vehículo, por favor, reintenta. Error: ${error.message}`,
        });
      }
      return error.response.data;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Layout>
        <FormContainer onSubmit={handleFormSubmit} className>
          <FormTitle>Eliminar un Vehículo</FormTitle>
          <FormSubtitle>
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
              icon={
                <Icon name="icon-delete-all" className={"w-6 h-6 text-white"} />
              }
              text="Eliminar"
              loadingText="Eliminando..."
              color="red"
              type="submit"
              isLoading={isLoading}
              // disabled={
              //   !inputValue.trim() || inputValue.trim() === lastSearchedValue
              // }
            />
          </div>
        </FormContainer>
      </Layout>
    </>
  );
}
