'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/system';
import Link from 'next/link';
import { Link as RouterLink } from 'react-router-dom';
import ReusableButton from '../components/button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { CgEnter } from 'react-icons/cg';
import { useRouter } from 'next/router';

// Import column definitions
const theme = createTheme({
  palette: {
    background: {
      paper: '#ebf6fc',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      main: '#009688', // Correctly defining the main color
      dark: '#00695c', // Optionally keep dark if needed
    },
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});


export default function Overview() {
  const location = usePathname()
    return (
      <ThemeProvider theme={theme}>
      <Box sx={{ 
        display: "flex",
        color: 'text.secondary',
        justifyContent: "center", 
        alignItems: "center",
        fontWeight: 'bold',
        fontSize: 24 
        }}>Datenabfrage</Box>
      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
          margin: 5
        }}
      >

        <Box sx={{ color: 'text.primary', fontSize: 24, fontWeight: 'medium'}}>
        Probensammlung
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 1 }}>
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
        </Box>
        <Box
          sx={{
            color: 'success.dark',
            display: 'inline',
            fontWeight: 'bold',
            mx: 0.5,
            fontSize: 14,
          }}
        >
          -API-
        </Box>
        Einträge 
        </Box>

      <Box sx={{        
        display: "flex",
        color: 'text.secondary',
        justifyContent: "center", 
        alignItems: "center",
        fontWeight: 'bold',
        fontSize: 24   }}>Neue Daten Eintragen </Box>

      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
          margin: 5
        }}
      >
        <Box sx={{ color: 'text.primary', fontSize: 24, fontWeight: 'medium' }}>
        Patient anlegen
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 1 }}>
        <Link
              href="/patient_anlegen"
              className={clsx('text-white font-semibold hover:text-blue-200', {
                underline: location === '/patient_anlegen',
              })}
            >
        <ReusableButton
        buttonVariant="contained"
        buttonColor="primary"
        buttonText="Neu"
        />
        </Link>
      </Box>
        </Box>
        <Box
          sx={{
            color: 'success.dark',
            display: 'inline',
            fontWeight: 'bold',
            mx: 0.5,
            fontSize: 14,
          }}
        >
          -API-
        </Box>
        <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14 }}>
        Einträge
        </Box>
      </Box>

      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
          margin: 5
        }}
      >
        <Box sx={{ color: 'text.primary', fontSize: 24, fontWeight: 'medium' }}>
        Proben einschleusen
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 1 }}>
        <Link
              href="/proben_einschleusen"
              className={clsx('text-white font-semibold hover:text-blue-200', {
                underline: location === '/proben_einschleusen',
              })}
            >        <ReusableButton
        buttonVariant="contained"
        buttonColor="primary"
        buttonText="Neu"
        />
        </Link>
      
      </Box>
        </Box>
        <Box
          sx={{
            color: 'success.dark',
            display: 'inline',
            fontWeight: 'bold',
            mx: 0.5,
            fontSize: 14,
          }}
        >
          -API-
        </Box>
        <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14 }}>
        Einträge
        </Box>
      </Box>

      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
          margin: 5
        }}
      >
        <Box sx={{ color: 'text.primary', fontSize: 24, fontWeight: 'medium' }}>
        Proben ausschleusen
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 1 }}>
        <Link
              href="/proben_ausscheusen"
              className={clsx('text-white font-semibold hover:text-blue-200', {
                underline: location === '/proben_ausscheusen',
              })}
            >        
            
        <ReusableButton
        buttonVariant="contained"
        buttonColor="primary"
        buttonText="Neu"
        />
        </Link>
      </Box>
        </Box>
        <Box
          sx={{
            color: 'success.dark',
            display: 'inline',
            fontWeight: 'bold',
            mx: 0.5,
            fontSize: 14,
          }}
        >
          -API-
        </Box>
        <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14 }}>
        Einträge
        </Box>
      </Box>
      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
          margin: 5
        }}
      >

        <Box sx={{ color: 'text.primary', fontSize: 24, fontWeight: 'medium' }}>
        Proben wieder einschleusen
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 1 }}>
        <Link
              href="/proben_wiedereinschleusen"
              className={clsx('text-white font-semibold hover:text-blue-200', {
                underline: location === '/proben_wiedereinschleusen',
              })}
            >         <ReusableButton
        buttonVariant="contained"
        buttonColor="primary"
        buttonText="Neu"
        /> 
        </Link>
        
      </Box>
        </Box>
        <Box
          sx={{
            color: 'success.dark',
            display: 'inline',
            fontWeight: 'bold',
            mx: 0.5,
            fontSize: 14,
          }}
        >
          -API-
        </Box>
        <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14 }}>
          Einträge
        </Box>
      </Box>
    </ThemeProvider>
  );
}
