// src/SampleForm.js

import React, { useState } from 'react';
import { Box, TextField, Radio, RadioGroup, FormLabel ,FormControlLabel, Typography,Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

export default function SampleForm() {
  const [formData, setFormData] = useState({
    patientId: '',
    sampleType: '',
    paraffin: '',
    blockType: '',
    date: '',
    time: '',
    size: '',
    sample_one: '',
    sample_two: '',
    collector: '',
    specialComments: '',
    remarks: '',
    barcodeId: '',
    serumDate: '',
    serumComments: '',
    urinDate: '',
    urinComments: '',
  });

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setFormData({
      patientId: '',
      sampleType: '',
      paraffin: '',
      blockType: '',
      sample_one: '',
      sample_two: '',
      date: '',
      time: '',
      size: '',
      collector: '',
      room: '1027',
      box_col:'',
      box_row:'',
      specialComments: '',
      remarks: '',
      barcodeId: '',
      serumDate: '',
      serumComments: '',
      urinDate: '',
      urinComments: '',
      urinDate: today,
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

        <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel>Probenart</InputLabel>
        <Select
          name="sampleType"
          value={formData.sampleType}
          onChange={handleChange}
          margin='normal'
          label = "Probenart"
        >
          <MenuItem value="gewebe">Gewebeproben</MenuItem>
          <MenuItem value="serum">Serumproben</MenuItem>
          <MenuItem value="urin">Urinproben</MenuItem>
        </Select>
      </FormControl>


      <TextField
        label="Patienten ID"
        name="patientId"
        value={formData.patientId}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
  


      {formData.sampleType === 'gewebe' && (
        <Box sx={{ mt: 2 }}>

<FormControl variant="outlined" fullWidth margin="normal">
  <InputLabel>Probe I</InputLabel>
  <Select
    name="sample_one"
    value={formData.sample_one}
    onChange={handleChange}
    fullWidth
    margin="normal"
    label="Probe I"
        >
          <MenuItem value="none">none</MenuItem>
          <MenuItem value="paraffin_normal_one">Paraffin / Normal / ein Block</MenuItem>
          <MenuItem value="paraffin_normal_a">Paraffin / Normal / Block A</MenuItem>
          <MenuItem value="paraffin_normal_b">Paraffin / Normal / Block B</MenuItem>
          <MenuItem value="paraffin_tumor_one">Paraffin / Tumor / ein Block</MenuItem>
          <MenuItem value="paraffin_tumor_a">Paraffin / Tumor / Block A</MenuItem>
          <MenuItem value="paraffin_tumor_b">Paraffin / Tumor / Block B</MenuItem>

        </Select>
        </FormControl>
        <FormControl variant="outlined" fullWidth margin="normal">
  <InputLabel id="sample-one-label">Probe II</InputLabel>
  <Select
    labelId="sample-one-label"
    name="sample_two"
    value={formData.sample_two}
    onChange={handleChange}
    fullWidth
    margin="normal"
    label="Probe II"
        >
          <MenuItem value="none">none</MenuItem>
          <MenuItem value="paraffin_normal_one">Paraffin / Normal / ein Block</MenuItem>
          <MenuItem value="paraffin_normal_a">Paraffin / Normal / Block A</MenuItem>
          <MenuItem value="paraffin_normal_b">Paraffin / Normal / Block B</MenuItem>
          <MenuItem value="paraffin_tumor_one">Paraffin / Tumor / ein Block</MenuItem>
          <MenuItem value="paraffin_tumor_a">Paraffin / Tumor / Block A</MenuItem>
          <MenuItem value="paraffin_tumor_b">Paraffin / Tumor / Block B</MenuItem>

        </Select>
        </FormControl>

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
        <FormControl  fullWidth margin="normal">
        <InputLabel>Probenabholer*in</InputLabel>
        <Select
          name="collector"
          value={formData.collector}
          onChange={handleChange}
          fullWidth
          margin="normal"
          label = "Probenabholer*in"
        >
          <MenuItem value="rebecca">Rebecca</MenuItem>
          <MenuItem value="sophie">Sophie</MenuItem>
          <MenuItem value="atachan">Atachan</MenuItem>


        </Select>
        </FormControl>
            <TextField
            label="Raum"
            name="room"
            value={formData.room}
            defaultValue="1027"
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
         <TextField
            label="Boxnummer"
            name="boxnumber"
            value={formData.boxnumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
           <TextField
            label="Boxzeile"
            name="box_row"
            value={formData.box_row}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
           <TextField
            label="Boxspalte"
            name="box_col"
            value={formData.box_col}
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
            defaultValue="2011-09-29"
            value={formData.serumDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
            <TextField
            label="Raum"
            name="room"
            defaultValue="1027"
            value={formData.room}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
           <TextField
            label="Boxnummer"
            name="boxnumber"
            value={formData.boxnumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
           <TextField
            label="Boxzeile"
            name="box_row"
            value={formData.box_row}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
           <TextField
            label="Boxspalte"
            name="box_col"
            value={formData.box_col}
            onChange={handleChange}
            fullWidth
            margin="normal"
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
            label="Raum"
            name="room"
            defaultValue="1027"
            value={formData.room}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
         <TextField
            label="Boxnummer"
            name="boxnumber"
            value={formData.boxnumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
           <TextField
            label="Boxzeile"
            name="box_row"
            value={formData.box_row}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
           <TextField
            label="Boxspalte"
            name="box_col"
            value={formData.box_col}
            onChange={handleChange}
            fullWidth
            margin="normal"
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
