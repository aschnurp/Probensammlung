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
    uebergeordneteProbe: '',
    untergeordneteProbe: '',
    probeninformation: '',
    differenzierungsmerkmal: '',
  });


  /////////////// useEffect here ///////////////

  // State to track errors
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'
  const [updateBox, setUpdateBox] = useState(false);

  const [overgeordneteProbeOptions, setOvergeordneteProbeOptions] = useState([]);
  const [differenzierungsmerkmalOptions, setDifferenzierungsmerkmalOptions] = useState([]);
  const [probeninformationOptions, setProbeninformationOptions] = useState([]);
  const [untergeordneteProbeOptions, setUntergeordneteProbeOptions] = useState([]);
  const [abholer, setCategorias] = useState([]);


  useEffect(() => {
    const getCategorias = async () => {
      const res = await fetch(`http://localhost:8000/table/data?table_name=probenabholer`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const response = await res.json();
      console.log("RESPONSE", response)
      setCategorias(response);
    };
    getCategorias();
  }, []);

  useEffect(() => {
    console.log('FormData has changed:', formData);
  }, [formData]); // Dieser Effect wird immer aufgerufen, wenn formData sich ändert
  

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
        lagerraum: raumZuordnung[formData.probenart] || raumnummer,
      }));
    }
  }, [formData.probenart]);

  useEffect(() => {
    const currentDate = dayjs().format('YYYY-MM-DD');
    const currentTime = dayjs().format('HH:mm');

    setFormData((prevData) => ({
      ...prevData,
      created_at: currentDate,
      uhrzeit: currentTime,
    }));
  }, []);


  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/table/data?table_name=vorlaeufigeproben",
        );
  
        if (response.data && formData.barcode_id) {
          const foundItem = response.data.find(item => item.barcode_id === formData.barcode_id);
  
          if (foundItem) {
            setFormData((prevData) => ({
              ...prevData,
              patient_Id_intern: foundItem.patient_Id_intern,
              probeninformation: foundItem.probeninformation,
            }));
          } else {
            setSnackbarMessage("Barcode nicht gefunden.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
          }
        }
      } catch (error) {
        setSnackbarMessage("Fehler beim Abrufen der Daten.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    };
  
    fetchAllData();
  }, [formData.barcode_id]);
  


  useEffect(() => {
    if (formData.probenart) {
      fetchAndSuggestBoxData(formData.probenart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.probenart, updateBox]);

  useEffect(() => {
    if (formData.probenart) {
      const options = getProbeOptions(formData.probenart);
      console.log("Probe Options:", options);
  
      if (options) {
        setOvergeordneteProbeOptions(options.übergeordnete || []);
        setUntergeordneteProbeOptions(options.untergeordnete || []);
        setDifferenzierungsmerkmalOptions(options.differenzierungsmerkmal || []);
        setProbeninformationOptions(options.probeninformation || []);
      }
    } else {
      // Falls keine Probenart ausgewählt wurde
      setOvergeordneteProbeOptions([]);
      setUntergeordneteProbeOptions([]);
      setDifferenzierungsmerkmalOptions([]);
      setProbeninformationOptions([]);
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
          boxzeile:  suggestion.suggestedBoxzeile,
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
    
    // Zustand aktualisieren
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      console.log('FormData updated:', updatedData);
      return updatedData;
    });
  
    // Fehler für das aktuelle Feld löschen
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };
  

  const handleClear = () => {
    setFormData((prevData) => ({
      ...prevData,
      boxspalte: '',
      boxzeile: '',
      barcode_id: '',
      boxnummer: '',
      anmerkungen: '',
      remarks: '',
    }));
    setErrors({});
    setUpdateBox(prev => !prev);
  };

  const handleSubmit = async () => {
    const newErrors = {};
    const isValidInteger = (value) => /^\d+$/.test(value);
  
    console.log('handleSubmit called:', formData);
  
    // New validation for Übergeordnete Probe and Untergeordnete Probe
    const sampleTypes = ['paraffin'];
    if (formData.probenart && sampleTypes.includes(formData.probenart)) {
      if (!formData.uebergeordneteProbe) {
        newErrors.uebergeordneteProbe = 'Übergeordnete Probenart ist erforderlich.';
      }
      if (!formData.untergeordneteProbe) {
        newErrors.untergeordneteProbe = 'Untergeordnete Probenart ist erforderlich.';
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
      untergeordnete_probenart: formData.untergeordneteProbe,
      uebergeordnete_probenart: formData.uebergeordneteProbe,
      differenzierungsmerkmal: formData.differenzierungsmerkmal,
      probeninformation: formData.probeninformation,
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
    
      console.log(endpoint);
    
      // Senden der neuen Daten
      const response = await axios.post(
        `http://localhost:8000/new_data/${endpoint}`,
        filteredData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    
      // Nur für Serum, Gewebe und Urin vorläufige Proben löschen
      if (['serum', 'gewebe', 'urin'].includes(formData.probenart)) {
        const deleteResponse = await axios.delete(
          `http://localhost:8000/delete/vorlaeufigeproben`,
          {
            headers: { 'Content-Type': 'application/json' },
            data: { barcode_id: formData.barcode_id },
          }
        );
        console.log('Response after delete:', deleteResponse);
      }
    
      // Erfolgsbenachrichtigung
      setSnackbarMessage('Daten erfolgreich gespeichert.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    
      // Formular leeren
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


      {/* Conditional Fields for Gewebe */}
      {formData.probenart === 'gewebe' && (
        <Box sx={{ mt: 2 }}>
          {/* Barcode ID */}
          <TextField
        label="Barcode ID"
        name="barcode_id"
        value={formData.barcode_id}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={Boolean(errors.barcode_id)}
        helperText={errors.barcode_id}
      />
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

<FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            error={Boolean(errors.untergeordneteProbe)}
          >
            <InputLabel>Probeninformation</InputLabel>
            <Select
              id="Probeninformation"
              name="probeninformation"
              value={formData.probeninformation}
              onChange={handleChange}
              label="Probeninformation"
            >
              <MenuItem value="">-- Bitte auswählen --</MenuItem>
              {Array.isArray(probeninformationOptions) && probeninformationOptions.length > 0 ? (
                probeninformationOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.probeninformation_text}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Keine Optionen verfügbar</MenuItem>
              )}
            </Select>
            {errors.Probeninformation && (
              <Typography variant="caption" color="error">
                {errors.Probeninformation}
              </Typography>
            )}
          </FormControl>



          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            error={Boolean(errors.uebergeordneteProbe)}
          >
            <InputLabel>Differenzierungsmerkmal</InputLabel>
            <Select
              id="Differenzierungsmerkmal"
              name="differenzierungsmerkmal"
              value={formData.differenzierungsmerkmal}
              onChange={handleChange}
              label="Differenzierungsmerkmal"
            >
              <MenuItem value="">-- Bitte auswählen --</MenuItem>
              {Array.isArray(differenzierungsmerkmalOptions) && differenzierungsmerkmalOptions.length > 0 ? (
                differenzierungsmerkmalOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.text}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Keine Optionen verfügbar</MenuItem>
              )}
            </Select>
            {errors.Differenzierungsmerkmal && (
              <Typography variant="caption" color="error">
                {errors.Differenzierungsmerkmal}
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



<FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            error={Boolean(errors.untergeordneteProbe)}
          >
            <InputLabel>Probeninformation</InputLabel>
            <Select
              id="Probeninformation"
              name="probeninformation"
              value={formData.probeninformation}
              onChange={handleChange}
              label="Probeninformation"
            >
              <MenuItem value="">-- Bitte auswählen --</MenuItem>
              {Array.isArray(probeninformationOptions) && probeninformationOptions.length > 0 ? (
                probeninformationOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.probeninformation_text}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Keine Optionen verfügbar</MenuItem>
              )}
            </Select>
            {errors.Probeninformation && (
              <Typography variant="caption" color="error">
                {errors.Probeninformation}
              </Typography>
            )}
          </FormControl>


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

          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            error={Boolean(errors.untergeordneteProbe)}
          >
            <InputLabel>Probeninformation</InputLabel>
            <Select
              id="Probeninformation"
              name="probeninformation"
              value={formData.probeninformation}
              onChange={handleChange}
              label="Probeninformation"
            >
              <MenuItem value="">-- Bitte auswählen --</MenuItem>
              {Array.isArray(probeninformationOptions) && probeninformationOptions.length > 0 ? (
                probeninformationOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.probeninformation_text}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Keine Optionen verfügbar</MenuItem>
              )}
            </Select>
            {errors.Probeninformation && (
              <Typography variant="caption" color="error">
                {errors.Probeninformation}
              </Typography>
            )}
          </FormControl>


          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            error={Boolean(errors.uebergeordneteProbe)}
          >
            <InputLabel>Differenzierungsmerkmal</InputLabel>
            <Select
              id="Differenzierungsmerkmal"
              name="differenzierungsmerkmal"
              value={formData.differenzierungsmerkmal}
              onChange={handleChange}
              label="Differenzierungsmerkmal"
            >
              <MenuItem value="">-- Bitte auswählen --</MenuItem>
              {Array.isArray(differenzierungsmerkmalOptions) && differenzierungsmerkmalOptions.length > 0 ? (
                differenzierungsmerkmalOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.text}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Keine Optionen verfügbar</MenuItem>
              )}
            </Select>
            {errors.Differenzierungsmerkmal && (
              <Typography variant="caption" color="error">
                {errors.Differenzierungsmerkmal}
              </Typography>
            )}
          </FormControl>



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


          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            error={Boolean(errors.uebergeordneteProbe)}
          >
       
        
            <InputLabel>Übergeordnete Probenart</InputLabel>
            <Select
              id="uebergeordnet"
              name="uebergeordneteProbe"
              value={formData.uebergeordneteProbe}
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
            {errors.uebergeordneteProbe && (
              <Typography variant="caption" color="error">
                {errors.uebergeordneteProbe}
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
          Zurücksetzen
        </Button>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Speichern
        </Button>
      </Box>
    </Box>
  );
}