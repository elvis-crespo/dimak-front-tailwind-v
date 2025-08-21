/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { CustomerTable } from "../components/CustomTable";
import axiosInstance from "../utils/axiosInstance";

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
      } catch (error) {
        setError(`Error al obtener los datos: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [plate, page, sortDir, pageSize]);

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value, 10));
    setPage(1);
  };

  return (
    <>
      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data.length > 0 ? (
        <>
          <CustomerTable
            data={data}
            columnsHeader={columnsHeader}
            columnKeys={columnKeys}
          />

          {/* Contenedor de Paginación */}
          <div className="flex flex-wrap items-center justify-between mt-6 w-full gap-4">
            {/* Selector de registros */}
            <div className="flex items-center gap-2 text-sm">
              <span>Registros por página:</span>
              <select
                className="px-3 py-2 border rounded-lg cursor-pointer text-sm"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>

            {/* Botones de paginación */}
            <div className="flex items-center justify-center gap-2 mr-5">
              <button
                className={`px-4 py-2 rounded-lg font-bold text-white transition transform 
                ${
                  page === 1
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
                }`}
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              >
                Anterior
              </button>

              <span className="mx-2 text-base font-semibold text-gray-700">
                Página {page} de {totalPages}
              </span>

              <button
                className={`px-4 py-2 rounded-lg font-bold text-white transition transform 
                ${
                  page === totalPages
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
                }`}
                disabled={page === totalPages}
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              >
                Siguiente
              </button>
            </div>

            {/* Botón ordenar */}
            <button
              onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
              className="px-4 py-2 rounded-lg font-bold text-white bg-green-600 hover:bg-green-700 transition transform hover:scale-105 text-sm"
            >
              Orden: {sortDir === "asc" ? "Ascendente" : "Descendente"}
            </button>
          </div>
        </>
      ) : (
        !loading && <p>No se encontraron registros para esta placa.</p>
      )}
    </>
  );
}
