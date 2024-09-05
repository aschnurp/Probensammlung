// src/PatientForm.js

import React, { useState } from 'react';
import { Box, TextField, Radio, RadioGroup, FormControlLabel, Button, Typography } from '@mui/material';

export default function PatientForm() {
  const [formData, setFormData] = useState({
    patientId: '',
    date: '',
    gender: '',
    age: '',
    sapId: '',
    sapCaseNumber: '',
    diagnosis: '',
    plannedSurgery: '',
    remarks: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setFormData({
      patientId: '',
      date: '',
      gender: '',
      age: '',
      sapId: '',
      sapCaseNumber: '',
      diagnosis: '',
      plannedSurgery: '',
      remarks: '',
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
          Patienten Eintragen
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
      <Box sx={{ mt: 2 }}>
        <RadioGroup
          row
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <FormControlLabel value="M" control={<Radio />} label="M" />
          <FormControlLabel value="W" control={<Radio />} label="W" />
          <FormControlLabel value="D" control={<Radio />} label="D" />
        </RadioGroup>
      </Box>
      <TextField
        label="Alter"
        name="age"
        value={formData.age}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Pat. ID im SAP"
        name="sapId"
        value={formData.sapId}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Fallnummer im SAP"
        name="sapCaseNumber"
        value={formData.sapCaseNumber}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Diagnose"
        name="diagnosis"
        value={formData.diagnosis}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Geplante OP"
        name="plannedSurgery"
        value={formData.plannedSurgery}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Bemerkungen"
        name="remarks"
        value={formData.remarks}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
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
