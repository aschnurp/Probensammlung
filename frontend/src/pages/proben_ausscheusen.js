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
      <Box         
      sx={{
          textAlign: 'center',
          mt: 4,
          mb: 2,
        }}
        >
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
        Proben Ausschleusen
      </Typography>
      </Box>
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
    </Box>
  );
}
