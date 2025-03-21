'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
import Link from 'next/link';
import ReusableButton from '../components/button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { getPatientCount } from '../services/api';
import { getSerumCount } from '../services/api';
import { getGewebeCount } from '../services/api';
import { getUrinCount } from '../services/api';
import { getParaffinCount } from '../services/api';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import InputRoundedIcon from '@mui/icons-material/InputRounded';
import OutputRoundedIcon from '@mui/icons-material/OutputRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';


const sections = [
  { title: 'Patient anlegen', link: '/patient_anlegen', icon: <AddCircleRoundedIcon />, iconName: 'Neu' },
  { title: 'Proben einschleusen', link: '/proben_einschleusen', icon: <InputRoundedIcon />, iconName: 'Neu' },
  { title: 'Proben ausschleusen', link: '/proben_ausscheusen', icon: <OutputRoundedIcon />, iconName: 'Neu', color: 'error' },
  { title: 'Proben wieder einschleusen', link: '/proben_wiedereinschleusen', icon: <RepeatRoundedIcon />, iconName: 'Neu' },
];

const theme = createTheme({
  palette: {
    background: {
      paper: '#f0f8ff',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      main: '#009688',
    },
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontWeightBold: 700,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default function Overview() {
  const [patient_count, setPatientCount] = useState(0);
  const [serum_count, setSerumCount] = useState(0);
  const [gewebe_count, setGewebeCount] = useState(0);
  const [urin_count, setUrinCount] = useState(0);
  const [paraffin_count, setParaffinCount] = useState(0);
  const location = usePathname();
  const [loading, setLoading] = useState(false); // Ladezustand
  const [error, setError] = useState(null); // Fehlerzustand


  useEffect(() => {
    const fetchData = async (fetchFunction, setFunction, errorMessage) => {
      setLoading(true);
      setError(null);
      try {
        const count = await fetchFunction();
        setFunction(count);
      } catch (error) {
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    const fetchCounts = async () => {
      await Promise.all([
        fetchData(getPatientCount, setPatientCount, 'Failed to fetch patient count'),
        fetchData(getSerumCount, setSerumCount, 'Failed to fetch serum count'),
        fetchData(getGewebeCount, setGewebeCount, 'Failed to fetch geweb count'),
        fetchData(getUrinCount, setUrinCount, 'Failed to fetch urin count'),
        fetchData(getParaffinCount, setParaffinCount, 'Failed to fetch urin count'),
      ]);
    };

    fetchCounts();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          textAlign: 'center',
          mt: 4,
          mb: 2,
          height: 0,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Datenabfrage
        </Typography>
      </Box>

      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 3,
          borderRadius: 4,
          p: 3,
          m: 10,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center', // This ensures alignment
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
            Probensammlung
          </Typography>
          <Link
            href="/data_overview"
            className={clsx('text-white font-semibold hover:text-blue-200', {
              underline: location === '/data_overview',
            })}
          >
            <ReusableButton
              buttonVariant="contained"
              buttonColor="primary"
              buttonText="Öffnen"
            />
          </Link>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: 'success.dark', fontWeight: 'bold' }}>
              {patient_count}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Patienten
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: 'success.dark', fontWeight: 'bold' }}>
              {serum_count}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Serumproben
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: 'success.dark', fontWeight: 'bold' }}>
              {gewebe_count}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Gewebeproben
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: 'success.dark', fontWeight: 'bold' }}>
              {urin_count}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Urinproben
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: 'success.dark', fontWeight: 'bold' }}>
              {paraffin_count}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Paraffinproben
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          textAlign: 'center',
          height: 0,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Vorbereitung
        </Typography>
      </Box>
      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 3,
          borderRadius: 4,
          p: 3,
          m: 10,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center', // Ensures alignment of title and button
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
            Probengefäße Hinzufügen
          </Typography>
          <Link
            href={'/probengefaesse_hinzufuegen'}
            className={clsx('text-white font-semibold hover:text-blue-200', {
              underline: location === '/probengefaesse_hinzufuegen',
            })}
          >

            <Button variant="contained" startIcon={<AddCircleRoundedIcon />}   sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
>
              Neu
            </Button>

          </Link>
        </Box>
        <Divider sx={{ my: 2 }} />
      </Box>


      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 3,
          borderRadius: 4,
          p: 3,
          m: 10,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
            Probengefäße Entfernen
          </Typography>
          <Link
            href={'/probengefaesse_entfernen'}
            className={clsx('text-white font-semibold hover:text-blue-200', {
              underline: location === '/probengefaesse_entfernen',
            })}
          >
            <Button variant="contained" color='error' startIcon={<OutputRoundedIcon />}>
              Neu
            </Button>
          </Link>
        </Box>
        <Divider sx={{ my: 2 }} />
      </Box>


      <Box sx={{ textAlign: 'center', height: 0 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Neue Daten Eintragen
        </Typography>
      </Box>

      {sections.map((section, index) => (
  <Box key={index} sx={{ bgcolor: 'background.paper', boxShadow: 3, borderRadius: 4, p: 3, m: 10 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h6" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
        {section.title}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Link href={section.link} className={clsx('text-white font-semibold hover:text-blue-200')}>
          <Button variant="contained" startIcon={section.icon} color={section.color || 'primary'}>
            {/* Hier den benutzerdefinierten Namen des Icons anzeigen */}
            {section.iconName}
          </Button>
        </Link>
        {section.extraButton && (
          <Link href={section.link} className={clsx('text-white font-semibold hover:text-blue-200')}>
            <Button variant="outlined" startIcon={<EditRoundedIcon />}>
              Bearbeiten
            </Button>
          </Link>
        )}
      </Box>
    </Box>
    <Divider sx={{ my: 2 }} />
  </Box>
))}

<Box sx={{ textAlign: 'center', height: 0 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Weitere Funktionen
        </Typography>
      </Box>
      <Box sx={{ bgcolor: 'background.paper', boxShadow: 3, borderRadius: 4, p: 3, m: 10 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
            Probenabholer Bearbeiten
          </Typography>
          <Link href={'/proben_abholer_aendern'} className={clsx('text-white font-semibold hover:text-blue-200')}>
            <Button variant="contained" startIcon={<EditRoundedIcon />}>
              Bearbeiten
            </Button>
          </Link>
        </Box>
        <Divider sx={{ my: 2 }} />
      </Box>

      <Box sx={{ height: 10 }} />
    </ThemeProvider>
  );
}
