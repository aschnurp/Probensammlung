'use client';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/system';
import { Button } from '@mui/material/styles';
import { CgEnter } from 'react-icons/cg';

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
        dark: '#009688',
      },
    },
  });


export default function Uebersicht() {
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
        Daten 
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
