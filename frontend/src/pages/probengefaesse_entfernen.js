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

  const validateForm = () => {
    const newErrors = {};
    if (!barcodeId.trim()) {
      newErrors.barcodeId = 'Barcode ID darf nicht leer sein.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setSnackbarMessage("Bitte füllen Sie alle erforderlichen Felder aus.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const payload = { barcode_id: barcodeId };

    try {
      const response = await axios.delete(
        `http://localhost:8000/delete/vorlaeufigeproben`,
        {
          headers: { "Content-Type": "application/json" },
          data: payload, // Correctly passing the data
        }
      );

      console.log("Response after delete:", response);

      setSnackbarMessage("Probe erfolgreich entfernt!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setBarcodeId(""); // Clear the input field after success

    } catch (error) {
      console.error("Fehler beim Entfernen:", error);
      setSnackbarMessage("Fehler beim Entfernen der Probe.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (barcodeId.trim()) {
      const timeout = setTimeout(() => {
        handleSubmit();
      }, 2000); 

      setTypingTimeout(timeout);
    }

    return () => {
      clearTimeout(typingTimeout);
    };
  }, [barcodeId]); 

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
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
