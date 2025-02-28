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
import AlertTitle from '@mui/material/AlertTitle';

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
  });


  /////////////// useEffect here ///////////////

  // State to track errors
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');



  useEffect(() => {
  }, [formData.probenart]);

  /////////////// helper functions here ///////////////


  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear the error for the field as the user types
    setErrors({ ...errors, [name]: '' });
    console.log('Formdata CHANGED:', formData);
  };

  const handleSubmit = async () => {
    try {
      console.log('handleSubmit called:', formData);
  
      console.log(endpoint)
      const response = await axios.post(
        `http://localhost:8000/new_data/${endpoint}`,
        filteredData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
  
      setSnackbarMessage('Daten erfolgreich gesendet!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Fehler beim Senden der Daten.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
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
          Probengefäße Hinzufügen
        </Typography>

        <Typography variant="h7" sx={{ color: 'text.primary' }}>
          Probengefäße (Probenröhrchen) können hier zur Vorbereitung hinzugefügt werden.
        </Typography>


      </Box>

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

{/* Alert direkt unter dem Scannerfeld, kann nicht geschlossen werden */}
<Box sx={{ width: '100%', mt: 2 }}>
{/* Snackbar für allgemeine Nachrichten (Fehlermeldungen, Erfolgsmeldungen) */}
<Snackbar
  open={snackbarOpen}
  autoHideDuration={6000} // Diese Snackbar schließt sich nach 6 Sekunden
  onClose={handleSnackbarClose}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
>
  <Alert severity={snackbarSeverity} variant="filled" elevation={6}>
    {snackbarMessage}
  </Alert>
</Snackbar>

<Alert severity="info" variant='filled' sx={{ fontSize: 20}}>
        Label: Serum prä OP I
      </Alert>


</Box>


      {/* Action Buttons */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Senden
        </Button>
      </Box>
    </Box>
  );
}