// src/SampleForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Radio, RadioGroup, FormLabel ,FormControlLabel, Typography,Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { postSerumEntry } from '../services/api'; 

export default function SampleForm() {
  const [formData, setFormData] = useState({
    patient_Id_intern: '',
    probenart: '',
    date: '',
    time: '',
    size: '',
    sample_one: '',
    sample_two: '',
    collector: '',
    specialComments: '',
    remarks: '',
    barcode_id: '',
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
      patient_Id_intern: '',
      probenart: '',
      paraffin: '',
      date: '',
      time: '',
      size: '',
      collector: '',
      lagerraum: '1027',
      boxspalte:'',
      boxzeile:'',
      specialComments: '',
      remarks: '',
      barcode_id: '',
      serumDate: '',
      serumComments: '',
      urinDate: '',
      urinComments: '',
      urinDate: '',
    });
  };


  const handleSubmit = async () => {
    const filteredData = {     
      probenart: formData.probenart,
      barcode_id: formData.barcode_id,
      patient_Id_intern: formData.patient_Id_intern,
      lagerraum: formData.lagerraum,
      boxnummer: formData.boxnummer,
      boxzeile: formData.boxzeile,
      boxspalte: formData.boxspalte,
      anmerkungen: formData.anmerkungen,
      created_at: formData.created_at
    };
    console.log('Button clicked');
    // Include only fields relevant to `probenart`
    if (formData.probenart === 'paraffin') {

    } else if (formData.probenart === 'gewebe') {

    } else if (formData.probenart === 'serum') {
      filteredData.patient_Id_intern = formData.patient_Id_intern;
      filteredData.barcode_id = formData.barcode_id;
      filteredData.lagerraum = formData.lagerraum;
      filteredData.probenart = formData.probenart;
      filteredData.boxnummer = formData.boxnummer;
      filteredData.boxzeile = formData.boxzeile;
      filteredData.boxspalte = formData.boxspalte;
      filteredData.anmerkungen = formData.anmerkungen;
      filteredData.created_at = formData.created_at;
    } else if (formData.probenart === 'urin') {

    }


    // Send the filtered data based on probenart
    try {
      console.log('formData before filtering:', formData);
      const response = await axios.post(`http://localhost:8000/new_data/${formData.probenart}`, filteredData, {
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
          Proben Einschleusen
        </Typography>
      </Box> 

        <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel>Probenart</InputLabel>
        <Select
          name="probenart"
          value={formData.probenart}
          onChange={handleChange}
          margin='normal'
          label = "probenart"
        >
          <MenuItem value="gewebe">Gewebeproben</MenuItem>
          <MenuItem value="serum">Serumproben</MenuItem>
          <MenuItem value="urin">Urinproben</MenuItem>
          <MenuItem value="paraffin">Paraffinproben</MenuItem>
        </Select>
      </FormControl>


      <TextField
        label="Patienten ID (Intern)"
        name="patient_Id_intern"
        value={formData.patient_Id_intern}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
  
      {formData.probenart === 'gewebe' && (
        <Box sx={{ mt: 2 }}>
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
        <FormControl  fullWidth margin="normal">
        <InputLabel>Probenabholer*in</InputLabel>
        <Select
          name="collector"
          value={formData.abholer}
          onChange={handleChange}
          fullWidth
          margin="normal"
          label = "Probenabholer*in"
        >
          <MenuItem value="rebecca">Rebecca</MenuItem>
          <MenuItem value="sophie">Sophie</MenuItem>
          <MenuItem value="atachan">Atachan</MenuItem>
          <MenuItem value="anton">Anton</MenuItem>
          <MenuItem value="sandra">Sandra</MenuItem>
          <MenuItem value="peggy">Peggy</MenuItem>
          <MenuItem value="other">Andere</MenuItem>


        </Select>
        </FormControl>
            <TextField
            label="Raum"
            name="lagerraum"
            value={formData.lagerraum}
            defaultValue="1027"
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
         <TextField
            label="Boxnummer"
            name="boxnummer"
            value={formData.boxnummer}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
           <TextField
            label="Boxzeile"
            name="boxzeile"
            value={formData.boxzeile}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
           <TextField
            label="Boxspalte"
            name="boxspalte"
            value={formData.boxspalte}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Besonderheiten/Anmerkungen (bei Probennahme)"
            name="anmerkungen"
            value={formData.anmerkungen}
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

      {formData.probenart === 'serum' && (
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Scannerfeld für Barcode ID"
            name="barcode_id"
            value={formData.barcode_id}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Datum"
            name="created_at"
            type="date"
            defaultValue="2024-09-29"
            value={formData.created_at}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
            <TextField
            label="Raum"
            name="lagerraum"
            defaultValue="1027"
            value={formData.lagerraum}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
           <TextField
            label="Boxnummer"
            name="boxnummer"
            value={formData.boxnummer}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
           <TextField
            label="Boxzeile"
            name="boxzeile"
            value={formData.boxzeile}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
           <TextField
            label="Boxspalte"
            name="boxspalte"
            value={formData.boxspalte}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Besonderheiten"
            name="anmerkungen"
            value={formData.anmerkungen}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
        </Box>
      )}

      {formData.probenart === 'urin' && (
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Scannerfeld für Barcode ID"
            name="barcode_id"
            value={formData.barcode_id}
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
          <TextField
            label="Raum"
            name="lagerraum"
            defaultValue="1027"
            value={formData.lagerraum}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
         <TextField
            label="Boxnummer"
            name="boxnummer"
            value={formData.boxnummer}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
           <TextField
            label="Boxzeile"
            name="boxzeile"
            value={formData.boxzeile}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
           <TextField
            label="Boxspalte"
            name="boxspalte"
            value={formData.boxspalte}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Besonderheiten"
            name="anmerkungen"
            value={formData.anmerkungen}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
        </Box>
      )}


{formData.probenart === 'paraffin' && (
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Datum"
            name="created_at"
            type="date"
            defaultValue="2011-09-29"
            value={formData.created_at}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
            <TextField
            label="Raum"
            name="lagerraum"
            defaultValue="1027"
            value={formData.lagerraum}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Besonderheiten"
            name="anmerkungen"
            value={formData.anmerkungen}
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
