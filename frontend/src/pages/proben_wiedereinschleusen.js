import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

export default function ProbeWiedereinschleusen() {
  const [barcodeId, setBarcodeId] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [usedProbes, setUsedProbes] = useState([
    // Simulated previously used probes
    { barcodeId: '123456', status: 'verwendet' },
    { barcodeId: '789012', status: 'verwendet' },
  ]);

  const handleScan = (e) => {
    setBarcodeId(e.target.value);
  };

  const handleSubmit = () => {
    if (barcodeId) {
      const existingProbe = usedProbes.find(probe => probe.barcodeId === barcodeId);
      if (existingProbe) {
        setStatusMessage(`Probe mit Barcode ID ${barcodeId} wurde bereits verwendet.`);
      } else {
        setUsedProbes([...usedProbes, { barcodeId, status: 'wiedereingeschleust' }]);
        setStatusMessage(`Probe mit Barcode ID ${barcodeId} erfolgreich wiedereingeschleust.`);
      }
    }
    setBarcodeId(''); // Clear the barcode input field after submission
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Proben wiedereinschleusen
      </Typography>
      <TextField
        label="Scannerfeld für Barcode ID"
        name="barcodeId"
        value={barcodeId}
        onChange={handleScan}
        fullWidth
        margin="normal"
        autoFocus
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        sx={{ mt: 2 }}
      >
        Probe wiedereinschleusen
      </Button>

      {statusMessage && (
        <Typography variant="body1" color="secondary" sx={{ mt: 2 }}>
          {statusMessage}
        </Typography>
      )}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Übersicht der Proben</Typography>
        <ul>
          {usedProbes.map((probe, index) => (
            <li key={index}>
              Barcode ID: {probe.barcodeId}, Status: {probe.status}
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
}