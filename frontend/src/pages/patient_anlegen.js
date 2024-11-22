// src/PatientForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Radio, RadioGroup,FormControl ,FormLabel, FormControlLabel, Button, Typography } from '@mui/material';

export default function PatientForm() {
  const [formData, setFormData] = useState({
    patient_Id_intern: '',
    geschlecht: '',
    alter: '',
    sap_id: '',
    op_diagnose: '',
    plannedSurgery: '',
    bemerkung: '',
    created_at: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setFormData({
      patient_Id_intern: '',
      geschlecht: '',
      alter: '',
      sap_id: '',
      op_diagnose: '',
      plannedSurgery: '',
      bemerkung: '',
      created_at: '',
    });
  };

  const handleSubmit = async () => {
    console.log('Button clicked');

  try {
    console.log('formData before filtering:', formData);
    const response = await axios.post(`http://localhost:8000/new_data/patient`, formData, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('Data submitted successfully:', response.data);
  } catch (error) {
    console.error('Error submitting data:', error);
  }
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
          Patienten Anlegen
        </Typography>
      </Box>
      <TextField
        label="Patienten ID (intern)"
        name="patient_Id_intern"
        value={formData.patient_Id_intern}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
        <TextField
            label="Datum"
            name="created_at"
            type="date"
            value={formData.created_at}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
        />
      <FormControl>
        <FormLabel id="geschlecht-label">Geschlecht</FormLabel>
        <RadioGroup
          aria-labelledby="geschlecht-label"
          name="geschlecht"
          value={formData.geschlecht}
          onChange={handleChange} 
        >
          <FormControlLabel value="female" control={<Radio />} label="Weiblich" />
          <FormControlLabel value="male" control={<Radio />} label="Männlich" />
          <FormControlLabel value="other" control={<Radio />} label="Divers" />
        </RadioGroup>
      </FormControl>


      <TextField
        label="Alter"
        name="alter"
        type="number"
        value={formData.alter}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Pat. ID im SAP"
        name="sap_id"
        type="number"
        value={formData.sap_id}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Diagnose"
        name="op_diagnose"
        value={formData.op_diagnose}
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
        name="bemerkung"
        value={formData.bemerkung}
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
