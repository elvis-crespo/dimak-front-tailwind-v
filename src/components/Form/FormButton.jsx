/* eslint-disable react/prop-types */
const FormButton = ({
  icon,
  text,
  color = "teal",
  type,
  className,
  disabled,
  onClick,
}) => {
  const colorClasses = {
    red: {
      icon: "bg-red-600 group-hover:bg-red-700",
      text: "bg-red-500 group-hover:bg-red-700",
    },
    teal: {
      icon: "bg-teal-600 group-hover:bg-teal-700",
      text: "bg-teal-500 group-hover:bg-teal-700",
    },
    blue: {
      icon: "bg-blue-600 group-hover:bg-blue-700",
      text: "bg-blue-500 group-hover:bg-blue-700",
    },
    gray: {
      icon: "bg-gray-600 group-hover:bg-gray-700",
      text: "bg-gray-500 group-hover:bg-gray-700",
    },
  };

  const chosen = colorClasses[color] || colorClasses.teal;

  // Para desactivar el boton y no hacer larga la clase
  const iconClass = disabled ? colorClasses.gray.icon : chosen.icon;
  const textClass = disabled ? colorClasses.gray.text : chosen.text;

  return (
    <button
      className={`flex w-32 h-[42px] rounded-md overflow-hidden shadow-md group ${className} ${
                disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"
              }`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <span
        className={`flex w-[35%] h-full items-center justify-center text-white transition-colors duration-200 ${iconClass}`}
      >
        {icon}
      </span>

      <span
        className={`flex w-[65%] h-full items-center justify-center text-white transition-colors duration-200 ${textClass}`}
      >
        {text}
      </span>
    </button>
  );
};

export default FormButton;
