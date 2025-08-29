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
    "Imagen",
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
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full gap-4 mt-6 flex-wrap">
            <div className="flex items-center justify-center gap-2 text-sm md:text-base w-full md:w-auto">
              {/* <span>Registros por página:</span> */}
              <label htmlFor="pageSize">
                Registros por página
              </label>
              <select
                id="pageSize"
                name="pageSize"
                value={pageSize}
                onChange={handlePageSizeChange}
                className="px-3 py-2 md:px-4 md:py-2 border rounded-lg cursor-pointer text-sm md:text-base"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>

            {/* pagination */}
            <div className="flex items-center justify-center gap-2 w-full md:w-auto">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className={`px-3 md:px-4 py-2 rounded-lg font-bold transition transform
                ${
                  page === 1
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white"
                } text-sm md:text-base`}
              >
                Anterior
              </button>

              {/* pages */}
              <span className="mx-2 font-semibold text-gray-700 text-sm md:text-base whitespace-nowrap">
                Página {page} de {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={`px-3 md:px-4 py-2 rounded-lg font-bold transition transform
                ${
                  page === totalPages
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white"
                } text-sm md:text-base`}
              >
                Siguiente
              </button>
            </div>

            <button
              onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
              className="px-3 md:px-4 py-2 rounded-lg font-bold bg-green-600 hover:bg-green-700 text-white transition transform hover:scale-105 text-sm md:text-base w-auto mt-2 md:mt-0"
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
