/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { CustomerTable } from "../components/CustomTable";
import axiosInstance from "../utils/axiosInstance";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  width: 100%;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PaginationButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px; 
`;

const PaginationButton = styled.button`
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
  cursor: pointer;
  border: none;
  background-color: ${(props) => (props.disabled ? "#b0b0b0" : "#007bff")};
  color: ${(props) => (props.disabled ? "#fff" : "#fff")};

  &:hover {
    background-color: ${(props) => (props.disabled ? "#b0b0b0" : "#0056b3")};
    transform: ${(props) => (props.disabled ? "none" : "scale(1.05)")};
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px 12px;
  }
`;

const PageInfo = styled.span`
  margin: 0 10px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  @media (max-width: 768px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const SortButton = styled.button`
  padding: 10px 16px;
  background-color: #28a745;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
  cursor: pointer;
  border: none;
  margin-top: 10px;

  &:hover {
    background-color: #218838;
    transform: scale(1.05);
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px 12px;
  }
`;

const PageSizeSelectContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px; 
  align-items: center;
  gap: 10px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px 12px;
  }
`;

const PageSizeSelect = styled.select`
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px 12px;
  }
`;

export default function InstallationsRecordsPopup({ plate }) {
  const columnsHeader = [
    "Placa",
    "Nº de Factura",
    "Nº de ficha técnica",
    "Detalles de la Instalación",
    "Técnico",
    "Fecha",
    "Foto",
  ];
  const columnKeys = [
    "plateId",
    "invoiceNumber",
    "technicalFileNumber",
    "installationCompleted",
    "technicianName",
    "date",
    "photoUrl",
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [sortDir, setSortDir] = useState("desc");
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5); 
  useEffect(() => {
    const fetchData = async () => {
      if (!plate) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(
          `/installation/showall?plate=${plate}&pageNumber=${page}&pageSize=${pageSize}&sortDir=${sortDir}`
        );

        setData(response.data.installationRecords);
        setTotalPages(response.data.totalPages);

        // console.log("Datos obtenidos:", response.data.installationRecords);
        // if (response.data.installationRecords.length === 0) {
        //   setError("No se encontraron registros para esta placa.");
        // }
      } catch (error) {
        // console.error("Error al obtener los datos:", error.message);
        setError(`Error al obtener los datos: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [plate, page, sortDir, pageSize]); 

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value, 10)); // Actualiza el tamaño de la página
    setPage(1); // Restablece la página a la 1 cuando se cambia el tamaño
  };

  return (
    <>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data.length > 0 ? (
        <>
          <CustomerTable
            data={data}
            columnsHeader={columnsHeader}
            columnKeys={columnKeys}
          />

          <PaginationContainer>
            <PageSizeSelectContainer>
              <span>Registros por página:</span>
              <PageSizeSelect value={pageSize} onChange={handlePageSizeChange}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </PageSizeSelect>
            </PageSizeSelectContainer>

            <PaginationButtonsContainer>
              <PaginationButton
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              >
                Anterior
              </PaginationButton>
              <PageInfo>
                Página {page} de {totalPages}
              </PageInfo>
              <PaginationButton
                disabled={page === totalPages}
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Siguiente
              </PaginationButton>
            </PaginationButtonsContainer>

            <SortButton
              onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
            >
              Orden: {sortDir === "asc" ? "Ascendente" : "Descendente"}
            </SortButton>
          </PaginationContainer>
        </>
      ) : (
        !loading && <p>No se encontraron registros para esta placa.</p>
      )}
    </>
  );
}
