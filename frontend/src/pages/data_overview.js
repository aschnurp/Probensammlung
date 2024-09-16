import { gewebeprobenDataColumns } from '../types/gewebeprobenColumns';
import { patientDataColumns } from '../types/patientColumns';
import { serumprobenDataColumns } from '../types/serumprobenColumns';
import { urinprobenDataColumns } from '../types/urinprobenColumns';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

// Mapping der Tabellen-Spalten für dynamisches Rendern
const TABLE_COLUMNS = {
  patient: patientDataColumns,
  gewebeproben: gewebeprobenDataColumns,
  serumproben: serumprobenDataColumns,
  urinproben: urinprobenDataColumns,
};

export default function Uebersicht() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleTable = async (e) => {
    e.preventDefault();
    const tableName = e.currentTarget.textContent?.trim().toLowerCase();  // Tabellenname in Kleinbuchstaben
    setSelectedTable(tableName);

    if (!TABLE_COLUMNS[tableName]) {
      setError("Invalid table name");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:8000/table/data?table_name=${tableName}`);
      setData(response.data);
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTable) {
      setIsOpen(false);
    }
  }, [selectedTable]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const renderTable = () => {
    const columns = TABLE_COLUMNS[selectedTable];

    if (!columns || loading) return null;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
      <div className="flex justify-center items-center mt-12">
        <div className="w-full h-[700px] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                {columns.map(col => (
                  <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map(col => (
                    <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row[col.key] !== null ? row[col.key] : 'N/A'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="font-bold">Alle Tabellen der Datenbank</h1>
      </div>

      <div className="flex justify-center items-center mt-12">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            type="button"
          >
            Tabellenname auswählen
            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute z-20 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
              <ul className="py-2 text-sm text-gray-700">
                {Object.keys(TABLE_COLUMNS).map((tableName) => (
                  <li key={tableName}>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={handleTable}>
                      {tableName.charAt(0).toUpperCase() + tableName.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {renderTable()}
    </>
  );
}
