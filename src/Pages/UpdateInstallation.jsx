import { useForm } from "../Hooks/useForm";
import {
  Container,
  FormContainer,
  FormField,
  Input,
  Label,
  SectionTitle,
  StyledForm,
  SubmitButton,
  TextArea,
  Title,
} from "../components/CustomFormStyled";

import Swal from "sweetalert2";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { AnimatedContainerSlight } from "../components/Animations.jsx";
import { validateFields } from "../utils/validateFields.js";
import ImageUploader from "../components/ImageUploader.jsx";
import { BiSearchAlt } from "react-icons/bi";

export default function UpdateInstallations() {
  const { values, handleChange, resetForm, setValues } = useForm({
    plate: "",
    technicalFileNumber: "",
    invoiceNumber: "",
    technicianName: "",
    date: "",
    installationCompleted: "",
    photoUrl: null,
  });

  const [lastSearchedValue, setLastSearchedValue] = useState("");
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [initialValues, setInitialValues] = useState(null);

  const handleSearch = async () => {
    const validationError = validateFields.technicalFileNumber(
      values.technicalFileNumber.trim()
    );
    if (validationError) {
      Swal.fire({
        icon: "error",
        title: "Error de Validación",
        text: validationError,
      });
      return;
    }

    if (values.technicalFileNumber.trim() === lastSearchedValue.trim()) {
      return;
    }
    setLastSearchedValue(values.technicalFileNumber.trim());

    try {
      const response = await axiosInstance.get(
        `/installation/technical?technicalFileNumber=${values.technicalFileNumber}`
      );

      if (response.data.isSuccess) {
        const installationData = response.data.data;

        // Actualizamos los valores correctamente
        setValues({
          ...values,
          plate: installationData.plateId || "",
          technicalFileNumber: installationData.technicalFileNumber || "",
          invoiceNumber: installationData.invoiceNumber || "",
          technicianName: installationData.technicianName || "",
          date: installationData.date
            ? installationData.date.split("T")[0]
            : "",
          installationCompleted: installationData.installationCompleted || "",
          photoUrl: installationData.photoUrl || null,
        });

        setInitialValues(installationData); // Guardamos los valores iniciales
        setImage(installationData.photoUrl);
        setIsEditing(true);
      } else {
        Swal.fire({
          title: "Error",
          text:
            response.data.message ||
            "No se encontraron datos para esta instalación.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `${
          error.response.data.message ||
          "Hubo un problema al obtener los datos de la instalación."
        }`,
        icon: "error",
      });
    }
  };

  const hasChanges = () => {
    if (!initialValues) return false; // Si no hay datos iniciales, no se puede comparar
    return (
      values.plate !== initialValues.plateId ||
      values.technicalFileNumber !== initialValues.technicalFileNumber ||
      values.invoiceNumber !== initialValues.invoiceNumber ||
      values.technicianName !== initialValues.technicianName ||
      values.date !== initialValues.date ||
      values.installationCompleted !== initialValues.installationCompleted ||
      (values.photoUrl && values.photoUrl !== initialValues.photoUrl)
    );
  };

  // Manejo del cambio del archivo
  const handleFileChange = (file) => {
    setImage(file);
    handleChange({ target: { name: "photoUrl", value: file } });
  };

  // Lógica de envío del formulario con Axios
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(); // Validar el formulario
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!hasChanges()) {
      Swal.fire({
        title: "No hay cambios",
        text: "No se han realizado cambios en los datos de la instalación.",
        icon: "info",
      });
      return; // Si no hay cambios, no hacer nada
    }

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "photoUrl") formData.append(key, value);
    });

    if (values.photoUrl instanceof File) {
      formData.append("photoUrl", values.photoUrl);
    }

    Swal.fire({
      title: "¿Deseas Guardar esta Instalación?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `No guardar`,
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await HandleFetch(formData);

        if (response.isSuccess === true) {
          Swal.fire({
            title: "¡Guardado!",
            text: `${response.message}`, // Mensaje de éxito
            icon: "success",
          });
          HandleReset();
          setIsEditing(false);
        }
      } else if (result.isDenied) {
        Swal.fire("Cambios no guardados", "", "info");
      }
    });
  };

  const HandleFetch = async (formData) => {
    const url = `/installation/update`;

    try {
      const response = await axiosInstance.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
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
          text: `Error al guardar la instalación: ${
            error.response.data?.message || error.message
          }`,
        });
      }

      return error.response?.data; // Retornar el error desde el servidor si existe
    }
  };

  // Función para limpiar el formulario
  const HandleReset = () => {
    resetForm();
    setImage(null); // Limpia la imagen de la vista previa
    values.photoUrl = null; // Limpia el valor del archivo
    const fileInput = document.querySelector('input[type="file"]'); // Selecciona el campo de archivo
    if (fileInput) fileInput.value = ""; // Limpia el valor del campo de archivo en el DOM
    setInitialValues(null); // Limpia los valores iniciales
    setLastSearchedValue(""); // Limpia el último valor buscado
    setErrors({});
  };

  // Función para validar el formulario
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
        <FormContainer style={{ margin: "30px 0" }} id="register">
          <Title>Actualizar Información de Instalación</Title>
          <StyledForm
            onSubmit={handleFormSubmit}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          >
            <SectionTitle>Detalles de la Instalación</SectionTitle>

            <FormField>
              <Label htmlFor="technicalFileNumber">
                Nº de Ficha Técnica <span style={{ color: "red" }}>*</span>
              </Label>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Input
                  style={{ width: "95%" }}
                  id="technicalFileNumber"
                  name="technicalFileNumber"
                  type="text"
                  autoComplete="off"
                  placeholder={"Solo números"}
                  required={true}
                  value={values.technicalFileNumber}
                  onChange={handleChange}
                />
                {errors.technicalFileNumber && (
                  <span style={{ color: "red" }}>
                    {errors.technicalFileNumber}
                  </span>
                )}
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
                  <Label htmlFor="plateId">Placa</Label>
                  <Input
                    id="plateId"
                    name="plateId"
                    type="text"
                    autoComplete="off"
                    placeholder="Ej. AAA-1234 o AA-123A"
                    required
                    value={values.plate}
                    readOnly
                    disabled
                  />
                </FormField>

                <FormField>
                  <Label htmlFor="invoiceNumber">Nº de Factura</Label>
                  <Input
                    id="invoiceNumber"
                    name="invoiceNumber"
                    type="text"
                    autoComplete="off"
                    placeholder={"Ej. 001-001-123456789"}
                    value={values.invoiceNumber}
                    readOnly
                    disabled
                  />
                  {errors.invoiceNumber && (
                    <span style={{ color: "red" }}>{errors.invoiceNumber}</span>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="technicianName">Técnico</Label>
                  <Input
                    id="technicianName"
                    name="technicianName"
                    type="text"
                    autoComplete="off"
                    value={values.technicianName}
                    onChange={handleChange}
                    $hasError={!!errors.technicianName}
                  />
                  {errors.technicianName && (
                    <span style={{ color: "red" }}>
                      {errors.technicianName}
                    </span>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="date">
                    Fecha <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    autoComplete="off"
                    required
                    value={values.date ? values.date.split("T")[0] : ""}
                    onChange={handleChange}
                    $hasError={!!errors.date}
                  />
                  {errors.date && (
                    <span style={{ color: "red" }}>{errors.date}</span>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="installationCompleted">
                    Instalación Completada
                  </Label>
                  <TextArea
                    id="installationCompleted"
                    name="installationCompleted"
                    placeholder="Escribe una descripción"
                    value={values.installationCompleted || undefined}
                    onChange={handleChange}
                    $hasError={!!errors.installationCompleted}
                  />
                  {errors.installationCompleted && (
                    <span style={{ color: "red" }}>
                      {errors.installationCompleted}
                    </span>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="installationPhoto">Foto de Instalación</Label>
                  <ImageUploader
                    onFileChange={handleFileChange}
                    image={image}
                    title={"Actualizar Foto"}
                    $hasError={!!errors.photoUrl}
                  />
                  {errors.photoUrl && (
                    <span style={{ color: "red" }}>{errors.photoUrl}</span>
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
