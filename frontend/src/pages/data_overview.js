import { gewebeprobenDataColumns } from '../types/gewebeprobenColumns';
import { patientDataColumns } from '../types/patientColumns';
import { serumprobenDataColumns } from '../types/serumprobenColumns';
import { urinprobenDataColumns } from '../types/urinprobenColumns';
import { paraffinprobenDataColumns } from '../types/paraffinprobenColumns';
import dayjs from 'dayjs';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import InfoIcon from '@mui/icons-material/Info';
//import InfoIcon from '@mui/icons-material/Info';
import {
  Box,
  TextField,
  Button,
  Typography,
  Popover,
  IconButton,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Snackbar,
} from '@mui/material';


// Mapping der Tabellen-Spalten für dynamisches Rendern
const TABLE_COLUMNS = {
  paraffinproben: paraffinprobenDataColumns,
  gewebeproben: gewebeprobenDataColumns,
  serumproben: serumprobenDataColumns,
  urinproben: urinprobenDataColumns,
  patient: patientDataColumns,
};

// definition für probenstatus mapping
const STATUS_MAPPING = {
  1: "eingescheust",
  2: "ausgeschleust",
  3: "wiedereingeschleust",
}
const ABHOLER_MAPPING = {
  1: process.env.NEXT_PUBLIC_ABHOLER_ONE,
  2: process.env.NEXT_PUBLIC_ABHOLER_TWO,
  3: process.env.NEXT_PUBLIC_ABHOLER_THREE,
  4: process.env.NEXT_PUBLIC_ABHOLER_FOUR,
  5: process.env.NEXT_PUBLIC_ABHOLER_FIVE,
  6: process.env.NEXT_PUBLIC_ABHOLER_SIX,
  7: "Andere"
}

require('dotenv').config();

