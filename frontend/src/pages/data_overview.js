'use client';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

// Import column definitions
import { laboratoryDataColumns } from '../types/laboratoryColumns';
import { medicalHistoryColumns } from '../types/medicalHistoryColumns';
import { complicationColumns } from '../types/complicationColumns';
import { patientDataColumns } from '../types/patientDataColumns';

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
        const tableName = e.currentTarget.textContent?.trim() || null;
        setSelectedTable(tableName);
        let tbName;

        if (tableName === "Patient") {
            tbName = "patient";
        } else if (tableName === "Serumproben") {
            tbName = "serumproben";
        } else if (tableName === "Gewebeproben") {
            tbName = "gewebeproben";
        } else if (tableName === "Urinproben") {
            tbName = "urinproben";
        } else {
            tbName = tableName?.toLowerCase() || '';
        }

        console.log(tbName);

        if (tableName) {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:8000/table/data?table_name=${tbName}`);
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                setError('Failed to fetch data');
                console.error(error);
            } finally {
                setLoading(false);
            }
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
                                <li><a href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={handleTable}>Patientendaten</a></li>
                                <li><a href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={handleTable}>Anamnese</a></li>
                                <li><a href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={handleTable}>Labor</a></li>
                                <li><a href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={handleTable}>Komplikationen</a></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {selectedTable === "Labor" && !loading && !error && (
                <div className="flex justify-center items-center mt-12">
                    <div className="w-full h-[700px] overflow-y-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100 sticky top-0 z-10">
                                <tr>
                                    {laboratoryDataColumns.map(col => (
                                        <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {col.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.map(row => (
                                    <tr key={row.id}>
                                        {laboratoryDataColumns.map(col => (
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
            )}

            {selectedTable === "Patientendaten" && !loading && !error && (
                <div className="flex justify-center items-center mt-12">
                    <div className="w-full h-[700px] overflow-y-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100 sticky top-0 z-10">
                                <tr>
                                    {patientDataColumns.map(col => (
                                        <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {col.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.map(row => {
                                    const sexLabel = row.sex === 1 ? 'Männlich' : row.sex === 2 ? 'Weiblich' : 'Divers';
                                    return (
                                        <tr key={row.patient_id}>
                                            {patientDataColumns.map(col => (
                                                <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {col.key === 'sex' ? sexLabel : row[col.key] !== null ? row[col.key] : 'N/A'}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {selectedTable === "Komplikationen" && !loading && !error && (
                <div className="flex justify-center items-center mt-12">
                    <div className="w-full h-[700px] overflow-y-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100 sticky top-0 z-10">
                                <tr>
                                    {complicationColumns.map(col => (
                                        <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {col.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.map(row => (
                                    <tr key={row.patient_id}>
                                        {complicationColumns.map(col => (
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
            )}

            {selectedTable === "Anamnese" && !loading && !error && (
                <div className="flex justify-center items-center mt-12">
                    <div className="w-full h-[700px] overflow-y-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100 sticky top-0 z-10">
                                <tr>
                                    {medicalHistoryColumns.map(col => (
                                        <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {col.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.map(row => (
                                    <tr key={row.patient_id}>
                                        {medicalHistoryColumns.map(col => (
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
            )}

            {error && (
                <div className="flex justify-center items-center mt-12">
                    <p className="text-red-500">{error}</p>
                </div>
            )}
        </>
    );
}