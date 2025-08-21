import Swal from "sweetalert2";
import {
  FormContainer,
  FormTitle,
  FormSubtitle,
  FormField,
  FormButton,
} from "../components/Form";
import { useForm } from "../Hooks/useForm";
import axiosInstance from "../utils/axiosInstance";
import { useState } from "react";
import { validateFields } from "../utils/validateFields";
import Layout from "../components/Layout";
import Icon from "../components/Icon";

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
    <Layout>
      <FormContainer onSubmit={handleFormSubmit}>
        <FormTitle>Actualizar Información de Vehículo</FormTitle>
        <FormSubtitle>Detalles del Vehículo</FormSubtitle>

        <div className="md:col-span-2 flex items-center md:items-end justify-between flex-col md:flex-row gap-4">
          <FormField
            label="Placa"
            id="plate"
            required
            placeholder="Ej. AAA-1234 o AA-123A"
            value={values.plate}
            onChange={handleChange}
            className="w-full md:w-[75%]"
          />

          <FormButton
            icon={
              <Icon name="icon-delete-all" className={"w-6 h-6 text-white"} />
            }
            text="Buscar"
            type="submit"
            color="blue"
            onClick={handleSearch}
            disabled={
              !values.plate.trim() || values.plate === lastSearchedValue
            }
          />
        </div>

        {isEditing && (
          <>
            <div
              style={{
                borderTop: "1px solid #ccc",
                width: "100%",
                margin: "1rem 0",
              }}
              className="md:col-span-2"
            />
            <FormField
              label="Placa"
              id="plate"
              required
              value={initialValues?.plate || ""}
              disabled
            />

            <FormField
              id="ownerName"
              label="Nombre del Cliente"
              value={values.ownerName}
              error={errors.ownerName}
              onChange={handleChange}
              required
              className="md:col-span-2"
            />

            <FormField
              id="brand"
              label="Marca"
              value={values.brand}
              error={errors.brand}
              onChange={handleChange}
            />

            <FormField
              id="model"
              label="Modelo"
              value={values.model}
              error={errors.model}
              onChange={handleChange}
            />

            <FormField
              id="year"
              label="Año"
              type="number"
              value={values.year}
              error={errors.year}
              min={1900}
              max={2100}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "e") e.preventDefault();
              }}
              onWheel={(e) => e.target.blur()}
            />
            <FormSubtitle className="text-sm font-normal md:col-span-2">
              Asegúrate de que todos los campos estén correctos antes de
              actualizar.
            </FormSubtitle>
            <div className="flex items-center justify-center md:justify-end md:col-span-2 mt-4">
              <FormButton
                icon={
                  <Icon name="icon-reset" className={"w-5 h-5 text-white"} />
                }
                text="Actualizar"
                type="submit"
                color="blue"
              />
            </div>
          </>
        )}
      </FormContainer>
    </Layout>
  );
}
