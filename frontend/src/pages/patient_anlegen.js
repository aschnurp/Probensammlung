// src/PatientForm.js
import React, { useState } from 'react';
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

export default function PatientForm() {
  // Corrected initial state keys to match input field names
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

  // State for handling field errors
  const [errors, setErrors] = useState({});

  // State for handling notifications
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success', // 'success', 'error', 'info', 'warning'
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear the error for the field as the user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Clear the form fields and errors
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
    setErrors({});
  };

  // Close the notification Snackbar
  const handleNotificationClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setNotification({ ...notification, open: false });
  };

  // Validate the form data
  const validateForm = () => {
    const newErrors = {};
    const { patient_Id_intern, geschlecht, alter, op_diagnose, plannedSurgery, created_at, sap_id } = formData;

    // Required fields except 'bemerkung'
    if (!patient_Id_intern.trim()) {
      newErrors.patient_Id_intern = 'Patienten ID ist erforderlich.';
    }

    if (!geschlecht.trim()) {
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

    if (!op_diagnose.trim()) {
      newErrors.op_diagnose = 'Diagnose ist erforderlich.';
    }

    if (!plannedSurgery.trim()) {
      newErrors.plannedSurgery = 'Gepante OP ist erforderlich.';
    }

    if (!sap_id.trim()) {
      newErrors.sap_id = 'SAP ID ist erforderlich.';
    }

    if (!created_at.trim()) {
      newErrors.created_at = 'Datum ist erforderlich.';
    } else {
      // Optional: Validate date format (YYYY-MM-DD)
      const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(created_at);
      if (!isValidDate) {
        newErrors.created_at = 'Datum muss im Format JJJJ-MM-TT sein.';
      }
    }



    // Add more validations if necessary for other fields

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async () => {
    console.log('Button clicked');

    // Perform validation
    if (!validateForm()) {
      // Show error notification
      setNotification({
        open: true,
        message: 'Bitte beheben Sie die Fehler im Formular.',
        severity: 'error',
      });
      return;
    }

    // Prepare data to send (convert 'alter' to integer)
    const dataToSend = {
      ...formData,
      alter: Number(formData.alter),
    };

    try {
      console.log('formData before sending:', dataToSend);
      const response = await axios.post(
        `http://localhost:8000/new_data/patient`,
        dataToSend,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log('Data submitted successfully:', response.data);

      // Show success notification
      setNotification({
        open: true,
        message: 'Patientendaten erfolgreich gesendet!',
        severity: 'success',
      });

      // Optionally, clear the form after successful submission
      handleClear();
    } catch (error) {
      console.error('Error submitting data:', error);
      console.log(error.response.data);

      // Extract error message from response if available
      const errorMessage =
        `${error.response?.data?.detail || 'Backend-Fehler beim Senden der Daten.'} ${error.response?.data?.detail && error.response.data.detail.length > 0
          ? `: ${error.response.data.detail[0].msg}, ${error.response.data.detail[0].loc?.[1] || ''}`
          : ''
        }`;

      // Show error notification
      setNotification({
        open: true,
        message: errorMessage,
        severity: 'error',
      });
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>

      <Box sx={{ position: 'absolute', top: 90, left: 16 }}>
        <Button variant="contained" color="info" onClick={() => window.location.href = '/overview'}>
          Zur Übersicht
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
          Patienten Anlegen
        </Typography>
      </Box>

      {/* Patienten ID TextField */}
      <TextField
        label="Patienten ID (intern)"
        name="patient_Id_intern"
        value={formData.patient_Id_intern}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        error={Boolean(errors.patient_Id_intern)}
        helperText={errors.patient_Id_intern}
      />

      {/* Datum TextField */}
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

      {/* Geschlecht RadioGroup */}
      <FormControl component="fieldset" margin="normal" required error={Boolean(errors.geschlecht)}>
        <FormLabel id="geschlecht-label">Geschlecht</FormLabel>
        <RadioGroup
          aria-labelledby="geschlecht-label"
          name="geschlecht"
          value={formData.geschlecht}
          onChange={handleChange}
          row
        >
          <FormControlLabel value="female" control={<Radio />} label="Weiblich" />
          <FormControlLabel value="male" control={<Radio />} label="Männlich" />
          <FormControlLabel value="other" control={<Radio />} label="Divers" />
        </RadioGroup>
        {errors.geschlecht && (
          <Typography variant="caption" color="error">
            {errors.geschlecht}
          </Typography>
        )}
      </FormControl>

      {/* Alter TextField */}
      <TextField
        label="Alter"
        name="alter"
        type="number"
        value={formData.alter}
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
        value={formData.sap_id}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        error={Boolean(errors.sap_id)}
        helperText={errors.sap_id}
      />

      {/* Diagnose TextField */}
      <TextField
        label="Diagnose"
        name="op_diagnose"
        value={formData.op_diagnose}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        error={Boolean(errors.op_diagnose)}
        helperText={errors.op_diagnose}
      />

      {/* Geplante OP TextField */}
      <TextField
        label="Geplante OP"
        name="plannedSurgery"
        value={formData.plannedSurgery}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        error={Boolean(errors.plannedSurgery)}
        helperText={errors.plannedSurgery}
      />

      {/* Bemerkungen TextField (Optional) */}
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

      {/* Action Buttons */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" color="secondary" onClick={handleClear}>
          Clear All
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Senden
        </Button>
      </Box>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleNotificationClose}
          severity={notification.severity}
          sx={{ width: '100%' }}
          elevation={6}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