export default function Uebersicht() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const dropdownRef = useRef(null);
  const tableScrollRef = useRef(null);
  const [Table_header, setTable_header] = useState(""); // Keep React state setter
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openPsw, setOpen] = useState()
  const [openCheck, setOpenCheck] = useState()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpenPASSW = () => {
    setOpen(true);
  };

  // Handle closing the dialog
  const handleClosePASSW = () => {
    setOpen(false);
    setError(""); // Reset error state when closing
  };

  // Handle Check change
  const handleOpenCheck = () => {
    setOpenCheck(true);
  };

  // Handle Check change
  const handleCloseCheck = (e) => {
    setOpenCheck(false);
    setError(""); // Reset error state when closing
  };


  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  useEffect(() => {
    // Dynamically update Table_header whenever selectedTable changes
    if (selectedTable === "urinproben") {
      setTable_header("Urinproben");
    } else if (selectedTable === "serumproben") {
      setTable_header("Serumproben");
    } else if (selectedTable === "gewebeproben") {
      setTable_header("Gewebeproben");
    } else if (selectedTable === "paraffinproben") {
      setTable_header("Paraffinproben");
    } else if (selectedTable === "patient") {
      setTable_header("Patient");
    } else {
      setTable_header("");
    }
  }, [selectedTable]); // Dependency on selectedTable


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
      console.log("sucsessful change table");
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
    handleCloseCheck();
  };

  // Handle Cancel Edit
  const handleCancelEdit = () => {
    setEditRowIndex(null);
    setFormData({});
  };

  const handleSave = async () => {
    if (!selectedTable) {
      console.error("No table selected for updating data");
      return;
    }

    try {
      const payload = { ...formData }; // Include the updated row data
      const response = await axios.put(
        `http://localhost:8000/update/${selectedTable}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Update the table data with the response
      setData((prevData) =>
        prevData.map((row, index) =>
          index === editRowIndex ? response.data : row
        )
      );
      setFilteredData((prevFiltered) =>
        prevFiltered.map((row, index) =>
          index === editRowIndex ? response.data : row
        )
      );

      setEditRowIndex(null); // Exit edit mode
      setFormData({});
    } catch (error) {
      console.error("Failed to update data", error);
    }
  };


  const handleDelete = async (row) => {
    console.log(row);
    let payload;
    try {
      // Prepare the payload to send, including the required fields
      if (selectedTable === "paraffinproben") {
        payload = {
          id: row.id,
          probenart: row.probenart,
          patient_Id_intern: row.patient_Id_intern,
        };
      } else {
        payload = {
          patient_Id_intern: row.patient_Id_intern,
          probenart: row.probenart,
          barcode_id: row.barcode_id,
        };
      }

      console.log("Payload to delete:", payload); // Log the payload for debugging

      // Make the DELETE request
      const response = await axios.delete(
        `http://localhost:8000/delete/${selectedTable}`,
        {
          headers: {
            "Content-Type": "application/json", // Set the content type
          },
          data: payload, // Send the payload as 'data'
        }
      );
      console.log("Response after delete:", response); // Log the response

      // Update data after successful delete
      setData((prevData) => prevData.filter((r) => r.rowId !== row.rowId));
      setFilteredData((prevFiltered) => prevFiltered.filter((r) => r.rowId !== row.rowId));

      // Fetch updated data after deletion
      const response_update = await axios.get(`http://localhost:8000/table/data?table_name=${selectedTable}`);

      // Update state with the new data
      setData(response_update.data);
      setFilteredData(response_update.data);
      console.log('Here is the updated data after deletion:', response_update.data);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  // Table horizontal Scroll logic
  const scrollLeft = () => {
    if (tableScrollRef.current) {
      tableScrollRef.current.scrollBy({ left: -100, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (tableScrollRef.current) {
      tableScrollRef.current.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };

  const renderTable = () => {
    const columns = TABLE_COLUMNS[selectedTable];

    if (!columns || loading) return null;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
      <div className="flex justify-center items-center mt-12">
        {/* Left Scroll Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
        >
          ←
        </button>
        <div className="w-full h-[700px] overflow-y-auto" ref={tableScrollRef}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aktionen
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {editRowIndex === rowIndex ? (
                        <input
                          value={formData[col.key] || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, [col.key]: e.target.value })
                          }
                          className="border border-gray-300 px-2 py-1"
                        />
                      ) : col.key === "probenart" ? (row["uebergeordete_probenart"] ? row["uebergeordete_probenart"] : ( row["untergeordnete_probenart"] ? row["untergeordnete_probenart"]: "N/A" ))

                        : (col.key === "created_at" ? (
                          // Formatierung für das Datum, falls "created_at"
                          dayjs(row[col.key]).format("DD.MM.YYYY")
                        ) : col.key === "status" && row[col.key] in STATUS_MAPPING ? (
                          // Status anzeigen, falls Status vorhanden
                          STATUS_MAPPING[row[col.key]]
                        ) : row[col.key] !== null ? (
                          row[col.key]
                        ) : (
                          "N/A"
                        ))}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editRowIndex === rowIndex ? (
                      <>
                        <Button
                          onClick={() => handleSave(row.id)}
                          variant="outlined"
                          color="success" // Matches "text-green" style
                          size='small'
                        >
                          Speichern
                        </Button>
                        <Button
                          onClick={handleCancelEdit}
                          variant="outlined"
                          color="error" // Matches "text-green" style
                          size='small'
                        >
                          Abbrechen
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => handleEditClick(rowIndex, row)}
                          variant="outlined"
                          color="primary"
                          size='small'
                        >
                          Bearbeiten
                        </Button>
                        <React.Fragment>
                          <Button variant="outlined" color="error" size='small' onClick={handleClickOpenPASSW}>
                            Löschen
                          </Button>
                          <Dialog
                            open={openPsw}
                            onClose={handleClosePASSW}
                            PaperProps={{
                              component: "form",
                              onSubmit: (event) => {
                                event.preventDefault();
                                const formData = new FormData(event.currentTarget);
                                const formJson = Object.fromEntries(formData.entries());
                                const passcode = formJson.passcode;

                                // Überprüfen, ob der Passcode korrekt ist
                                if (passcode === process.env.NEXT_PUBLIC_DELETE_PASSCODE) {
                                  handleDelete(row); // Eintrag löschen
                                } else {
                                  alert("Incorrect passcode!"); // Fehlermeldung ausgeben
                                }
                                handleClosePASSW();
                              },
                            }}
                            BackdropProps={{
                              style: {
                                backgroundColor: "rgba(0, 0, 0, 0.2)", // Weniger dunkles Overlay
                              },
                            }}
                          >
                            <DialogTitle>Passwort</DialogTitle>
                            <DialogContent>
                              <DialogContentText></DialogContentText>
                              <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="passcode"
                                name="passcode"
                                label="Passcode"
                                type="password"
                                fullWidth
                                variant="standard"
                              />
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClosePASSW}>Abbrechen</Button>
                              <Button type="submit">Speichern</Button>
                            </DialogActions>
                          </Dialog>
                          {/* Dialog for Check Field */}
                          <Dialog
                            open={openCheck}
                            onClose={handleCloseCheck}
                            PaperProps={{
                              component: "form",
                              onSubmit: (event) => {
                                event.preventDefault(); // Verhindert das Standard-Formularverhalten
                                handleEditClick(rowIndex, row); // Bearbeitungsmodus aktivieren
                              },
                            }}
                            BackdropProps={{
                              style: {
                                backgroundColor: "rgba(0, 0, 0, 0.2)", // Helligkeit Overlay
                              },
                            }}
                          >
                            <DialogTitle>Bearbeitungsmodus Aktivieren?</DialogTitle>
                            <DialogContent>
                              <DialogContentText>
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleCloseCheck}>Abbrechen</Button>
                              <Button type="submit">Ja</Button>
                            </DialogActions>
                          </Dialog>
                        </React.Fragment>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Right Scroll Button */}
        <button
          onClick={scrollRight}
          className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
        >
          →
        </button>
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
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={(e) => handleTable(e)}
                    >
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

          <IconButton onClick={handleClick}><InfoIcon />

          </IconButton >
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Typography variant='caption' fontWeight={'fontWeightBold'} sx={{ display: 'block' }}>
              Anmerkungen zum Filter:
            </Typography>
            <Typography variant='caption' sx={{ display: 'block' }}>
              Erstellungsdatum: yyyy-mm-dd
            </Typography>
            <Typography variant='caption' sx={{ display: 'block' }}>
              Probenstatus:   1: eingescheust   ---
              2: ausgeschleust  ---
              3: wiedereingeschleust
            </Typography>
          </Popover>
        </div>
      )}
      <Box
        sx={{
          textAlign: 'center',
          mt: 5,
          height: 10,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          {Table_header}
        </Typography>
      </Box>
      {renderTable()}
    </>
  );
}