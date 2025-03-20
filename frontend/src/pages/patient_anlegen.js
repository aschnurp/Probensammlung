import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Button,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { IoMdArrowRoundBack } from "react-icons/io";
import DateObject from "react-date-object";
import dayjs from 'dayjs';


var date = new DateObject();
var nowtime = new DateObject();

date.setFormat("YYYY-MM-DD");
nowtime.setFormat("HH:mm");

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
    op_geplant: '',
  });

  const [errors, setErrors] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Funktion zum Setzen der Formulardaten
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!formData.patient_Id_intern) return; 
  
      try {
        const response = await axios.get("http://localhost:8000/table/data?table_name=patient");
  
        if (response.data) {
          // Suchen nach der Patienten-ID in den erhaltenen Daten
          const foundItem = response.data.find(item => item.patient_Id_intern === formData.patient_Id_intern);
  
          if (foundItem) {
            setFormData((prevData) => ({
              ...prevData,
              ...foundItem,
              patient_Id_intern: prevData.patient_Id_intern, 
            }));
          } else {
            setFormData({
              patient_Id_intern: prevData.patient_Id_intern,
              geschlecht: '',
              alter: '',
              sap_id: '',
              op_diagnose: '',
              plannedSurgery: '',
              bemerkung: '',
              op_geplant: '',
            });
          }
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };
  
    fetchPatientData();
  }, [formData.patient_Id_intern]);

  useEffect(() => {
    const currentDate = dayjs().format('YYYY-MM-DD');
    const currentTime = dayjs().format('HH:mm');

    setFormData((prevData) => ({
      ...prevData,
      created_at: currentDate,
      uhrzeit: currentTime,
    }));
  }, []);

  const handleClear = () => {
    setFormData({
      geschlecht: '',
      alter: '',
      sap_id: '',
      op_diagnose: '',
      plannedSurgery: '',
      bemerkung: '',
      op_geplant: '',
    });
    setErrors({});
  };

  const handleNotificationClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const validateForm = () => {
    const newErrors = {};
    const { patient_Id_intern, geschlecht, alter, op_diagnose, op_geplant, created_at, sap_id } = formData;
  
    if (!patient_Id_intern || !patient_Id_intern.trim()) {
      newErrors.patient_Id_intern = 'Patienten ID ist erforderlich.';
    }
  
    if (!geschlecht || !geschlecht.trim()) {
      newErrors.geschlecht = 'Geschlecht ist erforderlich.';
    }
  
    if (!alter.toString().trim()) {
      newErrors.alter = 'Alter ist erforderlich.';
    } else {
      const ageNumber = Number(alter);
      if (!Number.isInteger(ageNumber) || ageNumber <= 0) {
        newErrors.alter = 'Bitte geben Sie ein gültiges Alter ein.';
      }
    }
  
    if (!op_diagnose || !op_diagnose.trim()) {
      newErrors.op_diagnose = 'Diagnose ist erforderlich.';
    }
  
    if (!op_geplant || !op_geplant.trim()) {
      newErrors.op_geplant = 'Art der OP ist erforderlich.';
    }
  
    if (!String(sap_id).trim()) {
      newErrors.sap_id = 'SAP ID ist erforderlich.';
    }
  
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };  

  const handleSubmit = async () => {
    if (!validateForm()) {
      setSnackbarMessage('Bitte beheben Sie die Fehler im Formular.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
  
    const dataToSend = {
      ...formData,
      alter: Number(formData.alter),
    };
  
    try {
      // First, check if the patient exists
      const checkResponse = await axios.get(`http://localhost:8000/table/data?table_name=patient`);
      const existingPatient = checkResponse.data.find(patient => patient.patient_Id_intern === formData.patient_Id_intern);
  
      let response;
  
      if (existingPatient) {
        // If the patient exists, update using PUT
        response = await axios.put(
          `http://localhost:8000/update/patient`,
          dataToSend,
          { headers: { 'Content-Type': 'application/json' } }
        );
        setSnackbarMessage('Patientendaten erfolgreich aktualisiert!');
        setSnackbarSeverity('success');
      } else {
        response = await axios.post(
          `http://localhost:8000/new_data/patient`,
          dataToSend,
          { headers: { 'Content-Type': 'application/json' } }
        );
        setSnackbarMessage('Patientendaten erfolgreich gesendet!');
        setSnackbarSeverity('success');
      }
  
      setSnackbarOpen(true);
      handleClear(); 
    } catch (error) {
      const errorMessage = `${error.response?.data?.detail || 'Fehler beim Senden der Daten.'}`;
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Box sx={{ position: 'absolute', top: 90, left: 16 }}>
        <Button variant="contained" color="primary" onClick={() => window.location.href = '/overview'}>
          <IoMdArrowRoundBack className='text-2xl' />
        </Button>
      </Box>
      <Box sx={{ textAlign: 'center', mt: 4, mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Patienten Anlegen
        </Typography>
      </Box>

      <TextField
        label="Patienten ID (intern)"
        name="patient_Id_intern"
        value={formData.patient_Id_intern || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        error={Boolean(errors.patient_Id_intern)}
        helperText={errors.patient_Id_intern}
      />

      {/* Weitere Felder */}
      <TextField
        label="Datum"
        name="created_at"
        type="date"
        value={formData.created_at}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        InputLabelProps={{ shrink: true }}
        error={Boolean(errors.created_at)}
        helperText={errors.created_at}
      />

      <FormControl component="fieldset" margin="normal" required error={Boolean(errors.geschlecht)}>
        <FormLabel id="geschlecht-label">Geschlecht</FormLabel>
        <RadioGroup
          aria-labelledby="geschlecht-label"
          name="geschlecht"
          value={formData.geschlecht}
          onChange={handleChange}
          row
        >
          <FormControlLabel value="Weiblich" control={<Radio />} label="Weiblich" />
          <FormControlLabel value="Männlich" control={<Radio />} label="Männlich" />
          <FormControlLabel value="Divers" control={<Radio />} label="Divers" />
        </RadioGroup>
      </FormControl>

      {/* Alter TextField */}
      <TextField
        label="Alter"
        name="alter"
        type="number"
        value={formData.alter || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        inputProps={{ min: 0 }}
        error={Boolean(errors.alter)}
        helperText={errors.alter}
      />

      {/* SAP ID TextField */}
      <TextField
        label="Pat. ID im SAP"
        name="sap_id"
        type="number"
        value={formData.sap_id || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        error={Boolean(errors.sap_id)}
        helperText={errors.sap_id}
      />

      {/* Diagnose TextField */}
      <TextField
        label="OP Diagnose"
        name="op_diagnose"
        value={formData.op_diagnose || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        error={Boolean(errors.op_diagnose)}
        helperText={errors.op_diagnose}
      />

      <TextField
        label="Geplante OP"
        name="op_geplant"
        value={formData.op_geplant || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        error={Boolean(errors.op_geplant)}
        helperText={errors.op_geplant}
      />

      {/* Bemerkungen TextField (Optional) */}
      <TextField
        label="Bemerkungen"
        name="bemerkung"
        value={formData.bemerkung || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />

      {/* Action Buttons */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" color="secondary" onClick={handleClear}>
          Zurücksetzen
        </Button>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Speichern
        </Button>
      </Box>

      {/* Notification Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleNotificationClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
          elevation={6}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
