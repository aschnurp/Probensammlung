import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from 'axios';

export default function ProbeAusschleusen() {
  const [barcodeId, setBarcodeId] = useState('');
  const [errors, setErrors] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleScan = (e) => {
    setBarcodeId(e.target.value);
  };


  
const validateForm = async () => {
  const newErrors = {};
  const barcode = barcodeId.trim();

  if (!barcode) {
    newErrors.barcodeId = 'Barcode ID darf nicht leer sein.';
    setErrors(newErrors);
    setSnackbarMessage(newErrors.barcodeId);
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
    return false;
  }

  try {
    const response = await axios.get(
      'http://localhost:8000/table/data',
      {
        params: { table_name: 'vorlaeufigeproben' },
      }
    );

    const proben = response.data;

    const barcodeExists = Array.isArray(proben) && proben.some(
      (probe) =>
        String(probe.barcode_id ?? probe.barcodeId ?? '').trim() === barcode
    );

    if (!barcodeExists) {
      newErrors.barcodeId =
        'Dieser Barcode ist nicht verfügbar oder wurde bereits gelöscht.';
    }
  } catch (error) {
    console.error('Fehler bei der Barcode-Prüfung:', error);

    newErrors.barcodeId =
      error.response?.status === 404
        ? 'Die Tabelle oder der Barcode wurde nicht gefunden.'
        : 'Die Barcode-Prüfung ist fehlgeschlagen.';
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    setSnackbarMessage(newErrors.barcodeId);
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
    return false;
  }

  return true;
};

const handleSubmit = async () => {
  const isValid = await validateForm();

  if (!isValid) {
    return;
  }

    const payload = {
      barcode_id: barcodeId.trim(),
    };
  
    try {
      const response = await axios.delete(
        'http://localhost:8000/delete/vorlaeufigeproben',
        {
          headers: { 'Content-Type': 'application/json' },
          data: payload,
        }
      );
  
      setSnackbarMessage('Probe erfolgreich entfernt!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setBarcodeId('');
  
    } catch (error) {
      console.error("Fehler beim Entfernen:", error);
    
      const message =
        error.response?.status === 404
          ? "Diese vorläufige Probe existiert nicht oder wurde bereits entfernt."
          : "Fehler beim Entfernen der Probe.";
    
      setSnackbarMessage(message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    if (!barcodeId.trim()) return; // Falls barcodeId leer ist, nicht ausführen.
  
    const newTimeout = setTimeout(() => {
      if (validateForm()) {
        handleSubmit();
      }
    }, 2000);
  
    setTypingTimeout(newTimeout);
  
    return () => clearTimeout(newTimeout); // Bereinigung des alten Timeouts
  
  }, [barcodeId]); // Wird nur ausgeführt, wenn barcodeId sich ändert.
  

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}
    onKeyDown={(e) => {
      if (e.key === "Enter") { //bei press-enter
        const active = document.activeElement; // Cursor Element
        if (active.name === "barcodeId") { 
          e.preventDefault(); //aendere default funktion
          handleSubmit();    //submit
        }
      }
    }}>
      <Box sx={{ position: 'absolute', top: 90, left: 16 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => (window.location.href = '/overview')}
        >
          <IoMdArrowRoundBack className="text-2xl" />
        </Button>
      </Box>
      <Box sx={{ textAlign: 'center', mt: 4, mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Proben Entfernen
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.primary' }}>
          Nicht verwendete Probengefäße (Probenröhrchen) können hier gelöscht werden. Die Löschung erfolgt 2 Sekunden nach dem Scan.
        </Typography>
      </Box>

      <TextField
        label="Scannerfeld für Barcode ID"
        name="barcodeId"
        value={barcodeId}
        onChange={handleScan}
        fullWidth
        margin="normal"
        error={Boolean(errors.barcodeId)}
        helperText={errors.barcodeId}
        autoFocus
      />

      {/* Snackbar für Meldungen */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
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
