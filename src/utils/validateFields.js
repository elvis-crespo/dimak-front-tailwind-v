export const validateFields = {
  ownerName: (value) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Letras, tildes, 'ñ' y espacios
    if (!value) return "El nombre del propietario es obligatorio.";
    if (!regex.test(value))
      return "El nombre del propietario solo puede contener letras, tildes y espacios.";
    return null;
  },

  plate: (value) => {
    const regex = /^[A-Z]{3}-\d{4}$|^[A-Z]{2}-\d{3}[A-Z]$/; // Tres letras mayúsculas, guion, cuatro números o dos letras, tres números y una letra
    if (!value) return "La placa es obligatoria.";
    if (!regex.test(value))
      return "El formato de la placa debe ser AAA-1234 o AA-123A.";
    if (value.length !== 8 && value.length !== 7)
      return "La placa debe tener 7 o 8 caracteres.";
    return null; // Sin errores
  },

  brand: (value) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\säëïöüÄËÏÖÜ-]+$/; // Permite letras, tildes, 'ñ', diéresis, guiones y espacios
    if (value && !regex.test(value)) {
      return "La marca solo puede contener letras, tildes, 'ñ', diéresis, guiones y espacios.";
    }
    return null;
  },

  model: (value) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]*$/; // Letras, tildes, 'ñ', números y espacios (no es obligatorio)
    if (value && !regex.test(value)) {
      return "El modelo solo puede contener letras, tildes, números y espacios.";
    }
    return null;
  },

  year: (value) => {
    const currentYear = new Date().getFullYear();
    const regex = /^\d{4}$/; 

    if (value && !regex.test(value))
      return "El año debe tener 4 dígitos numéricos.";

    if (value === "0000") return "El año no puede ser 0000.";

    if (value && (value < 1900 || value > currentYear))
      return `El año debe estar entre 1900 y ${currentYear}.`;

    return null;
  },

  technicalFileNumber: (value) => {
    const regex = /^\d*$/; // Solo números
    if (!value) return "La ficha técnica es obligatoria.";
    if (value && !regex.test(value))
      return "La ficha técnica solo puede contener números.";
    return null; // No es obligatorio
  },

  invoiceNumber: (value) => {
    const regex = /^\d{3}-\d{3}-(\d{9}|[A-Z]{2}\d{7})$/; // Tres números, guion, tres números, guion, nueve números o dos letras + siete números
    if (!value) return null;
    if (!regex.test(value))
      return "El formato del número de factura debe ser 001-001-123456789 o 001-001-OP1234567.";
    if (value.length !== 17)
      return "El número de factura debe tener 17 caracteres.";
    return null;
  },

  technicianName: (value) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Permite letras (incluidas con tildes) y espacios
    if (!value) return null;
    if (!regex.test(value))
      return "El nombre del técnico solo puede contener letras, tildes y espacios.";
    return null;
  },

  date: (value) => {
    if (!value) return "La fecha es obligatoria.";

    const selectedDate = new Date(value);

    if (isNaN(selectedDate.getTime()))
      return "El formato de la fecha no es válido.";

    const minDate = new Date("1900-01-01"); // Fecha mínima permitida (1 de enero de 1900)
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30); // Hasta 30 días en el futuro

    if (selectedDate < minDate)
      return "La fecha no puede ser anterior al 1 de enero de 1900.";

    if (selectedDate > maxDate)
      return "La fecha no puede estar más de 30 días en el futuro.";

    return null;
  },
  installationCompleted: (value) => {
    const regex = /^[a-zA-Z0-9\s¿?()¡!ñÑáéíóúÁÉÍÓÚ´$+,.:-]*$/;
    if (value && !regex.test(value)) {
      return "La descripción solo puede contener letras, números, signos de puntuación y espacios.";
    }
    return null;
  },
  // installationCompleted: () => null,
  photoUrl: (file) => {
    const maxSize = 1 * 1024 * 1024; // 1MB
    if (file && file.size > maxSize)
      return "La imagen no puede ser mayor a 1MB.";
    return null;
  },
};