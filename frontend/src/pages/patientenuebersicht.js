import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from 'axios';

export default function Patientenuebersicht() {
  const [patientID, setPatientID] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [sampleData, setSampleData] = useState({});

  const [probeninformationOptionsToRender, setProbeninformationOptionsToRender] = useState([]);
  const [probeninformationLTXOptionsToRender, setProbeninformationLTXOptionsToRender] = useState([]);

  const ROUTES = {
    gewebeproben: "/samples/gewebeentries",
    serumproben: "/samples/serumentries",
    urinproben: "/samples/urinentries",
    galleproben: "/samples/galleentries",
    stuhlproben: "/samples/stuhlentries",
    edtaplasmaproben: "/samples/edtaentries"
  };

  const TABLE_NAMES = Object.keys(ROUTES);

  const DISPLAY_NAMES = {
    gewebeproben: "Gewebeproben",
    serumproben: "Serumproben",
    urinproben: "Urinproben",
    galleproben: "Galleproben",
    stuhlproben: "Stuhlproben",
    edtaplasmaproben: "EDTA-Plasmaproben"
  };

  // Hier manuell festlegen, welche Tabellen LTX-Mapping verwenden sollen
  const LTX_TABLES = ["galleproben", "stuhlproben", "edtaplasmaproben"];
  // Rest sind normale Tabellen (z.B. serum, gewebe, urin)
  const NORMAL_TABLES = TABLE_NAMES.filter(t => !LTX_TABLES.includes(t));

  // Optionen laden
  useEffect(() => {
    const getOptions = async (tableName, setFunction) => {
      try {
        const res = await fetch(`http://localhost:8000/table/data?table_name=${tableName}`);
        if (!res.ok) throw new Error(`Fehler beim Abrufen von ${tableName}`);
        const response = await res.json();
        setFunction(response);
      } catch (error) {
        console.error(`Error fetching ${tableName}:`, error);
      }
    };

    getOptions("probeninformation", setProbeninformationOptionsToRender);
    getOptions("probeninformation_ltx", setProbeninformationLTXOptionsToRender);
  }, []);

  // Proben-Daten laden
  const fetchSampleData = async () => {
    if (!patientID.trim()) {
      setSnackbarSeverity("warning");
      setSnackbarMessage("Bitte eine Patientennummer eingeben.");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);

    try {
      const responses = await Promise.all(
        TABLE_NAMES.map(async (table) => {
          const route = ROUTES[table];
          const url = `http://localhost:8000${route}/${patientID}`;
          const res = await axios.get(url);
          return { table, data: res.data || [] };
        })
      );

      const collected = {};
      responses.forEach(({ table, data }) => {
        collected[table] = data;
      });

      setSampleData(collected);

      setSnackbarSeverity("success");
      setSnackbarMessage("Daten erfolgreich geladen.");
      setSnackbarOpen(true);

    } catch (err) {
      console.error(err);
      setSnackbarSeverity("error");
      setSnackbarMessage("Fehler beim Laden der Daten.");
      setSnackbarOpen(true);

    } finally {
      setLoading(false);
    }
  };

  // Helfer: Mapping-Find mit sicherer Rückgabe
  const findNormalText = (id) => {
    if (id === undefined || id === null) return null;
    const found = probeninformationOptionsToRender.find(p => String(p.id) === String(id));
    return found ? found.probeninformation_text : String(id);
  };

  const findLtxText = (id) => {
    if (id === undefined || id === null) return null;
    const found = probeninformationLTXOptionsToRender.find(p => String(p.id) === String(id));
    return found ? found.probeninformation_text : String(id);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1300, mx: 'auto' }}
    onKeyDown={(e) => {
      if (e.key === "Enter") { //bei press-enter
        const active = document.activeElement; // Cursor Element
        if (active.name === "patient_Id_intern") { 
          e.preventDefault(); //aendere default funktion
          fetchSampleData();    //submit
        }
      }
    }}
    >
      <Box sx={{ position: 'absolute', top: 90, left: 16 }}>
        <Button variant="contained" color="primary" onClick={() => (window.location.href = '/overview')}>
          <IoMdArrowRoundBack className="text-2xl" />
        </Button>
      </Box>

      <Box sx={{ textAlign: 'center', mt: 4, mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Patientenübersicht
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.primary' }}>
          Eine Übersicht aller eingetragenen Proben eines Patienten.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, maxWidth: 600, mx: 'auto' }}>
        <TextField
          label="Patientennummer (z. B. HL0125)"
          name="patient_Id_intern" 
          value={patientID}
          onChange={(e) => setPatientID(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          onClick={fetchSampleData}
          disabled={loading}
        >
          {loading ? 'Lade...' : 'Laden'}
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 5 }}>
        <Table>
          <TableHead>
            <TableRow>
              {TABLE_NAMES.map((table) => (
                <TableCell key={table} align="center" sx={{ fontWeight: "bold" }}>
                  {DISPLAY_NAMES[table] || table}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              {TABLE_NAMES.map((table) => (
                <TableCell key={table} align="left" sx={{ verticalAlign: 'top' }}>
                  {sampleData[table]?.length > 0 ? (
                    <ul style={{ paddingLeft: 20, margin: 0 }}>
                      {sampleData[table].map((row) => {
                        if (LTX_TABLES.includes(table)) {

                          console.log("ROW LTX:", row);
                          console.log("LTX OPTIONS:", probeninformationLTXOptionsToRender);

                          const incomingID = row.probeninformation_ltx;
                          const mappingHit = probeninformationLTXOptionsToRender.find(
                            (p) => String(p.id) === String(incomingID)
                          );

                          return (
                            <li key={row.id}>
                              {(() => {
                                // Mapping-Auswahl basierend auf Tabelle
                                const isLTX = ["galleproben", "stuhlproben", "edtaplasmaproben"].includes(table);

                                const list = isLTX
                                  ? probeninformationLTXOptionsToRender
                                  : probeninformationOptionsToRender;

                                const info = list.find(p => p.id === row.probeninformation);

                                return info ? info.probeninformation_text : "-";
                              })()}
                            </li>

                          );
                        }

                        const normal = findNormalText(row.probeninformation);
                        const fallback = row.probeninformation_text;
                        const displayed = normal ?? fallback ?? "-";
                        return <li key={row.id}>{displayed}</li>;
                      })}
                    </ul>
                  ) : (
                    <span>-</span>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
