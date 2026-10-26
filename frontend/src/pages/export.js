
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import TableViewRoundedIcon from '@mui/icons-material/TableViewRounded';
import DatasetRoundedIcon from '@mui/icons-material/DatasetRounded';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

const theme = createTheme({
  palette: {
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    primary: {
      main: '#1976d2',
    },
  },

  typography: {
    fontFamily: 'Roboto, sans-serif',
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

// Die Werte müssen den erlaubten Tabellennamen im FastAPI-Backend entsprechen.
const tables = [
  { value: 'patient', label: 'Patienten' },
  { value: 'serumproben', label: 'Serumproben' },
  { value: 'gewebeproben', label: 'Gewebeproben' },
  { value: 'urinproben', label: 'Urinproben' },
  { value: 'paraffinproben', label: 'Paraffinproben' },
  { value: 'galleproben', label: 'Galleproben' },
  { value: 'stuhlproben', label: 'Stuhlproben' },
  { value: 'edtaplasmaproben', label: 'EDTA-Plasmaproben' },
  { value: 'ltx_fragebogen', label: 'LTX-Fragebogen' },
  { value: 'vorlaeufigeproben', label: 'Vorläufige Proben' },
];

export default function Overview() {
  const [dataSelection, setDataSelection] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
  const [dataFormat, setDataFormat] = useState('');

  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const canExport =
    dataSelection === 'gesamt' ||
    (dataSelection === 'einzel' && selectedTable !== '');

  
const exportData = async () => {
  setError('');
  setSuccess('');

  if (!canExport || !dataFormat || exporting) {
    return;
  }

  // Der Gesamtexport wird als gemeinsames PDF erstellt.
  if (dataSelection === 'gesamt' && dataFormat !== 'pdf') {
    setError(
      'Der Gesamtexport ist derzeit nur als PDF verfügbar.'
    );
    return;
  }

  setExporting(true);

  try {
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_URL ||
      'http://localhost:8000';

    let exportUrl;
    let filename;

    if (dataSelection === 'gesamt') {
      exportUrl = `${API_BASE_URL}/table/export/all/pdf`;
      filename = 'gesamtexport.pdf';
    } else {
      const params = new URLSearchParams({
        table_name: selectedTable,
        format: dataFormat,
      });

      exportUrl =
        `${API_BASE_URL}/table/export?${params.toString()}`;

      filename = `${selectedTable}.${dataFormat}`;
    }

    const response = await fetch(exportUrl);

    if (!response.ok) {
      const responseText = await response.text();

      let message = `Export fehlgeschlagen (${response.status})`;

      try {
        const result = JSON.parse(responseText);
        message = result.detail || message;
      } catch {
        if (responseText) {
          message += `: ${responseText}`;
        }
      }

      throw new Error(message);
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = downloadUrl;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(() => {
      window.URL.revokeObjectURL(downloadUrl);
    }, 1000);

    setSuccess('Der Download wurde gestartet.');
  } catch (err) {
    console.error('Exportfehler:', err);

    setError(
      err instanceof Error
        ? err.message
        : 'Verbindung zum Backend fehlgeschlagen.'
    );
  } finally {
    setExporting(false);
  }
};


  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.paper',
          pt: 4,
          pb: 8,
          px: 2,
        }}
      >
        {/* Überschrift */}
        <Box
          sx={{
            textAlign: 'center',
            mt: 4,
            mb: 6,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
              mb: 1,
            }}
          >
            Datenexport
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
            }}
          >
            In diesem Bereich können Daten aus der klinischen
            Probensammlung exportiert werden.
          </Typography>
        </Box>

        <Box
          sx={{
            maxWidth: 700,
            mx: 'auto',
          }}
        >
          {/* ================= DATEN ================= */}
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: 'text.primary',
                mb: 2,
              }}
            >
              1. Daten auswählen
            </Typography>

            <FormControl fullWidth>
              <InputLabel id="data-selection-label">
                Daten
              </InputLabel>

              <Select
                labelId="data-selection-label"
                value={dataSelection}
                label="Daten"
                onChange={(event) => {
                  const value = event.target.value;

                  setDataSelection(value);
                  setError('');
                  setSuccess('');

                  if (value === 'gesamt') {
                    setSelectedTable('');
                  }
                }}
              >
                <MenuItem value="einzel">
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <TableViewRoundedIcon />
                    Einzelne Tabelle
                  </Box>
                </MenuItem>

                <MenuItem value="gesamt">
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <DatasetRoundedIcon />
                    Gesamte Daten
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* ================= TABELLE ================= */}
          {dataSelection === 'einzel' && (
            <Box sx={{ mb: 5 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: 'text.primary',
                  mb: 2,
                }}
              >
                2. Tabelle auswählen
              </Typography>

              <FormControl fullWidth>
                <InputLabel id="table-selection-label">
                  Tabelle
                </InputLabel>

                <Select
                  labelId="table-selection-label"
                  value={selectedTable}
                  label="Tabelle"
                  onChange={(event) => {
                    setSelectedTable(event.target.value);
                    setError('');
                    setSuccess('');
                  }}
                >
                  {tables.map((table) => (
                    <MenuItem
                      key={table.value}
                      value={table.value}
                    >
                      {table.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}

          {/* ================= FORMAT ================= */}
          {canExport && (
            <Box sx={{ mb: 5 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: 'text.primary',
                  mb: 2,
                }}
              >
                {dataSelection === 'einzel' ? '3.' : '2.'}{' '}
                Datenformat auswählen
              </Typography>

              <FormControl fullWidth>
                <InputLabel id="format-selection-label">
                  Datenformat
                </InputLabel>

                <Select
                  labelId="format-selection-label"
                  value={dataFormat}
                  label="Datenformat"
                  onChange={(event) => {
                    setDataFormat(event.target.value);
                    setError('');
                    setSuccess('');
                  }}
                >
                  <MenuItem value="csv">
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <FileDownloadRoundedIcon />
                      CSV
                    </Box>
                  </MenuItem>

                  <MenuItem value="pdf">
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <PictureAsPdfRoundedIcon />
                      PDF
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}

          {/* ================= EXPORT ================= */}
          {canExport && (
            <Box
              sx={{
                textAlign: 'center',
                mt: 4,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<DownloadRoundedIcon />}
                disabled={!dataFormat || exporting}
                onClick={exportData}
                sx={{
                  minWidth: 240,
                  height: 55,
                  fontSize: '16px',
                }}
              >
                {exporting ? 'Export läuft …' : 'Export starten'}
              </Button>

              {error && (
                <Typography
                  color="error"
                  role="alert"
                  sx={{ mt: 2 }}
                >
                  {error}
                </Typography>
              )}

              {success && (
                <Typography
                  color="success.main"
                  role="status"
                  sx={{ mt: 2 }}
                >
                  {success}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
