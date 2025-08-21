/* eslint-disable react/prop-types */
import Swal from "sweetalert2";
import InstallationRecordsPopup from "../Pages/InstallationRecordsPopup";
import { createRoot } from "react-dom/client";

export const CustomerTable = ({
  data,
  columnsHeader,
  columnKeys,
  showActions,
}) => {
  const openPopup = ({ plate }) => {
    Swal.fire({
      title: "Registros de Instalación",
      showCloseButton: true,
      html: '<div id="swal-container"></div>',
      showConfirmButton: false,
      customClass: {
        htmlContainer: "custom-swal-container",
        popup: "custom-swal-popup",
      },
      didOpen: () => {
        const container = document.getElementById("swal-container");

         if (container) {
           // Verifica si el root ya está creado
           let root = container._reactRoot; // Guardamos una referencia al root

           // Si no existe el root, creamos uno nuevo
           if (!root) {
             root = createRoot(container);
             container._reactRoot = root; // Guardamos la referencia en el contenedor
           }

           container.innerHTML = "";

           root.render(<InstallationRecordsPopup plate={plate} />); // Actualiza el render
         }
      },
    });
  };

  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-100 text-gray-700 text-sm hidden md:table-header-group">
            <tr>
              {columnsHeader.map((column, index) => (
                <th key={index} className="px-4 py-2 text-left font-semibold">
                  {column}
                </th>
              ))}
              {showActions && (
                <th className="px-4 py-2 text-left font-semibold">
                  Instalaciones
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-sm">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="flex flex-col text-[12px] md:text-sm border-b md:table-row"
              >
                {columnKeys.map((key, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-2 flex justify-between md:table-cell"
                  >
                    <span className="font-semibold text-gray-600 md:hidden">
                      {columnsHeader[colIndex]}:
                    </span>
                    <span className="items-end md:items-center flex">
                    {key === "photoUrl" ? (
                      row[key] ? (
                        <img
                        src={row[key]}
                        alt="Imagen"
                        className="w-12 h-12 rounded cursor-pointer object-cover"
                        onClick={() => {
                          Swal.fire({
                            imageUrl: row[key],
                            imageAlt: "Imagen",
                            showCloseButton: true,
                            showConfirmButton: false,
                            scrollbarPadding: false,
                            backdrop: `
                            rgba(0, 0, 0, 0.8)
                            center top
                            no-repeat
                            `,
                            customClass: {
                              popup: "swal-image-popup",
                              image: "swal-image-content",
                            },
                          });
                        }}
                        />
                      ) : (
                        "No disponible"
                      )
                    ) : key === "date" ? (
                      row[key] && row[key] !== "0001-01-01T00:00:00" ? (
                        row[key].split("-").reverse().join("/")
                      ) : (
                        "Fecha no registrada"
                      )
                    ) : (
                      row[key] || "No disponible"
                    )}
                </span>
                  </td>
                ))}
                {showActions && (
                  <td className="px-4 py-2 flex justify-start md:table-cell">
                    <button
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      onClick={() => openPopup({ plate: row.plate })}
                      >
                      visualizar instalaciones
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
    );
  };