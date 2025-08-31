import {
  FormContainer,
  FormTitle,
  FormSubtitle,
  FormField,
  FormButton,
} from "../components/Form";
import { useForm } from "../Hooks/useForm";
import axiosInstance from "../utils/axiosInstance";
import { useEffect, useState } from "react";
import { validateFields } from "../utils/validateFields";
import Layout from "../components/Layout";
import { customSwal } from "../utils/swalConfig";

import Icon from "../components/Icons/Icon";
import { carBrands, motorcycleBrands } from "../utils/brands";
import { BrandSearch } from "../components/BrandSearch";

export default function UpdateVehicle() {
  const [inputSearch, setInputSearch] = useState("");
  const [lastSearchedValue, setLastSearchedValue] = useState("");
  const [filteredBrands, setFilteredBrands] = useState([]);
   const [brandType, setBrandType] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { values, handleChange, resetForm, setValues } = useForm({
    plate: "",
    ownerName: "",
    brand: "",
    model: "",
    year: "",
  });

  useEffect(() => {
    if (/^[A-Z]{3}-\d{4}$/.test(values.plate)) {
      setFilteredBrands(carBrands);
    } else if (/^[A-Z]{2}-\d{3}[A-Z]$/.test(values.plate)) {
      setFilteredBrands(motorcycleBrands);
    } else {
      setFilteredBrands([]);
    }
  }, [values.plate]);

  const mapVehicleData = (data) => ({
    plate: data.plate || "",
    ownerName: data.ownerName || "",
    brand: data.brand || "",
    model: data.model || "",
    year: data.year || null,
  });

  useEffect(() => {
    if (/^[A-Z]{3}-\d{4}$/.test(values.plate)) {
      setFilteredBrands(carBrands);
      setBrandType("car");
    } else if (/^[A-Z]{2}-\d{3}[A-Z]$/.test(values.plate)) {
      setFilteredBrands(motorcycleBrands);
      setBrandType("motorcycle");
    } else {
      setFilteredBrands([]);
    }
  }, [values.plate]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!inputSearch.trim())
      return customSwal.fire({
        icon: "warning",
        title: "Campo vacío",
        text: "Por favor, ingrese un valor en el campo de búsqueda.",
      });

    const validationError = validateFields.plate(inputSearch.trim());
    if (validationError) {
      customSwal.fire({
        icon: "error",
        title: "Error de Validación",
        text: validationError,
      });
      return;
    }

    setLastSearchedValue(inputSearch.trim());

    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/vehicle/search-plate?plate=${inputSearch}`
      );

      if (response.data.isSuccess) {
        const mappedData = mapVehicleData(response.data.data);

        setValues(mappedData); //update form values with fetched data
        setInitialValues(mappedData); // save changes for comparison
        setIsEditing(true);
      } else {
        customSwal.fire({
          title: "Error",
          text:
            response.data.message || "No se encontraron datos para esa placa.",
          icon: "error",
        });
      }
    } catch (error) {
      customSwal.fire({
        title: "Error",
        text: `${
          error.response?.data?.message ||
          "Hubo un problema al buscar el vehículo."
        }`,
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const hasChanges = () => {
    if (!initialValues) return false; // Si no hay valores iniciales, no hay cambios

    return Object.keys(values).some(
      (key) => values[key] !== initialValues[key]
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    customSwal
      .fire({
        title: "¿Deseas guardar los cambios?",
        icon: "question",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: "No guardar",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const response = await handleFetch();

          if (response.isSuccess) {
            customSwal.fire({
              title: "¡Actualizado!",
              text: `Vehículo con placa ${values.plate} ha sido actualizado.`,
              icon: "success",
            });
            HandleReset();
            setIsEditing(false);
          } else {
            customSwal.fire({
              title: "Error",
              text:
                response.message ||
                "Hubo un problema al actualizar el vehículo.",
              icon: "error",
            });
          }
        }
      });
  };

  const handleFetch = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.put(
        `/vehicle/update?plate=${values.plate}`,
        values,
        { headers: { "Content-Type": "application/json" } }
      );

      return response.data;
    } catch (error) {
      customSwal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Hubo un problema al conectar con el servidor.",
      });

      return error.response?.data || { isSuccess: false };
    } finally {
      setIsLoading(false);
    }
  };

  const HandleReset = () => {
    resetForm();
    setInputSearch("");
    setLastSearchedValue("");
    setInitialValues(null);
    setErrors({});
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
      <FormContainer onSubmit={handleSearch}>
        <FormTitle>Actualizar Información de Vehículo</FormTitle>
        <FormSubtitle>Detalles del Vehículo</FormSubtitle>

        <div className="md:col-span-2 flex items-center md:items-end justify-between flex-col md:flex-row gap-4">
          <FormField
            label="Placa"
            id="plateSearch"
            required
            placeholder="Ej. AAA-1234 o AA-123A"
            value={inputSearch}
            onChange={(e) =>
              setInputSearch(e.target.value.toUpperCase().trim())
            }
            className="w-full md:w-[75%]"
          />

          <FormButton
            icon={
              <Icon name="icon-search-form" className={"w-6 h-6 text-white"} />
            }
            text="Buscar"
            title="Buscar por placa"
            loadingText="Buscando..."
            type="submit"
            color="blue"
            isLoading={isLoading}
            // !!inputSearch.trim() evita que se envie el form si el input esta vacio
            disabled={
              !!inputSearch.trim() && inputSearch.trim() === lastSearchedValue
            }
          />
        </div>
      </FormContainer>

      {isEditing && (
        <FormContainer onSubmit={handleFormSubmit}>
          <div
            style={{
              borderTop: "1px solid #ccc",
              width: "100%",
              margin: "1rem 0",
            }}
            className="md:col-span-2"
          />
          <FormField
            id="plate"
            label="Placa"
            required
            value={values.plate}
            disabled
          />

          <FormField
            id="ownerName"
            label="Nombre del Cliente"
            placeholder="Ej. John Doe"
            required
            value={values.ownerName}
            error={errors.ownerName}
            onChange={handleChange}
            className="md:col-span-2"
          />

          {/* <FormField id="brand" label="Marca" error={errors.brand}>
            <input
              id="brand"
              name="brand"
              list="brands"
              value={values.brand}
              autoComplete="off"
              onChange={handleChange}
              placeholder="Escriba o seleccione una marca"
              className="px-4 py-2 text-base border border-gray-300 rounded-lg bg-[rgb(248,249,252)] dark:bg-[rgb(176,176,176)] dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-gray-600 dark:focus:border-gray-500 outline-none"
            />
            <datalist id="brands">
              {filteredBrands.map((brand) => (
                <option key={brand.value} value={brand.label} />
              ))}
            </datalist>
          </FormField> */}

          <BrandSearch
            id="brand"
            name="brand"
            label="Marca"
            brands={filteredBrands}
            value={values.brand}
            error={errors.brand}
            onChange={handleChange}
            iconName={brandType === "car" ? "car" : "motorcycle"}
            placeholder="Por favor, indique la marca"
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
                <Icon
                  name="icon-update-form"
                  className={"w-6 h-6 text-white"}
                />
              }
              text="Actualizar"
              title="Actualizar Información de Vehículo"
              loadingText="Actualizando..."
              type="submit"
              color="blue"
              disabled={!hasChanges()}
              isLoading={isLoading}
            />
          </div>
        </FormContainer>
      )}
    </Layout>
  );
}
