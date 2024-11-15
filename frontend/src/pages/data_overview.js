import { gewebeprobenDataColumns } from '../types/gewebeprobenColumns';
import { patientDataColumns } from '../types/patientColumns';
import { serumprobenDataColumns } from '../types/serumprobenColumns';
import { urinprobenDataColumns } from '../types/urinprobenColumns';
import { parffinprobenDataColumns } from '../types/paraffinprobenColumns';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

// Mapping der Tabellen-Spalten für dynamisches Rendern
const TABLE_COLUMNS = {
  patient: patientDataColumns,
  gewebeproben: gewebeprobenDataColumns,
  serumproben: serumprobenDataColumns,
  urinproben: urinprobenDataColumns,
  paraffinproben: parffinprobenDataColumns
};

export default function Uebersicht() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Added filtered data state
  const [editRowIndex, setEditRowIndex] = useState(null); // Für das Bearbeiten von Einträgen
  const [formData, setFormData] = useState({}); // Für die Datenbearbeitung
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Filter search query
  const [selectedColumn, setSelectedColumn] = useState(""); // Selected column for search filter
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
      setFilteredData(response.data); // Initialize filtered data with fetched data
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // Handle search for specific column
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setFilteredData(data); // If the search query is empty, show all data
    } else {
      const lowercasedQuery = query.toLowerCase();
      const filtered = data.filter((row) => {
        if (selectedColumn && row[selectedColumn]) {
          return row[selectedColumn].toString().toLowerCase().includes(lowercasedQuery);
        }
        return Object.keys(row).some((key) => 
          row[key] && row[key].toString().toLowerCase().includes(lowercasedQuery)
        );
      });
      setFilteredData(filtered); // Set filtered data based on search query
    }
  };

  // Handle column selection for search filter
  const handleColumnSelect = (e) => {
    setSelectedColumn(e.target.value);
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

  // Handle Edit Click
  const handleEditClick = (index, rowData) => {
    setEditRowIndex(index);
    setFormData({ ...rowData }); // Die aktuellen Zeilendaten im Bearbeitungsformular laden
  };

  // Handle Cancel Edit
  const handleCancelEdit = () => {
    setEditRowIndex(null);
    setFormData({});
  };

  // Handle Save (Update) function
  const handleSave = async (rowId) => {
    try {
      const response = await axios.put(`http://localhost:8000/table/data/${rowId}`, formData);
      setData(data.map((row, index) => (index === editRowIndex ? response.data : row)));
      setFilteredData(filteredData.map((row, index) => (index === editRowIndex ? response.data : row))); // Update filtered data as well
      setEditRowIndex(null); // Bearbeitungsmodus beenden
      setFormData({});
    } catch (error) {
      console.error('Failed to update data', error);
    }
  };

  // Handle Delete function
  const handleDelete = async (rowId) => {
    try {
      await axios.delete(`http://localhost:8000/table/data/${rowId}`);
      setData(data.filter((row) => row.id !== rowId));
      setFilteredData(filteredData.filter((row) => row.id !== rowId)); // Remove from filtered data as well
    } catch (error) {
      console.error('Failed to delete data', error);
    }
  };

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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktionen</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map(col => (
                    <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {editRowIndex === rowIndex ? (
                        <input
                          value={formData[col.key] || ''}
                          onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value })}
                          className="border border-gray-300 px-2 py-1"
                        />
                      ) : (
                        row[col.key] !== null ? row[col.key] : 'N/A'
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editRowIndex === rowIndex ? (
                      <>
                        <button
                          onClick={() => handleSave(row.id)}
                          className="text-green-500 hover:text-green-700 mr-2"
                        >
                          Speichern
                        </button>
                        <button onClick={handleCancelEdit} className="text-red-500 hover:text-red-700">
                          Abbrechen
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick(rowIndex, row)}
                          className="text-blue-500 hover:text-blue-700 mr-2"
                        >
                          Bearbeiten
                        </button>
                        <button
                          onClick={() => handleDelete(row.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Löschen
                        </button>
                      </>
                    )}
                  </td>
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

      {/* Filter Input */}
      {selectedTable && (
        <div className="flex margin-left auto mt-4">
          <div className="mr-4">
            <select
              value={selectedColumn}
              onChange={handleColumnSelect}
              className="border border-gray-300 px-4 py-2 rounded"
            >
              <option value="">Alle Spalten</option>
              {TABLE_COLUMNS[selectedTable]?.map((col) => (
                <option key={col.key} value={col.key}>
                  {col.label}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Suche..."
            className="border border-gray-300 px-4 py-2 rounded"
          />
        </div>
      )}

      {renderTable()}
    </>
  );
}
