/* eslint-disable react/prop-types */
const FormContainer = ({ children, onSubmit }) => {
  return (
    <div className="appear animate-fadeInSlight mt-10 md:mx-auto w-full max-w-[700px] bg-[rgb(248,249,252)] dark:bg-black p-4 md:p-8 shadow-lg rounded-lg font-display">
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

//  <div className="appear mt-10 md:mx-auto w-full max-w-[700px] bg-[rgb(248,249,252)] dark:bg-black p-4 md:p-8 shadow-lg rounded-lg font-display">
//           <h2 className="text-2xl font-bold mb-6 text-gray-800">
//             Datos del Empleado
//           </h2>
//           <form
//             onSubmit={handleSubmit}
//             className="grid grid-cols-1 md:grid-cols-2 gap-6"
//           >
//             <div className="md:col-span-2 px-4 py-2 mb-1.5 rounded-md font-apple dark:bg-[#6d6d6d] bg-[#ff9494] text-white font-medium">
//               Datos del cliente
//             </div>
//             <div className="md:col-span-2 bg-transparent flex flex-col gap-1">
//               <label
//                 htmlFor="tipoDocumento"
//                 className="text-base font-medium text-gray-700 dark:text-gray-200"
//               >
//                 Tipo de Documento <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="tipoDocumento"
//                 type="text"
//                 className="px-4 py-2 text-base border border-gray-300 rounded-lg bg-[rgb(248,249,252)] dark:bg-[rgb(176,176,176)] dark:border-gray-600 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-gray-600 dark:focus:border-gray-500 outline-none"
//               />
//             </div>
// {/*
//             <div className="md:col-span-2">
//               <label
//                 htmlFor="documentID"
//                 className="block text-gray-700 font-semibold mb-1"
//               >
//                 Cédula de Identidad <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="documentID"
//                 name="documentID"
//                 required
//                 autoComplete="off"
//                 value={values.documentID}
//                 onChange={handleChange}
//                 // pattern="\d{10}"
//                 title="La cédula debe tener 10 dígitos"
//                 // maxLength="10"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Ingrese la cédula"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="firstName"
//                 className="block text-gray-700 font-semibold mb-1"
//               >
//                 Nombre <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="firstName"
//                 name="firstName"
//                 required
//                 autoComplete="off"
//                 value={values.firstName}
//                 onChange={handleChange}
//                 pattern="^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ ]+$"
//                 title="El nombre solo puede contener letras"
//                 maxLength="20"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Ej. Christian"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="lastName"
//                 className="block text-gray-700 font-semibold mb-1"
//               >
//                 Apellido <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="lastName"
//                 name="lastName"
//                 required
//                 autoComplete="off"
//                 value={values.lastName}
//                 onChange={handleChange}
//                 pattern="^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ ]+$"
//                 title="El apellido solo puede contener letras"
//                 maxLength="20"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Ej. Merchan"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-gray-700 font-semibold mb-1"
//               >
//                 Correo electrónico <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 required
//                 autoComplete="off"
//                 value={values.email}
//                 onChange={handleChange}
//                 pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
//                 title="Ingrese un correo electrónico válido"
//                 maxLength="50"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Ej. ejemplo@correo.com"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="user"
//                 className="block text-gray-700 font-semibold mb-1"
//               >
//                 Usuario <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="user"
//                 name="user"
//                 required
//                 autoComplete="off"
//                 value={values.user}
//                 onChange={handleChange}
//                 pattern="^[A-Za-z0-9]+$"
//                 title="El usuario solo puede contener letras y números"
//                 maxLength="20"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Nombre de usuario"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-gray-700 font-semibold mb-1"
//               >
//                 Contraseña <span className="text-red-500">*</span>
//               </label>

//               <div className="relative w-full">
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   required
//                   autoComplete="new-password"
//                   value={values.password}
//                   onChange={handleChange}
//                   pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,20}$"
//                   title="La contraseña debe tener al menos 6 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial"
//                   minLength="6"
//                   maxLength="20"
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
//                   placeholder="Contraseña"
//                 />
//                 <span
//                   onClick={() => setShowPassword((prev) => !prev)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
//                 >
//                   {showPassword ? "🙈" : "👁️"}
//                 </span>
//               </div>
//             </div>
//             <div>
//               <label
//                 htmlFor="birthday"
//                 className="block text-gray-700 font-semibold mb-1"
//               >
//                 Fecha de nacimiento <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="date"
//                 id="birthday"
//                 name="birthday"
//                 required
//                 autoComplete="off"
//                 value={values.birthday}
//                 onChange={handleChange}
//                 min="1950-01-01"
//                 max={new Date().toISOString().split("T")[0]}
//                 pattern="^\d{4}-\d{2}-\d{2}$"
//                 title="Ingrese una fecha válida"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="address"
//                 className="block text-gray-700 font-semibold mb-1"
//               >
//                 Dirección <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="address"
//                 name="address"
//                 required
//                 autoComplete="off"
//                 value={values.address}
//                 onChange={handleChange}
//                 pattern="^[A-Za-z0-9 áéíóúÁÉÍÓÚñÑ.,#\-]+$"
//                 title="Ingrese una dirección válida (letras, números, puntos, comas, guiones y numeral)."
//                 maxLength="50"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Dirección"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="mobilePhone"
//                 className="block text-gray-700 font-semibold mb-1"
//               >
//                 Teléfono móvil <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="tel"
//                 id="mobilePhone"
//                 name="mobilePhone"
//                 required
//                 autoComplete="off"
//                 value={values.mobilePhone}
//                 onChange={handleChange}
//                 pattern="^\d{10}$"
//                 title="El teléfono móvil debe tener 10 dígitos"
//                 maxLength="10"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Ej. 0991234567"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="vaccinationStatus"
//                 className="block text-gray-700 font-semibold mb-1"
//               >
//                 Estado de vacunación <span className="text-red-500">*</span>
//               </label>
//               <select
//                 id="vaccinationStatus"
//                 name="vaccinationStatus"
//                 required
//                 autoComplete="off"
//                 value={values.vaccinationStatus}
//                 onChange={handleChange}
//                 pattern="^(vacunado|noVacunado)$"
//                 title="Seleccione una opción"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Seleccione una opción</option>
//                 <option value="vacunado">Vacunado</option>
//                 <option value="noVacunado">No vacunado</option>
//               </select>
//             </div>
//             <div>
//               <label
//                 htmlFor="vaccine"
//                 className="block text-gray-700 font-semibold mb-1"
//               >
//                 Vacuna <span className="text-red-500">*</span>
//               </label>
//               <select
//                 id="vaccine"
//                 name="vaccine"
//                 required
//                 autoComplete="off"
//                 value={values.vaccine}
//                 onChange={handleChange}
//                 pattern="^(Pfizer|Moderna|AstraZeneca|Sinovac)$"
//                 title="Seleccione una opción"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Seleccione una vacuna</option>
//                 <option value="Pfizer">Pfizer</option>
//                 <option value="Moderna">Moderna</option>
//                 <option value="AstraZeneca">AstraZeneca</option>
//                 <option value="Sinovac">Sinovac</option>
//               </select>
//             </div>
//             <div>
//               <label
//                 htmlFor="vaccinationDate"
//                 className="block text-gray-700 font-semibold mb-1"
//               >
//                 Fecha de vacunación <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="date"
//                 id="vaccinationDate"
//                 name="vaccinationDate"
//                 required
//                 autoComplete="off"
//                 value={values.vaccinationDate}
//                 onChange={handleChange}
//                 max={new Date().toISOString().split("T")[0]}
//                 min="1950-01-01"
//                 pattern="^\d{4}-\d{2}-\d{2}$"
//                 title="Ingrese una fecha válida"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="numberDoses"
//                 className="block text-gray-700 font-semibold mb-1"
//               >
//                 Número de dosis <span className="text-red-500">*</span>
//               </label>
//               <select
//                 id="numberDoses"
//                 name="numberDoses"
//                 required
//                 autoComplete="off"
//                 value={values.numberDoses}
//                 onChange={handleChange}
//                 pattern="^[1-3]$"
//                 title="Seleccione el número de dosis"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Seleccione el número de dosis</option>
//                 <option value="1">1</option>
//                 <option value="2">2</option>
//                 <option value="3">3</option>
//               </select>
//             </div> */}


//               {/* <div className="flex items-center justify-center space-x-4">
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white font-semibold px-6 py-2 h-[42px] rounded-lg hover:bg-blue-700 transition cursor-pointer"
//                 >
//                   Registrar Empleado
//                 </button>
//                 <button
//                   type="reset"
//                   className="bg-gray-300 text-gray-800 font-semibold px-6 py-2 h-[42px] rounded-lg hover:bg-gray-400 transition cursor-pointer"
//                   onClick={reset}
//                 >
//                   Limpiar
//                 </button>
//               </div> */}
//             </div>
//           </form>
//         </div>
