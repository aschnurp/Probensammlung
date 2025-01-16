import { probenabholerDataColumns } from '../types/probenabholerColumns';
import dayjs from 'dayjs';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import AddIcon from '@mui/icons-material/Add';

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
  probenabholer: probenabholerDataColumns,
};


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
  const [openClick, setOpenClick] = React.useState(false);
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

  const handleClickOpen = () => {
    setOpenClick(true);
  };

  const handleClickClose = () => {
    setOpenClick(false);
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
    if (selectedTable === "probenabholer") {
      setTable_header("Probenabholer");
    } else {
      setTable_header("");
    }
  }, [selectedTable]); // Dependency on selectedTable


  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleTable = async (tableName) => {
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
      console.log("Successful table change");
    }
  };
  useEffect(() => {
    const initialTableName = "probenabholer"; // Default table to load on page open
    handleTable(initialTableName);
  }, []);


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
        payload = {
          id: row.id,
        };

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

  const renderTable = () => {
    const columns = TABLE_COLUMNS[selectedTable];

    if (!columns || loading) return null;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
      <div className="flex justify-center items-center mt-12">
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
                      ) : (
                        col.key === "created_at" ? (
                          // Formatierung für das Datum, falls "created_at"
                          dayjs(row[col.key]).format("DD.MM.YYYY")
                        ) : col.key === "status" && row[col.key] in STATUS_MAPPING ? (
                          // Status anzeigen, falls Status vorhanden
                          STATUS_MAPPING[row[col.key]]
                        ) : col.key === "abholer" && row[col.key] in ABHOLER_MAPPING ? (
                          // Mapping der Abholer
                          ABHOLER_MAPPING[row[col.key]]
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
            <Box
              sx={{
                height: 50,
                width: 50,
                p: 0
              }}
            >
              <Button onClick={handleClickOpen}>
                <AddIcon />
              </Button>
              <Dialog
                open={openClick}
                onClose={handleClickClose}
                PaperProps={{
                  component: 'form',
                  onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const response = axios.post(
                      `http://localhost:8000/new_data/probenabholer`,
                      formData,
                      {
                        headers: { 'Content-Type': 'application/json' },
                      }
                    );
                    console.log('Data submitted successfully:', response.data);
                    handleClickClose();
                  },
                }}
              >
                <DialogTitle>Neuer Probenabholer</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Bitte die gewünschte Person mit Vor- und Nachnamen Eintragen.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="name"
                    label="Name"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClickClose}>Abberechen</Button>
                  <Button type="submit">Bestätigen</Button>
                </DialogActions>
              </Dialog>

            </Box>
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
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