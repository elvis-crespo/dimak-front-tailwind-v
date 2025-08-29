/* eslint-disable react/prop-types */
const FormField = ({
  id,
  label,
  type = "text",
  value,
  required = false,
  error,
  placeholder = "",
  autoComplete = "off",
  className = "",
  onChange,
  onKeyDown,
  onWheel,
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
          onKeyDown={onKeyDown}
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