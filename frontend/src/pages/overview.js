'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import Link from 'next/link';
import ReusableButton from '../components/button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { getTableData } from '../services/api'; 

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
  const [count, setCount] = useState(0);
  const location = usePathname();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          textAlign: 'center',
          mt: 4,
          mb: 2,
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
          m: 5,
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
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: 'success.dark', fontWeight: 'bold' }}>
            -API-
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', ml: 1 }}>
            Einträge
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          textAlign: 'center',
          mt: 4,
          mb: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Neue Daten Eintragen
        </Typography>
      </Box>

      {[
        { title: 'Patient anlegen', link: '/patient_anlegen' },
        { title: 'Proben einschleusen', link: '/proben_einschleusen' },
        { title: 'Proben ausschleusen', link: '/proben_ausscheusen' },
        { title: 'Proben wieder einschleusen', link: '/proben_wiedereinschleusen' },
      ].map((section, index) => (
        <Box
          key={index}
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 3,
            borderRadius: 4,
            p: 3,
            m: 5,
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
              {section.title}
            </Typography>
            <Link
              href={section.link}
              className={clsx('text-white font-semibold hover:text-blue-200', {
                underline: location === section.link,
              })}
            >
              <ReusableButton
                buttonVariant="contained"
                buttonColor="primary"
                buttonText="Neu"
              />
            </Link>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: 'success.dark', fontWeight: 'bold' }}>
              -API-
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', ml: 1 }}>
              Einträge
            </Typography>
          </Box>
        </Box>
      ))}
    </ThemeProvider>
  );
}
