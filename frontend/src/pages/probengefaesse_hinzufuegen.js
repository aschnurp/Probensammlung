import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function SampleForm() {
  const [formData, setFormData] = useState({
    patient_Id_intern: "",
    barcode_id: "",
    probeninformation: "",
  });

  const [errors, setErrors] = useState({});
  const [probeninformation, setProbeninformation] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getProbeninformation = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/table/data?table_name=probeninformation`
        );
        if (!res.ok) throw new Error("Fehler beim Abrufen der Probeninformation");

        const response = await res.json();
        setProbeninformation(response);
      } catch (error) {
        console.error("Error fetching probeninformation:", error);
      }
    };

    const getTableData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/table/data?table_name=vorlaeufigeproben`
        );
        setData(res.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };

    getProbeninformation();
    getTableData(); // Fetch table data on component mount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
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
      await axios.post(`http://localhost:8000/new_data/vorlaeufige_proben`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      setSnackbarMessage("Daten erfolgreich gesendet!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Find next probeninformation (cyclic rotation)
      const currentIndex = probeninformation.findIndex(
        (probe) => probe.id === formData.probeninformation
      );
      const nextIndex = (currentIndex + 1) % probeninformation.length; // Zyklische Rotation
      const nextProbe = probeninformation[nextIndex]?.id || ""; // Hole das nächste Element

      setFormData({
        patient_Id_intern: formData.patient_Id_intern,
        barcode_id: "", // Barcode nach dem Absenden zurücksetzen
        probeninformation: nextProbe, // Nächste Probeninformation
      });

      // Refresh table after submission
      const updatedTableData = await axios.get(
        `http://localhost:8000/table/data?table_name=vorlaeufigeproben`
      );
      setData(updatedTableData.data); // Setze die neuen Daten in die Tabelle
    } catch (error) {
      console.error("Error submitting form:", error);
      setSnackbarMessage("Fehler beim Senden der Daten.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Box sx={{ position: "absolute", top: 90, left: 16 }}>
        <Button variant="contained" color="primary" onClick={() => window.location.href = "/overview"}>
          <IoMdArrowRoundBack className="text-2xl" />
        </Button>
      </Box>

      <Box sx={{ textAlign: "center", mt: 4, mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "text.primary" }}>
          Probengefäße Hinzufügen
        </Typography>
        <Typography variant="h7" sx={{ color: "text.primary" }}>
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
            <MenuItem key={probe.id} value={probe.id}>
              {probe.probeninformation_text}
            </MenuItem>
          ))}
        </Select>
        {errors.probeninformation && <Typography color="error" variant="caption">{errors.probeninformation}</Typography>}
      </FormControl>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Senden
        </Button>
      </Box>

      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "text.primary" }}>
          Zuletzt Hinzugefügt
        </Typography>
      </Box>

      {/* Table for displaying data */}
      <TableContainer component={Paper} sx={{ mt: 5 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ width: 100 }}>Barcode</TableCell>
              <TableCell align="left" style={{ width: 100 }}>Patient ID</TableCell>
              <TableCell align="left" style={{ width: 100 }}>Probeninformation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sortiert nach dem timestamp-Feld (neueste zuerst)
              .slice(0, 10) // Nimmt nur die ersten 10
              .map((row) => ( //mapping probeninformation_text on row.probeninformation
                <TableRow key={row.id}>
                  <TableCell align="left" style={{ width: 100 }}>{row.barcode_id}</TableCell>
                  <TableCell align="left" style={{ width: 100 }}>{row.patient_Id_intern}</TableCell>
                  <TableCell align="left" style={{ width: 100 }}>
                    {probeninformation.find((probe) => probe.id === row.probeninformation)?.probeninformation_text || "Keine Info"} 
                  </TableCell> 
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
