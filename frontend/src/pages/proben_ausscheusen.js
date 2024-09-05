// src/ProbeAusschleusen.js

import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

export default function ProbeAusschleusen() {
  const [barcodeId, setBarcodeId] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [probeData, setProbeData] = useState([]);

  const handleScan = (e) => {
    setBarcodeId(e.target.value);
  };

  const handleSubmit = () => {
    // Simulate scanning logic
    if (barcodeId) {
      const existingProbe = probeData.find(probe => probe.barcodeId === barcodeId);
      if (existingProbe) {
        setStatusMessage(`Probe mit Barcode ID ${barcodeId} ist gerade nicht in der Box.`);
      } else {
        setProbeData([...probeData, { barcodeId, status: 'ausgeschleust' }]);
        setStatusMessage(`Probe mit Barcode ID ${barcodeId} erfolgreich ausgeschleust.`);
      }
    }
    setBarcodeId(''); // Clear the barcode input field after submission
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Proben ausschleusen
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
        Probe ausschleusen
      </Button>

      {statusMessage && (
        <Typography variant="body1" color="secondary" sx={{ mt: 2 }}>
          {statusMessage}
        </Typography>
      )}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Zuletzt ausgeschleuste Proben</Typography>
        <ul>
          {probeData.map((probe, index) => (
            <li key={index}>
              Barcode ID: {probe.barcodeId}, Status: {probe.status}
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
}
