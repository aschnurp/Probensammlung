// src/SampleForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from "@mui/styles";
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
import 'dayjs/locale/de';
import DateObject from "react-date-object";
dayjs.locale('de');
import { getProbeOptions } from '../components/custom_functions/getProbeOPtions';

//default time management
var date = new DateObject();
var nowtime = new DateObject();
var raumnummer = '1029'

date
  .setFormat("YYYY-MM-DD")

nowtime
  .setFormat("HH:mm")

require('dotenv').config();

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default function SampleForm() {
  const [formData, setFormData] = useState({
    patient_Id_intern: '',
    probenart: '',
    time: '',
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
    übergeordneteProbe: '',
    untergeordneteProbe: '',
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
  const [abholer, setCategorias] = useState([]);

  useEffect(() => {
    const getCategorias = async () => {
      const res = await fetch(`http://localhost:8000/table/data?table_name=probenabholer`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      //console.log(res);
      const response = await res.json();
      console.log("RESPONSE", response)
      setCategorias(response);
    };
    getCategorias();
  }, []);

  useEffect(() => {
    const raumZuordnung = {
      paraffin: "1012",
      urin: "1029",
      serum: "1029",
      gewebe: "1029",
    };

    // Lagerraum wird gesetzt, wenn probenart geändert wird
    if (formData.probenart) {
      setFormData((prevData) => ({
        ...prevData,
        lagerraum: raumZuordnung[formData.probenart] || raumnummer, // Standardwert oder Fallback
      }));
    }
  }, [formData.probenart]);

  useEffect(() => {
    // Setze das aktuelle Datum im ISO-Format (YYYY-MM-DD)
    const currentDate = dayjs().format('YYYY-MM-DD');
    // Setze die aktuelle Uhrzeit im deutschen Format (HH:mm)
    const currentTime = dayjs().format('HH:mm');

    setFormData((prevData) => ({
      ...prevData,
      created_at: currentDate, // Setze das Datum im ISO-Format
      uhrzeit: currentTime,    // Setze die Uhrzeit im deutschen Format
    }));
  }, []); // Dieser Effekt wird nur einmal beim Laden der Seite ausgeführt



  useEffect(() => {
    if (formData.probenart) {
      fetchAndSuggestBoxData(formData.probenart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.probenart, updateBox]);

  useEffect(() => {
    if (formData.probenart) {
      const { übergeordnete, untergeordnete } = getProbeOptions(formData.probenart);
      setOvergeordneteProbeOptions(übergeordnete);
      setUntergeordneteProbeOptions(untergeordnete);
    } else {
      // Clear options if no valid probenart
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
      console.log('Suggested box data: Zeile', suggestion.suggestedBoxzeile);

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
    console.log('Formdata CHANGED:', formData);
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
      übergeordneteProbe: '',
      untergeordneteProbe: '',
    }));
    setErrors({});
    setUpdateBox(prev => !prev);
  };

  const handleSubmit = async () => {
    const newErrors = {};
    const isValidInteger = (value) => /^\d+$/.test(value);

    console.log('handleSubmit called:', formData);

    // New validation for Übergeordnete Probe and Untergeordnete Probe
    const sampleTypes = ['gewebe', 'serum', 'urin', 'paraffin'];
    if (formData.probenart && sampleTypes.includes(formData.probenart)) {
      if (!formData.übergeordneteProbe) {
        newErrors.übergeordneteProbe = 'Übergeordnete Probe is erforderlich.';
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

    const filteredData = {
      probenart: formData.probenart,
      barcode_id: formData.barcode_id,
      patient_Id_intern: formData.patient_Id_intern,
      lagerraum: formData.lagerraum,
      boxnummer: parseInt(formData.boxnummer, 10),
      boxzeile: formData.boxzeile,
      boxspalte: parseInt(formData.boxspalte, 10),
      anmerkungen: formData.anmerkungen,
      created_at: formData.created_at,
      uhrzeit: formData.uhrzeit,
      sap_id: formData.sap_id,
      abholer: formData.abholer,
      remarks: formData.remarks,
      uebergeordnete_probenart: formData.übergeordneteProbe,
      untergeordnete_probenart: formData.untergeordneteProbe,
    };

    console.log('Filtered data beim EINSCHLEUSEN:', filteredData);

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

          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            error={Boolean(errors.übergeordneteProbe)}
          >
            <InputLabel>Übergeordnete Probenart</InputLabel>
            <Select
              id="uebergeordnet"
              name="übergeordneteProbe"
              value={formData.übergeordneteProbe}
              onChange={handleChange}
              label="Übergeordnete Probenart"
            >
              <MenuItem value="">-- Bitte auswählen --</MenuItem>
              {Array.isArray(overgeordneteProbeOptions) && overgeordneteProbeOptions.length > 0 ? (
                overgeordneteProbeOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.text}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Keine Optionen verfügbar</MenuItem>
              )}
            </Select>
            {errors.übergeordneteProbe && (
              <Typography variant="caption" color="error">
                {errors.übergeordneteProbe}
              </Typography>
            )}
          </FormControl>

          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            error={Boolean(errors.untergeordneteProbe)}
          >
            <InputLabel>Untergeordnete Probenart</InputLabel>
            <Select
              id="untergeordnet"
              name="untergeordneteProbe"
              value={formData.untergeordneteProbe}
              onChange={handleChange}
              label="Untergeordnet Probenart"
            >
              <MenuItem value="">-- Bitte auswählen --</MenuItem>
              {Array.isArray(untergeordneteProbeOptions) && untergeordneteProbeOptions.length > 0 ? (
                untergeordneteProbeOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.text}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Keine Optionen verfügbar</MenuItem>
              )}
            </Select>
            {errors.untergeordneteProbe && (
              <Typography variant="caption" color="error">
                {errors.untergeordneteProbe}
              </Typography>
            )}
          </FormControl>

          {/* Datum */}
          <TextField
            label="Datum"
            name="created_at"
            type="date"
            value={formData.created_at}  // Hier ist der Wert im ISO-Format
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={Boolean(errors.created_at)}
            helperText={errors.created_at}
          />

          {/* Uhrzeit */}
          <TextField
            label="Uhrzeit"
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
            margin="normal">
            <InputLabel id="demo-simple-select-label">Probenabholer:In</InputLabel>
            <Select
              name="abholer"
              labelId="demo-simple-select-filled-label"
              label="Probenabholer:In"
              id="demo-simple-select-filled"
              value={formData.abholer}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {abholer.map((abholer) => (
                <MenuItem key={abholer.id} value={abholer.name}>{abholer.name}</MenuItem>
              ))}
            </Select>
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
          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            error={Boolean(errors.untergeordneteProbe)}
          >
            <InputLabel>Untergeordnete Probenart</InputLabel>
            <Select
              id="untergeordnet"
              name="untergeordneteProbe"
              value={formData.untergeordneteProbe}
              onChange={handleChange}
              label="Untergeordnet Probenart"
            >
              <MenuItem value="">-- Bitte auswählen --</MenuItem>
              {Array.isArray(untergeordneteProbeOptions) && untergeordneteProbeOptions.length > 0 ? (
                untergeordneteProbeOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.text}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Keine Optionen verfügbar</MenuItem>
              )}
            </Select>
            {errors.untergeordneteProbe && (
              <Typography variant="caption" color="error">
                {errors.untergeordneteProbe}
              </Typography>
            )}
          </FormControl>


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
          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            error={Boolean(errors.übergeordneteProbe)}
          >
            <InputLabel>Übergeordnete Probenart</InputLabel>
            <Select
              id="uebergeordnet"
              name="übergeordneteProbe"
              value={formData.übergeordneteProbe}
              onChange={handleChange}
              label="Übergeordnete Probenart"
            >
              <MenuItem value="">-- Bitte auswählen --</MenuItem>
              {Array.isArray(overgeordneteProbeOptions) && overgeordneteProbeOptions.length > 0 ? (
                overgeordneteProbeOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.text}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Keine Optionen verfügbar</MenuItem>
              )}
            </Select>
            {errors.übergeordneteProbe && (
              <Typography variant="caption" color="error">
                {errors.übergeordneteProbe}
              </Typography>
            )}
          </FormControl>

          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            error={Boolean(errors.untergeordneteProbe)}
          >
            <InputLabel>Untergeordnete Probenart</InputLabel>
            <Select
              id="untergeordnet"
              name="untergeordneteProbe"
              value={formData.untergeordneteProbe}
              onChange={handleChange}
              label="Untergeordnet Probenart"
            >
              <MenuItem value="">-- Bitte auswählen --</MenuItem>
              {Array.isArray(untergeordneteProbeOptions) && untergeordneteProbeOptions.length > 0 ? (
                untergeordneteProbeOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.text}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Keine Optionen verfügbar</MenuItem>
              )}
            </Select>
            {errors.untergeordneteProbe && (
              <Typography variant="caption" color="error">
                {errors.untergeordneteProbe}
              </Typography>
            )}
          </FormControl>

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

      {/* Conditional Fields for Paraffin */}
      {formData.probenart === 'paraffin' && (
        <Box sx={{ mt: 2 }}>
          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            error={Boolean(errors.übergeordneteProbe)}
          >
            <InputLabel>Übergeordnete Probenart</InputLabel>
            <Select
              id="uebergeordnet"
              name="übergeordneteProbe"
              value={formData.übergeordneteProbe}
              onChange={handleChange}
              label="Übergeordnete Probenart"
            >
              <MenuItem value="">-- Bitte auswählen --</MenuItem>
              {Array.isArray(overgeordneteProbeOptions) && overgeordneteProbeOptions.length > 0 ? (
                overgeordneteProbeOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.text}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Keine Optionen verfügbar</MenuItem>
              )}
            </Select>
            {errors.übergeordneteProbe && (
              <Typography variant="caption" color="error">
                {errors.übergeordneteProbe}
              </Typography>
            )}
          </FormControl>

          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            error={Boolean(errors.untergeordneteProbe)}
          >
            <InputLabel>Untergeordnete Probenart</InputLabel>
            <Select
              id="untergeordnet"
              name="untergeordneteProbe"
              value={formData.untergeordneteProbe}
              onChange={handleChange}
              label="Untergeordnet Probenart"
            >
              <MenuItem value="">-- Bitte auswählen --</MenuItem>
              {Array.isArray(untergeordneteProbeOptions) && untergeordneteProbeOptions.length > 0 ? (
                untergeordneteProbeOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.text}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Keine Optionen verfügbar</MenuItem>
              )}
            </Select>
            {errors.untergeordneteProbe && (
              <Typography variant="caption" color="error">
                {errors.untergeordneteProbe}
              </Typography>
            )}
          </FormControl>

          {/* Datum */}
          <TextField
            label="Datum"
            name="created_at"
            type="date"
            value={formData.created_at}  // Hier ist der Wert im ISO-Format
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