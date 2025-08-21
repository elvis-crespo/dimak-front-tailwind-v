/* eslint-disable react/prop-types */

// const FormField = ({ id, label, required, type, className }) => {
//   return (
//     <div className={`${className} bg-transparent flex flex-col gap-1`}>
//       <label
//         htmlFor={id}
//         className="text-base font-medium text-gray-700 dark:text-gray-200"
//       >
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <input
//         id={id}
//         type={type}
//         className="px-4 py-2 text-base border border-gray-300 rounded-lg bg-[rgb(248,249,252)] dark:bg-[rgb(176,176,176)] dark:border-gray-600 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-gray-600 dark:focus:border-gray-500 outline-none"
//       />
//     </div>
//   );
// };

// export default FormField;
// src/components/Form/FormField.jsx
// const FormField = ({
//   id,
//   label,
//   type = "text",
//   value,
//   required = false,
//   onChange,
//   error,
//   placeholder = "",
//   onWheel,
//   autoComplete = "off",
//   className = "",
//   children, // para que puedas pasar select o textarea
// }) => {
//   return (
//     <div className={`${className} flex flex-col gap-1`}>
//       <label
//         htmlFor={id}
//         className="text-base font-medium text-gray-700 dark:text-gray-200"
//       >
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>

//       {children ? (
//         children
//       ) : (
//         <input
//           id={id}
//           name={id}
//           type={type}
//           autoComplete={autoComplete}
//           placeholder={placeholder}
//           value={value}
//           onChange={onChange}
//           onWheel={onWheel}
//           className={`px-4 py-2 text-base border text-black border-gray-300 rounded-lg bg-[rgb(248,249,252)] dark:bg-[rgb(176,176,176)] focus:ring-2
//             ${
//               error
//                 ? "border-red-500 focus:border-red-600 focus:ring-red-200 dark:focus:ring-red-600"
//                 : " dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-gray-600 dark:focus:border-gray-500 outline-none"
//             }
//             outline-none`}
//         />
//       )}

//       {error && <span className="text-red-500 text-sm">{error}</span>}
//     </div>
//   );
// };

// export default FormField;


const FormField = ({
  id,
  label,
  type = "text",
  value,
  required = false,
  onChange,
  error,
  placeholder = "",
  onWheel,
  autoComplete = "off",
  className = "",
  children,
  disabled = false, 
}) => {
  return (
    <div className={`${className} flex flex-col gap-1 `}>
      <label
        htmlFor={id}
        className={`text-base font-medium ${
          disabled
            ? "text-gray-400 dark:text-gray-500"
            : "text-gray-700 dark:text-gray-200"
        }`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {children ? (
        children
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onWheel={onWheel}
          disabled={disabled}
          className={`px-4 py-2 text-base border rounded-lg outline-none transition-colors
            ${
              disabled
                ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                : "bg-[rgb(248,249,252)] text-black dark:bg-[rgb(176,176,176)]"
            }
            ${
              error
                ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-600"
                : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-gray-600 dark:focus:border-gray-500"
            }`}
        />
      )}

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default FormField;