'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
import Link from 'next/link';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { getPatientCount } from '../services/api';
import { getSerumCount } from '../services/api';
import { getGewebeCount } from '../services/api';
import { getUrinCount } from '../services/api';
import { getParaffinCount } from '../services/api';
import { getGalleCount } from '../services/api';
import { getStuhlCount } from '../services/api';
import { getEdtaplasmaCount } from '../services/api';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import InputRoundedIcon from '@mui/icons-material/InputRounded';
import OutputRoundedIcon from '@mui/icons-material/OutputRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import SearchIcon from '@mui/icons-material/Search';

const sections = [
  { title: 'Patient anlegen', link: '/patient_anlegen', icon: <AddCircleRoundedIcon />, iconName: 'Neu' },
  { title: 'Proben einschleusen', link: '/proben_einschleusen', icon: <AddCircleRoundedIcon />, iconName: 'Neu' },
  //{ title: 'LTX Fragebogen', link: '/ltx_fragebogen', icon: <AddCircleRoundedIcon />, iconName: 'Neu' },
  //{ title: 'Proben ausschleusen', link: '/proben_ausscheusen', icon: <OutputRoundedIcon />, iconName: 'Neu', color: 'error' },
  //{ title: 'Proben wieder einschleusen', link: '/proben_wiedereinschleusen', icon: <RepeatRoundedIcon />, iconName: 'Neu' },
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
  const [galle_count, setGalleCount] = useState(0);
  const [stuhl_count, setStuhlCount] = useState(0);
  const [edtaplasma_count, setEdtaplasmaCount] = useState(0);
  const location = usePathname();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


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
        fetchData(getGewebeCount, setGewebeCount, 'Failed to fetch gewebe count'),
        fetchData(getUrinCount, setUrinCount, 'Failed to fetch urin count'),
        fetchData(getParaffinCount, setParaffinCount, 'Failed to fetch paraffin count'),
        fetchData(getGalleCount, setGalleCount, 'Failed to fetch galle count'),
        fetchData(getStuhlCount, setStuhlCount, 'Failed to fetch stuhl count'),
        fetchData(getEdtaplasmaCount, setEdtaplasmaCount, 'Failed to fetch edtaplasma count'),
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
            alignItems: 'center',
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
            <Button variant="contained" color='primary' startIcon={<SearchIcon />}>
              Öffnen
            </Button>

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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: 'success.dark', fontWeight: 'bold' }}>
              {galle_count}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Gallproben
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: 'success.dark', fontWeight: 'bold' }}>
              {stuhl_count}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Stuhlproben
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: 'success.dark', fontWeight: 'bold' }}>
              {edtaplasma_count}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              EDTA-Plasmaproben
            </Typography>
          </Box>
        </Box>
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
            Patientenübersicht
          </Typography>
          <Link
            href={'/patientenuebersicht'}
            className={clsx('text-white font-semibold hover:text-blue-200', {
              underline: location === '/patientenuebersicht',
            })}
          >
            <Button variant="contained" startIcon={<SearchIcon />} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              Öffnen
            </Button>
          </Link>
        </Box>
        <Divider sx={{ my: 2 }} />
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
            alignItems: 'center',
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
            <Button variant="contained" startIcon={<AddCircleRoundedIcon />} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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

              
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
        </Box>
      ))}



      <Box
        sx={{
          display: 'flex',
          gap: 5,        // Abstand zwischen den Boxen
          m: 10,
        }}
      >
        <Box
          sx={{
            flex: 1,
            bgcolor: 'background.paper',
            boxShadow: 3,
            borderRadius: 4,
            p: 3,
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
              LTX-Fragebogen
            </Typography>
            <Link
              href={'/ltx_fragebogen'}
              className={clsx('text-white font-semibold hover:text-blue-200', {
                underline: location === '/ltx_fragebogen',
              })}
            >
              <Button
                variant="contained"
                sx={{
                  minWidth: 78,
                  minHeight: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AddCircleRoundedIcon />
              </Button>
            </Link>
          </Box>
          <Divider sx={{ my: 2 }} />
        </Box>

        <Box
          sx={{
            flex: 1,
            bgcolor: 'background.paper',
            boxShadow: 3,
            borderRadius: 4,
            p: 3,
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
              LTX-Fragebogen Patienten
            </Typography>
            <Link
              href={'/ltx_fragebogen_patienten'}
              className={clsx('text-white font-semibold hover:text-blue-200', {
                underline: location === '/ltx_fragebogen_patienten',
              })}
            >
              <Button
                variant="contained"
                sx={{
                  minWidth: 78,
                  minHeight: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SearchIcon />
              </Button>
            </Link>
          </Box>
          <Divider sx={{ my: 2 }} />
        </Box>
      </Box>

      <Box sx={{ textAlign: 'center', height: 0 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Proben Verwalten
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 5,        // Abstand zwischen den Boxen
          m: 10,
        }}
      >
        <Box
          sx={{
            flex: 1,
            bgcolor: 'background.paper',
            boxShadow: 3,
            borderRadius: 4,
            p: 3,
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
              Proben ausschleusen
            </Typography>
            <Link
              href={'/proben_ausscheusen'}
              className={clsx('text-white font-semibold hover:text-blue-200', {
                underline: location === '/proben_ausscheusen',
              })}
            >
              <Button
                variant="contained"
                color="error"
                sx={{
                  minWidth: 78,
                  minHeight: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <OutputRoundedIcon />
              </Button>
            </Link>
          </Box>
          <Divider sx={{ my: 2 }} />
        </Box>

        <Box
          sx={{
            flex: 1,
            bgcolor: 'background.paper',
            boxShadow: 3,
            borderRadius: 4,
            p: 3,
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
              Proben wieder einschleusen
            </Typography>
            <Link
              href={'/proben_wiedereinschleusen'}
              className={clsx('text-white font-semibold hover:text-blue-200', {
                underline: location === '/proben_wiedereinschleusen',
              })}
            >
              <Button
                variant="contained"
                sx={{
                  minWidth: 78,
                  minHeight: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AddCircleRoundedIcon />
              </Button>
            </Link>
          </Box>
          <Divider sx={{ my: 2 }} />
        </Box>
      </Box>

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
