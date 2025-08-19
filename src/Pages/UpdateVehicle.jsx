/* eslint-disable no-unused-vars */
import Swal from "sweetalert2";
import {
  Container,
  FormContainer,
  FormField,
  Input,
  Label,
  SectionTitle,
  StyledForm,
  SubmitButton,
  Title,
} from "../components/CustomFormStyled";
import { useForm } from "../Hooks/useForm";
import axiosInstance from "../utils/axiosInstance";
import { AnimatedContainerSlight } from "../components/Animations";
import { BiSearchAlt } from "react-icons/bi";
import { useState } from "react";
import { validateFields } from "../utils/validateFields";

export default function UpdateVehicle() {
  const { values, handleChange, resetForm, setValues } = useForm({
    plate: "",
    ownerName: "",
    brand: "",
    model: "",
    year: "",
  });

  const [lastSearchedValue, setLastSearchedValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [initialValues, setInitialValues] = useState(null);

  const handleSearch = async () => {
    const validationError = validateFields.plate(values.plate.trim());
    if (validationError) {
      Swal.fire({
        icon: "error",
        title: "Error de Validación",
        text: validationError,
      });
      return;
    }

    if (values.plate.trim() === lastSearchedValue.trim()) {
      return;
    }
    setLastSearchedValue(values.plate.trim());

    try {
      const response = await axiosInstance.get(
        `/vehicle/search-plate?plate=${values.plate}`
      );

      if (response.data.isSuccess) {
        const vehicleData = response.data.data;

        // Actualizamos los valores correctamente
        setValues({
          ...values,
          ownerName: vehicleData.ownerName,
          brand: vehicleData.brand,
          model: vehicleData.model,
          year: vehicleData.year,
        });

        setInitialValues(vehicleData); // Guardamos los valores iniciales
        setIsEditing(true);
      } else {
        Swal.fire({
          title: "Error",
          text:
            response.data.message || "No se encontraron datos para esa placa.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `${
          error.response?.data?.message ||
          "Hubo un problema al buscar el vehículo."
        }`,
        icon: "error",
      });
    }
  };

  // Función para verificar si hay cambios
  const hasChanges = () => {
    if (!initialValues) return false; // Si no hay valores iniciales, no hay cambios
    return (
      values.ownerName !== initialValues.ownerName ||
      values.brand !== initialValues.brand ||
      values.model !== initialValues.model ||
      values.year !== initialValues.year
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!hasChanges()) {
      Swal.fire({
        title: "No hay cambios",
        text: "No se han realizado cambios en los datos del vehículo.",
        icon: "info",
      });
      return;
    }

    Swal.fire({
      title: "¿Quieres guardar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: "No guardar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await handleFetch();

        if (response.isSuccess) {
          Swal.fire({
            title: "¡Actualizado!",
            text: `Vehículo con placa ${values.plate} ha sido actualizado.`,
            icon: "success",
          });

          resetForm();
          setErrors({}); // Limpiar errores
          setInitialValues(null); // Limpiar valores iniciales
          setLastSearchedValue(""); // Limpiar el último valor buscado
          setIsEditing(false); // Deshabilita edición después de actualizar
        } else {
          Swal.fire({
            title: "Error",
            text:
              response.message || "Hubo un problema al actualizar el vehículo.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleFetch = async () => {
    try {
      const response = await axiosInstance.put(
        `/vehicle/update?plate=${values.plate}`,
        values,
        { headers: { "Content-Type": "application/json" } }
      );

      return response.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Hubo un problema al conectar con el servidor.",
      });

      return error.response?.data || { isSuccess: false };
    }
  };

  const validateForm = () => {
    const newErrors = {};
    // Validar cada campo usando las funciones de validación
    Object.keys(values).forEach((field) => {
      const error = validateFields[field](values[field]);
      if (error) {
        newErrors[field] = error; // Si hay error, lo agregamos al objeto newErrors
      }
    });

    return newErrors;
  };

  return (
    <Container>
      <AnimatedContainerSlight>
        <FormContainer>
          <Title>Actualizar Información de Vehículo</Title>
          <StyledForm
            onSubmit={handleFormSubmit}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          >
            <SectionTitle>Detalles del Vehículo</SectionTitle>

            {/* Input de placa con botón de búsqueda */}
            <FormField>
              <Label htmlFor="plate">
                Placa <span style={{ color: "red" }}>*</span>
              </Label>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Input
                  style={{ width: "95%" }}
                  id="plate"
                  name="plate"
                  type="text"
                  autoComplete="off"
                  placeholder="Ej. AAA-1234 o AA-123A"
                  required
                  value={values.plate}
                  onChange={handleChange}
                />
                <BiSearchAlt
                  onClick={handleSearch}
                  style={{ cursor: "pointer", fontSize: "1.5em" }}
                />
              </div>
            </FormField>

            {isEditing && (
              <>
                <div
                  style={{
                    borderTop: "1px solid #ccc",
                    width: "100%",
                    margin: "1rem 0",
                  }}
                />
                <FormField>
                  <Label htmlFor="ownerName">
                    Nombre del Cliente <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    id="ownerName"
                    name="ownerName"
                    type="text"
                    autoComplete="off"
                    required
                    value={values.ownerName}
                    onChange={handleChange}
                    $hasError={!!errors.ownerName}
                  />
                  {errors.ownerName && (
                    <span style={{ color: "red" }}>{errors.ownerName}</span>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="brand">Marca</Label>
                  <Input
                    id="brand"
                    name="brand"
                    type="text"
                    autoComplete="off"
                    value={values.brand}
                    onChange={handleChange}
                    $hasError={!!errors.brand}
                  />
                  {errors.brand && (
                    <span style={{ color: "red" }}>{errors.brand}</span>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="model">Modelo</Label>
                  <Input
                    id="model"
                    name="model"
                    type="text"
                    autoComplete="off"
                    value={values.model}
                    onChange={handleChange}
                    $hasError={!!errors.model}
                  />
                  {errors.model && (
                    <span style={{ color: "red" }}>{errors.model}</span>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="year">Año</Label>
                  <Input
                    id="year"
                    name="year"
                    type="number"
                    autoComplete="off"
                    placeholder="2025"
                    value={values.year}
                    onChange={handleChange}
                    onWheel={(e) => e.target.blur()}
                    $hasError={!!errors.year}
                  />
                  {errors.year && (
                    <span style={{ color: "red" }}>{errors.year}</span>
                  )}
                </FormField>

                <SubmitButton type="submit">Actualizar</SubmitButton>
              </>
            )}
          </StyledForm>
        </FormContainer>
      </AnimatedContainerSlight>
    </Container>
  );
}
