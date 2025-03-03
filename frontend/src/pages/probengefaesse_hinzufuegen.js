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
import AlertTitle from '@mui/material/AlertTitle';

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
    barcode_id: '',
    probeninformation: '',
  });

  const [errors, setErrors] = useState({});
  const [probeninformation, setProbeninformation] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const getProbeninformation = async () => {
      try {
        const res = await fetch(`http://localhost:8000/table/data?table_name=probeninformation`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
        if (!res.ok) throw new Error(`Fehler beim Abrufen der Probeninformation: ${res.statusText}`);
        
        const response = await res.json();
        setProbeninformation(response);
      } catch (error) {
        console.error("Error fetching probeninformation:", error);
      }
    };
    getProbeninformation();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.patient_Id_intern) newErrors.patient_Id_intern = "Patienten ID ist erforderlich.";
    if (!formData.barcode_id) newErrors.barcode_id = "Barcode ID ist erforderlich.";
    if (!formData.probeninformation) newErrors.probeninformation = "Probeninformation ist erforderlich.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setSnackbarMessage("Bitte füllen Sie alle erforderlichen Felder aus.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
  
    try {
      console.log('handleSubmit called:', formData);
  
      const response = await axios.post(
        `http://localhost:8000/new_data/vorlaeufige_proben`,
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      setSnackbarMessage("Daten erfolgreich gesendet!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
  
      // Aktuelle probeninformation finden
      const currentIndex = probeninformation.findIndex(
        (probe) => probe.id === formData.probeninformation
      );
  
      // Nächste `probeninformation` bestimmen (zyklisch)
      const nextIndex = (currentIndex + 1) % probeninformation.length; 
      const nextProbe = probeninformation[nextIndex]?.id || ''; 
  
      // Setze das Formular zurück, aber mit der nächsten `probeninformation`
      setFormData({
        patient_Id_intern: formData.patient_Id_intern,
        barcode_id: '',
        probeninformation: nextProbe,
      });
  
    } catch (error) {
      console.error("Error submitting form:", error);
      
      if (error.response) {
        setSnackbarMessage(error.response.data.detail || "Fehler beim Senden der Daten.");
      } else if (error.request) {
        setSnackbarMessage("Keine Antwort vom Server erhalten. Bitte versuchen Sie es später erneut.");
      } else {
        setSnackbarMessage("Ein unerwarteter Fehler ist aufgetreten.");
      }
      
      setSnackbarSeverity("error");
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
          Probengefäße Hinzufügen
        </Typography>
        <Typography variant="h7" sx={{ color: 'text.primary' }}>
          Probengefäße (Probenröhrchen) können hier zur Vorbereitung hinzugefügt werden.
        </Typography>
      </Box>

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

      <FormControl variant="outlined" fullWidth margin="normal" error={Boolean(errors.probeninformation)}>
        <InputLabel id="label-select-label">Probeninformation</InputLabel>
        <Select
          label="probeninformation"
          name="probeninformation"
          labelId="label-select-label"
          value={formData.probeninformation}
          onChange={handleChange}
        >
  <MenuItem value=""><em>None</em></MenuItem>
  {probeninformation.map((probe) => (
    <MenuItem key={probe.id} value={probe.id}> {/* ÄNDERE value auf probe.id */}
      {probe.probeninformation_text}
    </MenuItem>
          ))}
        </Select>
        {errors.probeninformation && <Typography color="error" variant="caption">{errors.probeninformation}</Typography>}
      </FormControl>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Senden
        </Button>
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
