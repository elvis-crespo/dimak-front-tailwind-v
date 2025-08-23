/* eslint-disable react/prop-types */
import Swal from "sweetalert2";
import InstallationRecordsPopup from "../Pages/InstallationRecordsPopup";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import showImage from "./ShowImage";

export const CustomerTable = ({
  data,
  columnsHeader,
  columnKeys,
  showActions,
  isLoading = false,
}) => {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleExpand = (rowIndex) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowIndex]: !prev[rowIndex],
    }));
  };

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
          let root = container._reactRoot;
          if (!root) {
            root = createRoot(container);
            container._reactRoot = root;
          }
          container.innerHTML = "";
          root.render(<InstallationRecordsPopup plate={plate} />);
        }
      },
    });
  };

  // if (isLoading) {
  //   return (
  //     <div className="text-center py-6 text-gray-500 dark:text-gray-300">
  //       Cargando registros...
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[80vw] py-5 bg-[rgb(248,249,252)] dark:bg-black rounded-xl shadow-md overflow-x-auto z-10">
          <table className="w-full min-w-[800px] border-collapse">
            <thead className="text-gray-700 dark:text-gray-200">
              <tr>
                {columnsHeader.map((column, index) => (
                  <th
                    key={index}
                    className={`text-left px-2 py-1 lg:px-3 lg:py-2 text-sm border-b-2 border-gray-200 whitespace-nowrap transition-colors ${
                      index === 3
                        ? "max-w-[300px] overflow-hidden text-ellipsis"
                        : ""
                    }`}
                  >
                    {column}
                  </th>
                ))}
                {showActions && (
                  <th className="text-left px-2 py-1 lg:px-3 lg:py-2 text-sm border-b-2 border-gray-200">
                    Instalaciones
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-900 dark:text-white">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={columnsHeader.length + (showActions ? 1 : 0)}
                    className="text-center py-6 text-gray-500 dark:text-gray-300"
                  >
                    Cargando registros...
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-b border-gray-200 transition-colors"
                  >
                    {columnKeys.map((key, colIndex) => (
                      <td
                        key={colIndex}
                        onClick={() => {
                          if (key === "installationCompleted")
                            toggleExpand(rowIndex);
                        }}
                        className={`px-2 py-1 lg:px-3 lg:py-2 h-[38px] text-sm align-middle text-start transition-all duration-300 
                          ${
                            key === "installationCompleted"
                              ? `max-w-[300px] truncate cursor-pointer ${
                                  expandedRows[rowIndex]
                                    ? "whitespace-normal"
                                    : "whitespace-nowrap"
                                }`
                              : "whitespace-nowrap overflow-hidden text-ellipsis"
                          }
                        `}
                      >
                        {key === "photoUrl" ? (
                          row[key] ? (
                            <img
                              src={row[key]}
                              alt="Imagen"
                              className="w-12 h-12 rounded-md cursor-pointer object-cover"
                              onClick={() => showImage(row[key])}
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
                      </td>
                    ))}
                    {showActions && (
                      <td className="px-2 py-1 lg:px-3 lg:py-2 text-sm align-middle text-start">
                        <button
                          className="text-blue-600 hover:text-blue-800 cursor-pointer"
                          onClick={() => openPopup({ plate: row.plate })}
                        >
                          Visualizar instalaciones
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columnsHeader.length + (showActions ? 1 : 0)}
                    className="text-center py-6 text-gray-500 bg-[rgb(248,249,252)] dark:bg-black"
                  >
                    No hay datos disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
