import React, { useState } from 'react';
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

// Tabellen-Namen laut Backend
const TABLE_NAMES = [
  "gewebeproben",
  "serumproben",
  "urinproben",
  "galleproben",
  "stuhlproben",
  "edtaplasmaproben"
];

export default function Patientenuebersicht() {
  const [patientID, setPatientID] = useState('');
  const [loading, setLoading] = useState(false);
  const [sampleData, setSampleData] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // --- Hauptfunktion: Daten holen ---
  const fetchSampleData = async () => {
    if (!patientID) {
      setSnackbarSeverity("warning");
      setSnackbarMessage("Bitte eine Patientennummer eingeben.");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);

    try {
      const responses = await Promise.all(
        TABLE_NAMES.map(async (table) => {
          const url = `http://localhost:8000/table/data?table_name=${table}`;
          const res = await axios.get(url);

          // Filter direkt im Frontend nach patient_id
          const filtered = res.data.filter(
            (row) => row.patient_id === patientID
          );

          return { table, data: filtered };
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

  return (
    <Box sx={{ p: 3, maxWidth: 1300, mx: 'auto' }}>
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
          Nach Eingabe einer Patientennummer werden alle Probenarten gleichzeitig geladen.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, maxWidth: 600, mx: 'auto' }}>
        <TextField
          label="Patientennummer (z. B. HL0125)"
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
              <TableCell align="center">Gewebe</TableCell>
              <TableCell align="center">Serum</TableCell>
              <TableCell align="center">Urin</TableCell>
              <TableCell align="center">Galle</TableCell>
              <TableCell align="center">Stuhl</TableCell>
              <TableCell align="center">EDTA-Plasma</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              {TABLE_NAMES.map((table) => (
                <TableCell key={table} align="left">
                  {sampleData[table] && sampleData[table].length > 0 ? (
                    <ul style={{ paddingLeft: "20px", margin: 0 }}>
                      {sampleData[table].map((entry) => (
                        <li key={entry.id}>
                          {entry.probeninformation_text ?? "(Keine Beschreibung)"}
                        </li>
                      ))}
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
