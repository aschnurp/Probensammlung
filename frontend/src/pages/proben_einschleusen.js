// src/SampleForm.js

import React, { useState } from 'react';
import { Box, TextField, Radio, RadioGroup, FormControlLabel, Typography,Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

export default function SampleForm() {
  const [formData, setFormData] = useState({
    patientId: '',
    sampleType: '',
    paraffin: '',
    blockType: '',
    date: '',
    time: '',
    size: '',
    collector: '',
    specialComments: '',
    remarks: '',
    barcodeId: '',
    serumDate: '',
    serumComments: '',
    urinDate: '',
    urinComments: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setFormData({
      patientId: '',
      sampleType: '',
      paraffin: '',
      blockType: '',
      date: '',
      time: '',
      size: '',
      collector: '',
      specialComments: '',
      remarks: '',
      barcodeId: '',
      serumDate: '',
      serumComments: '',
      urinDate: '',
      urinComments: '',
    });
  };

  const handleSubmit = () => {
    // Handle form submission, e.g., sending data to a server
    console.log('Submitted Data:', formData);
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
          Proben Einschleusen
        </Typography>
      </Box>  
      <TextField
        label="Patienten ID"
        name="patientId"
        value={formData.patientId}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Probenart</InputLabel>
        <Select
          name="sampleType"
          value={formData.sampleType}
          onChange={handleChange}
        >
          <MenuItem value="gewebe">Gewebeproben</MenuItem>
          <MenuItem value="serum">Serum</MenuItem>
          <MenuItem value="urin">Urin</MenuItem>
        </Select>
      </FormControl>

      {formData.sampleType === 'gewebe' && (
        <Box sx={{ mt: 2 }}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              name="paraffin"
              value={formData.paraffin}
              onChange={handleChange}
            >
              <FormControlLabel value="paraffin" control={<Radio />} label="Paraffin" />
              <FormControlLabel value="normal" control={<Radio />} label="Normal" />
              <FormControlLabel value="block" control={<Radio />} label="Nur ein Block" />
            </RadioGroup>
          </FormControl>
          {formData.paraffin === 'block' && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Block Typ</InputLabel>
              <Select
                name="blockType"
                value={formData.blockType}
                onChange={handleChange}
              >
                <MenuItem value="tumor">Tumor</MenuItem>
                <MenuItem value="block-a">Block A</MenuItem>
                <MenuItem value="block-b">Block B</MenuItem>
              </Select>
            </FormControl>
          )}
          <TextField
            label="Datum"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Probe erhalten (Uhrzeit)"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Probengröße (LxBxH [cm])"
            name="size"
            value={formData.size}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Probenabholer*in"
            name="collector"
            value={formData.collector}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Besonderheiten/Anmerkungen (bei Probennahme)"
            name="specialComments"
            value={formData.specialComments}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            label="Bemerkungen (während Probenaufbereitung)"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
        </Box>
      )}

      {formData.sampleType === 'serum' && (
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Scannerfeld für Barcode ID"
            name="barcodeId"
            value={formData.barcodeId}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Datum"
            name="serumDate"
            type="date"
            value={formData.serumDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Besonderheiten"
            name="serumComments"
            value={formData.serumComments}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
        </Box>
      )}

      {formData.sampleType === 'urin' && (
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Scannerfeld für Barcode ID"
            name="barcodeId"
            value={formData.barcodeId}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Datum"
            name="urinDate"
            type="date"
            value={formData.urinDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Besonderheiten"
            name="urinComments"
            value={formData.urinComments}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
        </Box>
      )}

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" color="secondary" onClick={handleClear}>
          Clear All
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Senden
        </Button>
      </Box>
    </Box>
  );
}
