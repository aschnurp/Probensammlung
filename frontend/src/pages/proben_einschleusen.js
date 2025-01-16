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
  Grid,
} from '@mui/material';
import { IoMdArrowRoundBack } from "react-icons/io";
import { suggestBoxData } from '../components/custom_functions/suggestBoxData';
import dayjs from 'dayjs';
import DateObject from "react-date-object";

//default time management
var date = new DateObject();
var nowtime = new DateObject();
var raumnummer = '1029'

date
  .setFormat("YYYY-MM-DD")

nowtime
  .setFormat("HH:mm")

require('dotenv').config();

export default function SampleForm() {
  const [formData, setFormData] = useState({
    patient_Id_intern: '',
    probenart: '',
    time: '',
    abholer: '',
    lagerraum: raumnummer,
    boxspalte: '',
    boxzeile: '',
    barcode_id: '',
    boxnummer: '',
    anmerkungen: '',
    created_at: '',
    uhrzeit: '',
    sap_id: '',
    remarks: '',
    übergeordneteProbe: '', // New field
    untergeordneteProbe: '', // New field
  });



  /////////////// useEffect here ///////////////

  // State to track errors
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'
  const [updateBox, setUpdateBox] = useState(false);

  // adding new variable sto the form 
  // State to store options for Übergeordnete Probe and Untergeordnete Probe
  const [overgeordneteProbeOptions, setOvergeordneteProbeOptions] = useState([]);
  const [untergeordneteProbeOptions, setUntergeordneteProbeOptions] = useState([]);


  useEffect(() => {
    if (formData.probenart) {
      fetchAndSuggestBoxData(formData.probenart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.probenart, updateBox]);

  useEffect(() => {
    // Define the sample types that require the additional dropdowns
    const sampleTypes = ['gewebe', 'serum', 'paraffin'];

    if (formData.probenart && sampleTypes.includes(formData.probenart)) {
      // Define the Übergeordnete Probe options with id and text
      const uebergeordneteProbenOptions = [
        { id: 1, text: "Normal" },
        { id: 2, text: "Normal regeneriert" },
        { id: 3, text: "Normal embolisiert" },
        { id: 4, text: "Tumor" },
        { id: 5, text: "Blut" }
      ];

      // Define the Untergeordnete Probe options with id and text
      const untergeordneteProbenOptions = [
        { id: 1, text: "keine" },
        { id: 2, text: "Paraffinblock" },
        { id: 3, text: "Paraffinblock (A/B)" },
        { id: 4, text: "Trizol" },
        { id: 5, text: "Cryo MF" },
        { id: 6, text: "Cryo SF" }
      ];

      // Update the state with the new options
      setOvergeordneteProbeOptions(uebergeordneteProbenOptions);
      setUntergeordneteProbeOptions(untergeordneteProbenOptions);
    } else {
      // Clear the options and selected values if probenart is not relevant
      setOvergeordneteProbeOptions([]);
      setUntergeordneteProbeOptions([]);
      setFormData(prevData => ({
        ...prevData,
        übergeordneteProbe: '',
        untergeordneteProbe: '',
      }));
    }
  }, [formData.probenart]);




  ///////////////////////////////////////////////////////////
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
      console.log('Suggested box data: ZEILEEEE', suggestion.suggestedBoxzeile);

      if (suggestion) {
        setFormData((prevData) => ({
          ...prevData,

          boxnummer: suggestion.suggestedBoxnummer.toString(),
          boxzeile: suggestion.suggestedBoxzeile,
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
    console.log('Formdata CHANGED:', formData.boxzeile);
  };

  const handleClear = () => {
    setFormData((prevData) => ({
      ...prevData, // Spread the previous formData to keep existing fields
      // Only clear the fields you want to reset
      boxspalte: '',
      boxzeile: '',
      barcode_id: '',
      boxnummer: '',
      anmerkungen: '',
      remarks: '',
      übergeordneteProbe: '', // Reset new field
      untergeordneteProbe: '', // Reset new fieldÍ
    }));
    setErrors({});
    setUpdateBox(prev => !prev);


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

    // New validation for Übergeordnete Probe and Untergeordnete Probe
    const sampleTypes = ['gewebe', 'serum', 'paraffin'];
    if (formData.probenart && sampleTypes.includes(formData.probenart)) {
      if (!formData.übergeordneteProbe) {
        newErrors.übergeordneteProbe = 'Übergeordnete Probe ist erforderlich.';
      }
      if (!formData.untergeordneteProbe) {
        newErrors.untergeordneteProbe = 'Untergeordnete Probe ist erforderlich.';
      }
    }

    // Validation for "gewebe"
    if (formData.probenart === 'gewebe') {
      if (!formData.boxnummer || !isValidInteger(formData.boxnummer)) {
        newErrors.boxnummer = 'Boxnummer ist erforderlich und muss eine ganze Zahl sein.';
      }

      if (!formData.boxzeile) {
        newErrors.boxzeile = 'Boxzeile ist erforderlich.';
      }

      const boxspalteNumber = parseInt(formData.boxspalte, 10); // Convert to number
      if (
        !formData.boxspalte ||
        !isValidInteger(formData.boxspalte) ||
        boxspalteNumber > 9 ||
        boxspalteNumber === 0
      ) {
        newErrors.boxspalte = 'Boxspalte ist erforderlich und muss eine ganze Zahl zwischen 1-9 sein.';
      }

      if (!formData.uhrzeit || !isValidTime(formData.uhrzeit)) {
        newErrors.uhrzeit = 'Uhrzeit ist erforderlich und muss im Format HH:MM sein.';
      }

      if (!formData.abholer) {
        newErrors.abholer = 'Abholer ist erforderlich.';
      }

      if (!formData.barcode_id) {
        newErrors.barcode_id = 'Barcode ist erforderlich.';
      }
    }

    // Validation for "serum" or "urin"
    else if (formData.probenart === 'serum' || formData.probenart === 'urin') {
      if (!formData.boxnummer || !isValidInteger(formData.boxnummer)) {
        newErrors.boxnummer = 'Boxnummer ist erforderlich und muss eine ganze Zahl sein.';
      }

      if (!formData.boxzeile) {
        newErrors.boxzeile = 'Boxzeile ist erforderlich.';
      }

      const boxspalteNumber = parseInt(formData.boxspalte, 10); // Convert to number
      if (
        !formData.boxspalte ||
        !isValidInteger(formData.boxspalte) ||
        boxspalteNumber > 9 ||
        boxspalteNumber === 0
      ) {
        newErrors.boxspalte = 'Boxspalte ist erforderlich und muss eine ganze Zahl zwischen 1-9 sein.';
      }

      if (!formData.barcode_id) {
        newErrors.barcode_id = 'Barcode ist erforderlich.';
      }
    }

    // If we have collected any errors, stop here
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
      boxzeile: formData.boxzeile,
      boxspalte: parseInt(formData.boxspalte, 10),
      anmerkungen: formData.anmerkungen,
      created_at: formattedCreatedAt,
      uhrzeit: formData.uhrzeit,
      sap_id: formData.sap_id,
      abholer: formData.abholer,
      remarks: formData.remarks,
      übergeordneteProbe: formData.übergeordneteProbe,
      untergeordneteProbe: formData.untergeordneteProbe,
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
        setSnackbarMessage('Bitte passen Sie die Daten an und versuchen es erneut.');
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

      {['gewebe', 'serum', 'paraffin'].includes(formData.probenart) && (
        <Grid container spacing={2}>
          {/* Übergeordnete Probe Dropdown */}
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth margin="normal" error={Boolean(errors.übergeordneteProbe)}>
              <InputLabel>Übergeordnete Probe</InputLabel>
              <Select
                id="uebergeordneteProbe"
                name="übergeordneteProbe"
                value={formData.übergeordneteProbe}
                onChange={handleChange}
                label="Übergeordnete Probe"
              >
                <MenuItem value="">-- Bitte auswählen --</MenuItem>
                {overgeordneteProbeOptions.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.text}
                  </MenuItem>
                ))}
              </Select>
              {errors.übergeordneteProbe && (
                <Typography variant="caption" color="error">
                  {errors.übergeordneteProbe}
                </Typography>
              )}
            </FormControl>
          </Grid>

          {/* Untergeordnete Probe Dropdown */}
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth margin="normal" error={Boolean(errors.untergeordneteProbe)}>
              <InputLabel>Untergeordnete Probe</InputLabel>
              <Select
                id="untergeordneteProbe"
                name="untergeordneteProbe"
                value={formData.untergeordneteProbe}
                onChange={handleChange}
                label="Untergeordnete Probe"
              >
                <MenuItem value="">-- Bitte auswählen --</MenuItem>
                {untergeordneteProbeOptions.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.text}
                  </MenuItem>
                ))}
              </Select>
              {errors.untergeordneteProbe && (
                <Typography variant="caption" color="error">
                  {errors.untergeordneteProbe}
                </Typography>
              )}
            </FormControl>
          </Grid>
        </Grid>
      )}




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
              <MenuItem value="1">{process.env.NEXT_PUBLIC_ABHOLER_ONE}</MenuItem>
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
          <FormControl variant="outlined" fullWidth margin="normal" error={Boolean(errors.boxzeile)}>
            <InputLabel>Boxzeile</InputLabel>
            <Select
              name="boxzeile"
              value={formData.boxzeile}
              onChange={handleChange}
              label="Boxzeile"
            >
              {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map((letter) => (
                <MenuItem key={letter} value={letter}>
                  {letter}
                </MenuItem>
              ))}
            </Select>
            {errors.boxzeile && (
              <Typography variant="caption" color="error">
                {errors.boxzeile}
              </Typography>
            )}
          </FormControl>

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
          <FormControl variant="outlined" fullWidth margin="normal" error={Boolean(errors.boxzeile)}>
            <InputLabel>Boxzeile</InputLabel>
            <Select
              name="boxzeile"
              value={formData.boxzeile}
              onChange={handleChange}
              label="Boxzeile"
            >
              {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map((letter) => (
                <MenuItem key={letter} value={letter}>
                  {letter}
                </MenuItem>
              ))}
            </Select>
            {errors.boxzeile && (
              <Typography variant="caption" color="error">
                {errors.boxzeile}
              </Typography>
            )}
          </FormControl>

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
          <FormControl variant="outlined" fullWidth margin="normal" error={Boolean(errors.boxzeile)}>
            <InputLabel>Boxzeile</InputLabel>
            <Select
              name="boxzeile"
              value={formData.boxzeile}
              onChange={handleChange}
              label="Boxzeile"
            >
              {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map((letter) => (
                <MenuItem key={letter} value={letter}>
                  {letter}
                </MenuItem>
              ))}
            </Select>
            {errors.boxzeile && (
              <Typography variant="caption" color="error">
                {errors.boxzeile}
              </Typography>
            )}
          </FormControl>

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
