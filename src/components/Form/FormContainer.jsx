/* eslint-disable react/prop-types */
const FormContainer = ({ children, onSubmit }) => {
  return (
    <div className="appear animate-fadeInSlight md:mx-auto w-full max-w-[700px] bg-[rgb(248,249,252)] dark:bg-black p-4 md:p-8 shadow-lg dark:shadow-gray-900 rounded-lg font-display">
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {children}
      </form>
    </div>
  );
};

export default FormContainer;