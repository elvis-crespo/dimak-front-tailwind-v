import { Container, Title } from "../components/CustomFormStyled";
import { CustomerTable } from "../components/CustomTable";
import { useState } from "react";
import { SearchInput } from "../components/SearchInput";
import Swal from "sweetalert2";
import axiosInstance from "../utils/axiosInstance.js";
import { validateFields } from "../utils/validateFields.js";
import { AnimatedContainerSlight } from "../components/Animations.jsx";

export default function SearchPlate() {
  const columnsHeader = ["Placa", "Propietario", "Marca", "Modelo", "Año"];
  const columnKeys = ["plate", "ownerName", "brand", "model", "year"];

  const [inputValue, setInputValue] = useState("");
  const [lastSearchedValue, setLastSearchedValue] = useState("");
  const [data, setData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputValue.trim() === lastSearchedValue) return;

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

    const response = await handleFetch();

    if (response.isSuccess === true) {
      const transform = [response.data];
      setData(transform);
      setLastSearchedValue(inputValue.trim()); // Actualiza el último valor buscado.
    }
  };

  const handleFetch = async () => {
    try {
      const response = await axiosInstance.get(
        `/vehicle/search-plate?plate=${inputValue}`,
        {
          headers: {
            "Content-Type": "application/json",
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
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.response.data?.message || error.message}`,
        });
      }

      return error.response.data;
    }
  };

  return (
    <>
      <Container style={{ justifyContent: "flex-start" }}>
        <AnimatedContainerSlight>
          <SearchInput
            handleSubmit={handleSubmit}
            inputValue={inputValue}
            setInputValue={setInputValue}
            disabled={
              !inputValue.trim() || inputValue.trim() === lastSearchedValue
            }
            text={"Placa AAA-1234 o AA-123A"}
          />
        </AnimatedContainerSlight>
        {data && data.length > 0 && (
          <>
            <Title>Resultados de la busqueda:</Title>
            <CustomerTable
              showActions={true}
              data={data}
              columnsHeader={columnsHeader}
              columnKeys={columnKeys}
            />
          </>
        )}
      </Container>
    </>
  );
}
