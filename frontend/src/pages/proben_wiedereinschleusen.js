import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  Snackbar,
  Alert,
} from '@mui/material';
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from 'axios';

export default function ProbeAusschleusen() {
  const [barcodeId, setBarcodeId] = useState('');
  const [selectedProbe, setSelectedProbe] = useState('serum'); // Default probe type
  const [errors, setErrors] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleScan = (e) => {
    setBarcodeId(e.target.value);
  };

  const handleProbeChange = (e) => {
    setSelectedProbe(e.target.value);
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
    if (!validateForm()) return;

    try {
      console.log('Trying to submit data:', barcodeId);

      const response = await axios.patch(
        `http://localhost:8000/wiedereingeschleusen/${selectedProbe}/${barcodeId}`,
        null, // No body required as per your backend logic
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log('Data submitted successfully:', response.data);

      // Show success snackbar notification
      setSnackbarMessage(`Probe mit der Barcode Nummer ${barcodeId} erfolgreich erneut Eingeschleust!`);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      // Clear the form
      setBarcodeId('');
    } catch (error) {
      console.error('Error submitting data:', error);

      // Show error snackbar notification
      setSnackbarMessage('Falsche Barcode ID oder Probenart!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

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
          Proben Ausschleusen
        </Typography>
      </Box>

      {/* Proben RadioGroup */}
      <FormControl component="fieldset" margin="normal">
        <FormLabel id="proben-label">Probenart</FormLabel>
        <RadioGroup
          aria-labelledby="proben-label"
          name="proben"
          value={selectedProbe}
          onChange={handleProbeChange}
          row
        >
          <FormControlLabel value="serum" control={<Radio />} label="Serumproben" />
          <FormControlLabel value="gewebe" control={<Radio />} label="Gewebeproben" />
          <FormControlLabel value="urin" control={<Radio />} label="Urinproben" />
        </RadioGroup>
      </FormControl>

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
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        sx={{ mt: 2 }}
      >
        Probe ausschleusen
      </Button>

      {/* Snackbar for notifications */}
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
