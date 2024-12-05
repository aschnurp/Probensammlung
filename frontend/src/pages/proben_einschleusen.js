// src/SampleForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar, 
  Alert,    
} from '@mui/material';
import { IoMdArrowRoundBack } from "react-icons/io";
import { suggestBoxData } from '../components/custom_functions/suggestBoxData';
import dayjs from 'dayjs'; 



export default function SampleForm() {
  const [formData, setFormData] = useState({
    patient_Id_intern: '',
    probenart: '',
    time: '',
    size: '',
    abholer: '',
    lagerraum: '1029',
    boxspalte: '',
    boxzeile: '',
    barcode_id: '',
    boxnummer: '',
    anmerkungen: '',
    created_at: '',
    uhrzeit: '',
    sap_id: '',
    remarks: '',
  });


  /////////////// useEffect here ///////////////

  // State to track errors
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

  useEffect(() => {
    if (formData.probenart) {
      fetchAndSuggestBoxData(formData.probenart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.probenart]);


  ///////////////////////////////////////////////////////////

  // implementing the Box data suggestion functionality
  // Function to fetch and suggest box data
  const fetchAndSuggestBoxData = async (probenart) => {
    try {
      // Map probenart to the corresponding table name
      const tableName =
        probenart === 'gewebe'
          ? 'gewebeproben'
          : probenart === 'serum'
            ? 'serumproben'
            : probenart === 'urin'
              ? 'urinproben'
              : null;

      if (!tableName) return;

      const suggestion = await suggestBoxData(tableName);

      if (suggestion) {
        setFormData((prevData) => ({
          ...prevData,
          boxnummer: suggestion.suggestedBoxnummer.toString(),
          boxzeile: suggestion.suggestedBoxzeile.toString(),
          boxspalte: suggestion.suggestedBoxspalte.toString(),
        }));

        if (suggestion.isNewBox) {
          setSnackbarMessage(
            `Eine neue Box (Boxnummer: ${suggestion.suggestedBoxnummer}) wird verwendet.`
          );
          setSnackbarSeverity('info');
          setSnackbarOpen(true);
        }
      }
    } catch (error) {
      console.error('Error suggesting box data:', error);
      setSnackbarMessage('Fehler beim Vorschlagen der Boxdaten.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  /////////////// helper functions here ///////////////

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear the error for the field as the user types
    setErrors({ ...errors, [name]: '' });
  };

  const handleClear = () => {
    setFormData({
      patient_Id_intern: '',
      probenart: '',
      time: '',
      size: '',
      abholer: '',
      lagerraum: '',
      boxspalte: '',
      boxzeile: '',
      barcode_id: '',
      boxnummer: '',
      anmerkungen: '',
      created_at: '',
      uhrzeit: '',
      sap_id: '',
      remarks: '',
    });
    setErrors({});
  };

  const handleSubmit = async () => {
    const newErrors = {};
    const isValidInteger = (value) => /^\d+$/.test(value);
    const isValidDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value);
    const isValidTime = (value) => /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(value);


    if (!formData.probenart) newErrors.probenart = 'Probenart ist erforderlich.';
    if (!formData.patient_Id_intern) newErrors.patient_Id_intern = 'Patienten ID ist erforderlich.';
    if (!formData.lagerraum) newErrors.lagerraum = 'Lagerraum ist erforderlich.';
    if (!formData.created_at || !isValidDate(formData.created_at)) {
      newErrors.created_at = 'Datum ist erforderlich und muss im Format JJJJ-MM-TT sein.';
    }

    if (formData.probenart === 'gewebe') {
      if (!formData.boxnummer || !isValidInteger(formData.boxnummer)) {
        newErrors.boxnummer = 'Boxnummer ist erforderlich und muss eine ganze Zahl sein.';
      }
      if (!formData.boxzeile || !isValidInteger(formData.boxzeile)) {
        newErrors.boxzeile = 'Boxzeile ist erforderlich und muss eine ganze Zahl sein.';
      }
      if (!formData.boxspalte || !isValidInteger(formData.boxspalte)) {
        newErrors.boxspalte = 'Boxspalte ist erforderlich und muss eine ganze Zahl sein.';
      }
      if (!formData.uhrzeit || !isValidTime(formData.uhrzeit)) {
        newErrors.uhrzeit = 'Uhrzeit ist erforderlich und muss im Format HH:MM sein.';
      }
      if (!formData.size) 
        newErrors.size = 'Probengröße ist erforderlich.';
      if (!formData.abholer) 
        newErrors.abholer = 'Abholer ist erforderlich.';
      if (!formData.barcode_id) 
        newErrors.barcode_id = 'Barcode ist erforderlich.';

    } else if (formData.probenart === 'serum' || formData.probenart === 'urin') {
      if (!formData.boxnummer || !isValidInteger(formData.boxnummer)) {
        newErrors.boxnummer = 'Boxnummer ist erforderlich und muss eine ganze Zahl sein.';
      }
      if (!formData.boxzeile || !isValidInteger(formData.boxzeile)) {
        newErrors.boxzeile = 'Boxzeile ist erforderlich und muss eine ganze Zahl sein.';
      }
      if (!formData.boxspalte || !isValidInteger(formData.boxspalte)) {
        newErrors.boxspalte = 'Boxspalte ist erforderlich und muss eine ganze Zahl sein.';
      }
      if (!formData.barcode_id) newErrors.barcode_id = 'Barcode ist erforderlich.';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // Format created_at as a string in YYYY-MM-DD
    const formattedCreatedAt = formData.created_at
      ? dayjs(formData.created_at).format('YYYY-MM-DD')
      : '';

    const filteredData = {
      probenart: formData.probenart,
      barcode_id: formData.barcode_id,
      patient_Id_intern: formData.patient_Id_intern,
      lagerraum: formData.lagerraum,
      boxnummer: parseInt(formData.boxnummer, 10),
      boxzeile: parseInt(formData.boxzeile, 10),
      boxspalte: parseInt(formData.boxspalte, 10),
      anmerkungen: formData.anmerkungen,
      created_at: formattedCreatedAt,
      uhrzeit: formData.uhrzeit,
      sap_id: formData.sap_id,
      abholer: formData.abholer,
      remarks: formData.remarks,
      size: formData.size,
    };

    try {
      let endpoint = '';
      switch (formData.probenart) {
        case 'gewebe':
          endpoint = 'gewebe';
          break;
        case 'serum':
          endpoint = 'serum';
          break;
        case 'urin':
          endpoint = 'urin';
          break;
        case 'paraffin':
          endpoint = 'paraffin';
          break;
        default:
          throw new Error('Ungültige Probenart ausgewählt.');
      }

      const response = await axios.post(
        `http://localhost:8000/new_data/${endpoint}`,
        filteredData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      // Success notification
      setSnackbarMessage('Daten erfolgreich gesendet!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      // Clear the form
      handleClear();
    } catch (error) {
      console.error('Error submitting data:', error);

      if (error.response) {
        const message = error.response.data.detail
          ? `Error: ${error.response.data.detail}`
          : 'Fehler beim Senden der Daten.';
        setSnackbarMessage(message);
        setSnackbarSeverity('error');
      } else {
        setSnackbarMessage('Netzwerkfehler. Bitte versuchen Sie es erneut.');
        setSnackbarSeverity('error');
      }

      setSnackbarOpen(true);
    }
  };


  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };


  ///////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////


  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>

      <Box sx={{ position: 'absolute', top: 90, left: 16 }}>
        <Button variant="contained" color="primary" onClick={() => window.location.href = '/overview'}>
          <IoMdArrowRoundBack className='text-2xl' />
        </Button>
      </Box>


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



      {/* Probenart Select Field */}
      <FormControl variant="outlined" fullWidth margin="normal" error={Boolean(errors.probenart)}>
        <InputLabel>Probenart</InputLabel>
        <Select
          name="probenart"
          value={formData.probenart}
          onChange={handleChange}
          label="Probenart"
        >
          <MenuItem value="gewebe">Gewebeproben</MenuItem>
          <MenuItem value="serum">Serumproben</MenuItem>
          <MenuItem value="urin">Urinproben</MenuItem>
          <MenuItem value="paraffin">Paraffinproben</MenuItem>
        </Select>
        {errors.probenart && (
          <Typography variant="caption" color="error">
            {errors.probenart}
          </Typography>
        )}
      </FormControl>

      {/* Patienten ID TextField */}
      <TextField
        label="Patienten ID (Intern)"
        name="patient_Id_intern"
        value={formData.patient_Id_intern}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={Boolean(errors.patient_Id_intern)}
        helperText={errors.patient_Id_intern}
      />

      {/* Conditional Fields for Gewebe */}
      {formData.probenart === 'gewebe' && (
        <Box sx={{ mt: 2 }}>
          {/* Barcode ID */}
          <TextField
            label="Scannerfeld für Barcode ID"
            name="barcode_id"
            value={formData.barcode_id}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.barcode_id)}
            helperText={errors.barcode_id}
          />

          {/* Datum */}
          <TextField
            label="Datum"
            name="created_at"
            type="date"
            value={formData.created_at}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={Boolean(errors.created_at)}
            helperText={errors.created_at}
          />

          {/* Uhrzeit */}
          <TextField
            label="Probe erhalten (Uhrzeit)"
            name="uhrzeit"
            type="time"
            value={formData.uhrzeit}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={Boolean(errors.uhrzeit)}
            helperText={errors.uhrzeit}
          />

          {/* Probengröße */}
          <TextField
            label="Probengröße (LxBxH [cm])"
            name="size"
            value={formData.size}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.size)}
            helperText={errors.size}
          />

          {/* Probenabholer*in Select Field */}
          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            error={Boolean(errors.abholer)}
          >
            <InputLabel>Probenabholer*in</InputLabel>
            <Select
              name="abholer"
              value={formData.abholer}
              onChange={handleChange}
              label="Probenabholer*in"
            >
              <MenuItem value="rebecca">Rebecca</MenuItem>
              <MenuItem value="sophie">Sophie</MenuItem>
              <MenuItem value="atachan">Atachan</MenuItem>
              <MenuItem value="anton">Anton</MenuItem>
              <MenuItem value="sandra">Sandra</MenuItem>
              <MenuItem value="peggy">Peggy</MenuItem>
              <MenuItem value="other">Andere</MenuItem>
            </Select>
            {errors.abholer && (
              <Typography variant="caption" color="error">
                {errors.abholer}
              </Typography>
            )}
          </FormControl>

          {/* Raum */}
          <TextField
            label="Raum"
            name="lagerraum"
            value={formData.lagerraum}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.lagerraum)}
            helperText={errors.lagerraum}
          />

          {/* Boxnummer */}
          <TextField
            label="Boxnummer"
            name="boxnummer"
            type="number"
            value={formData.boxnummer}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.boxnummer)}
            helperText={errors.boxnummer}
          />

          {/* Boxzeile */}
          <TextField
            label="Boxzeile"
            name="boxzeile"
            type="number"
            value={formData.boxzeile}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.boxzeile)}
            helperText={errors.boxzeile}
          />

          {/* Boxspalte */}
          <TextField
            label="Boxspalte"
            name="boxspalte"
            type="number"
            value={formData.boxspalte}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.boxspalte)}
            helperText={errors.boxspalte}
          />

          {/* Besonderheiten/Anmerkungen */}
          <TextField
            label="Besonderheiten/Anmerkungen (bei Probennahme)"
            name="anmerkungen"
            value={formData.anmerkungen}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            error={Boolean(errors.anmerkungen)}
            helperText={errors.anmerkungen}
          />

          {/* Bemerkungen */}
          <TextField
            label="Bemerkungen (während Probenaufbereitung)"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            error={Boolean(errors.remarks)}
            helperText={errors.remarks}
          />
        </Box>
      )}

      {/* Conditional Fields for Serum */}
      {formData.probenart === 'serum' && (
        <Box sx={{ mt: 2 }}>
          {/* Barcode ID */}
          <TextField
            label="Scannerfeld für Barcode ID"
            name="barcode_id"
            value={formData.barcode_id}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.barcode_id)}
            helperText={errors.barcode_id}
          />

          {/* Datum */}
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
            error={Boolean(errors.created_at)}
            helperText={errors.created_at}
          />

          {/* Raum */}
          <TextField
            label="Raum"
            name="lagerraum"
            defaultValue="1027"
            value={formData.lagerraum}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.lagerraum)}
            helperText={errors.lagerraum}
          />

          {/* Boxnummer */}
          <TextField
            label="Boxnummer"
            name="boxnummer"
            type="number"
            value={formData.boxnummer}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.boxnummer)}
            helperText={errors.boxnummer}
          />

          {/* Boxzeile */}
          <TextField
            label="Boxzeile"
            name="boxzeile"
            type="number"
            value={formData.boxzeile}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.boxzeile)}
            helperText={errors.boxzeile}
          />

          {/* Boxspalte */}
          <TextField
            label="Boxspalte"
            name="boxspalte"
            type="number"
            value={formData.boxspalte}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.boxspalte)}
            helperText={errors.boxspalte}
          />

          {/* Besonderheiten */}
          <TextField
            label="Besonderheiten"
            name="anmerkungen"
            value={formData.anmerkungen}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            error={Boolean(errors.anmerkungen)}
            helperText={errors.anmerkungen}
          />
        </Box>
      )}

      {/* Conditional Fields for Urin */}
      {formData.probenart === 'urin' && (
        <Box sx={{ mt: 2 }}>
          {/* Barcode ID */}
          <TextField
            label="Scannerfeld für Barcode ID"
            name="barcode_id"
            value={formData.barcode_id}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.barcode_id)}
            helperText={errors.barcode_id}
          />

          {/* Datum */}
          <TextField
            label="Datum"
            name="created_at"
            type="date"
            value={formData.created_at}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={Boolean(errors.created_at)}
            helperText={errors.created_at}
          />

          {/* Raum */}
          <TextField
            label="Raum"
            name="lagerraum"
            defaultValue="1027"
            value={formData.lagerraum}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.lagerraum)}
            helperText={errors.lagerraum}
          />

          {/* Boxnummer */}
          <TextField
            label="Boxnummer"
            name="boxnummer"
            type="number"
            value={formData.boxnummer}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.boxnummer)}
            helperText={errors.boxnummer}
          />

          {/* Boxzeile */}
          <TextField
            label="Boxzeile"
            name="boxzeile"
            type="number"
            value={formData.boxzeile}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.boxzeile)}
            helperText={errors.boxzeile}
          />

          {/* Boxspalte */}
          <TextField
            label="Boxspalte"
            name="boxspalte"
            type="number"
            value={formData.boxspalte}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.boxspalte)}
            helperText={errors.boxspalte}
          />

          {/* Besonderheiten */}
          <TextField
            label="Besonderheiten"
            name="anmerkungen"
            value={formData.anmerkungen}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            error={Boolean(errors.anmerkungen)}
            helperText={errors.anmerkungen}
          />
        </Box>
      )}

      {/* Conditional Fields for Paraffin */}
      {formData.probenart === 'paraffin' && (
        <Box sx={{ mt: 2 }}>
          {/* Datum */}
          <TextField
            label="Datum"
            name="created_at"
            type="date"
            value={formData.created_at}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={Boolean(errors.created_at)}
            helperText={errors.created_at}
          />

          {/* Raum */}
          <TextField
            label="Raum"
            name="lagerraum"
            value={formData.lagerraum}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.lagerraum)}
            helperText={errors.lagerraum}
          />

          {/* Besonderheiten */}
          <TextField
            label="Besonderheiten"
            name="anmerkungen"
            value={formData.anmerkungen}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            error={Boolean(errors.anmerkungen)}
            helperText={errors.anmerkungen}
          />
        </Box>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }} elevation={6}
          variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>


      {/* Action Buttons */}
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
