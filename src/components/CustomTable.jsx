/* eslint-disable react/prop-types */
import styled from "styled-components";
import { themeTypography } from "../utils/themes";
import { SlOptionsVertical } from "react-icons/sl";
import Swal from "sweetalert2";
import InstallationRecordsPopup from "../Pages/InstallationRecordsPopup";
import { createRoot } from "react-dom/client";
import { useState } from "react";

const TableContainer = styled.div`
  width: 100%;
  max-width: 80vw;
  padding: 20px;
  background: ${({ theme }) => theme.background};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: ${themeTypography.fontFamily};
  overflow-x: auto;
  z-index: 4;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Table = styled.table`
  width: 100%;
  min-width: 800px; /* Ancho mínimo para forzar el scroll en móviles */
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.bgForm};
`;

const TableHeader = styled.thead`
  color: ${({ theme }) => theme.text};

  th {
    text-align: left;
    padding: 12px 20px;
    font-size: 14px;
    border-bottom: 2px solid #e0e0e0;
    white-space: nowrap; /* Evita que los títulos se expandan demasiado */
  }

  th:nth-child(4) {
    /* 4 es la columna "Detalles de instalación" */
    max-width: 300px; /* Define un ancho máximo */
    overflow: hidden;
    text-overflow: ellipsis; /* Añade puntos suspensivos (...) si el texto es muy largo */
    white-space: nowrap; /* Evita saltos de línea */
  }

  @media (max-width: 768px) {
    th {
      padding: 8px;
      font-size: 12px;
    }
  }
`;

const TableBody = styled.tbody`
  background: ${({ theme }) => theme.bgForm};

  tr {
    border-bottom: 1px solid #e0e0e0;

    &:hover {
      background: ${({ theme }) => theme.hoverTable};
    }
  }
  td {
    padding: 12px 20px;
    font-size: 14px;
    vertical-align: middle;
    text-align: left;
    transition: all 0.5s ease-in-out;
  }

  td:nth-child(4) {
    /* Columna "Detalles de instalación" */
    max-width: 300px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }

  td.expanded {
    max-width: none;
    white-space: normal;
  }

  @media (max-width: 768px) {
    td {
      padding: 8px;
      font-size: 12px;
    }
  }
`;

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
      width: "80vw",
      heightAuto: true,
      customClass: {
        htmlContainer: "custom-swal-container",
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
  const [expandedRows, setExpandedRows] = useState({});

  const toggleExpand = (rowIndex) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowIndex]: !prev[rowIndex],
    }));
  };

  return (
    <>
      <div style={{ width: "100VW" }}></div>
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              {columnsHeader.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
              {showActions && <th>Instalaciones</th>}
            </tr>
          </TableHeader>

          <TableBody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columnKeys.map((key, colIndex) => (
                    <td
                      key={colIndex}
                      className={expandedRows[rowIndex] ? "expanded" : ""}
                      onClick={() => toggleExpand(rowIndex)}
                      style={{
                        maxWidth: expandedRows[rowIndex] ? "300px" : "300px",
                        whiteSpace: expandedRows[rowIndex]
                          ? "normal"
                          : "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        cursor: "pointer",
                      }}
                    >
                      {key === "photoUrl" ? (
                        row[key] ? (
                          <img
                            src={row[key]}
                            alt="Imagen"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              Swal.fire({
                                imageUrl: row[key],
                                imageAlt: "Imagen",
                                customClass: {
                                  popup: "custom-swal-width",
                                },
                                showCloseButton: true,
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
                    </td>
                  ))}
                  {showActions && (
                    <td style={{}}>
                      <SlOptionsVertical
                        style={{ cursor: "pointer" }}
                        onClick={() => openPopup({ plate: row.plate })}
                      />
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columnsHeader.length + 1}
                  style={{ textAlign: "center" }}
                >
                  No hay datos disponibles
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
