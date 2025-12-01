// tabelle oder andere übersicht
// count?
// deault - eingabefeld -> tabellen

import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  Snackbar,
  Alert,
} from '@mui/material';
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from 'axios';
import { getPatientSerumCount } from '../services/api';
import { getPatientGewebeCount } from '../services/api';
import { getPatientUrinCount } from '../services/api';
import { getPatientParaffinCount } from '../services/api';

export default function patientenuebersicht() {
  const [errors, setErrors] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [patientID, setSelectedpatientID] = useState('');
  
  // count states
  const [patient_serum_count, setPatientSerumCount] = useState(0);
  const [patient_gewebe_count, setPatientGewebeCount] = useState(0);
  const [patient_urin_count, setPatientUrinCount] = useState(0);
  const [patient_paraffin_count, setPatientParaffinCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  const handleChange= (e) => {
    setSelectedpatientID(e.target.value);
  };

  const fetchData = async (fetchFunction, setFunction, errorMessage) => {
    try {
      const count = await fetchFunction();
      setFunction(count);
    } catch (error) {
      console.error(errorMessage, error);
    }
  };

  const handleSubmit = async () => {
    if (!patientID) {
      setSnackbarMessage("Bitte Patientennummer eingeben!");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }
  
    try {
      await Promise.all([
        fetchData(() => getPatientSerumCount(patientID), setPatientSerumCount, "Fehler Serum"),
        fetchData(() => getPatientGewebeCount(patientID), setPatientGewebeCount, "Fehler Gewebe"),
        fetchData(() => getPatientUrinCount(patientID), setPatientUrinCount, "Fehler Urin"),
        fetchData(() => getPatientParaffinCount(patientID), setPatientParaffinCount, "Fehler Paraffin"),
      ]);
  
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Box sx={{ position: 'absolute', top: 90, left: 16 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => (window.location.href = '/overview')}
        >
          <IoMdArrowRoundBack className="text-2xl" />
        </Button>
      </Box>
      <Box sx={{ textAlign: 'center', mt: 4, mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Patientenübersicht
        </Typography>
      </Box>
      <TextField
        label="Patientennummer z.b.HL0125"
        name="patientID"
        value={patientID}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={Boolean(errors.patientID)}
        helperText={errors.patientID}
        autoFocus
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        sx={{ mt: 2 }}
      >
        Suchen
      </Button>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, mt: 5}}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h7" sx={{ color: 'success.dark', fontWeight: 'bold' }}>
              {patient_serum_count}
            </Typography>
            <Typography variant="h7" sx={{ color: 'text.secondary' }}>
              Serumproben
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h7" sx={{ color: 'success.dark', fontWeight: 'bold' }}>
              {patient_gewebe_count}
            </Typography>
            <Typography variant="h7" sx={{ color: 'text.secondary' }}>
              Gewebeproben
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h7" sx={{ color: 'success.dark', fontWeight: 'bold' }}>
              {patient_urin_count}
            </Typography>
            <Typography variant="h7" sx={{ color: 'text.secondary' }}>
              Urinproben
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h7" sx={{ color: 'success.dark', fontWeight: 'bold' }}>
              {patient_paraffin_count}
            </Typography>
            <Typography variant="h7" sx={{ color: 'text.secondary' }}>
              Paraffinproben
            </Typography>
          </Box>
        </Box>
    </Box>
  );
}
