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
  Checkbox,
  FormGroup,
  FormControlLabel
} from "@mui/material";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function SampleForm() {
  const [formData, setFormData] = useState({
    patient_Id_intern: "",
    barcode_id: "",
    probeninformation: "",
    probeninformation_ltx: "",
  });

  const [errors, setErrors] = useState({});
  const [probeninformation, setProbeninformation] = useState([]);
  const [probeninformationLTX, setProbeninformationLTX] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState(false);

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
        console.error("Error fetching Probeninformation:", error);
      }
    };

    const getProbeninformationLTX = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/table/data?table_name=probeninformation_ltx`
        );
        if (!res.ok) throw new Error("Fehler beim Abrufen der Probeninformation-LTX");

        const response = await res.json();
        setProbeninformationLTX(response);
      } catch (error) {
        console.error("Error fetching Probeninformation:", error);
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
    getProbeninformationLTX();
    getTableData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked: isChecked } = e.target;

    if (type === "checkbox") {
      setChecked(isChecked);
      return;
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };


  const validateForm = () => {
    let newErrors = {};

    if (!formData.patient_Id_intern)
      newErrors.patient_Id_intern = "Patienten ID ist erforderlich.";

    if (!formData.barcode_id)
      newErrors.barcode_id = "Barcode ID ist erforderlich.";

    if (checked) {
      if (!formData.probeninformation_ltx)
        newErrors.probeninformation_ltx = "LTX Probeninformation ist erforderlich.";
    } else {
      if (!formData.probeninformation)
        newErrors.probeninformation = "Probeninformation ist erforderlich.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async () => {
    if (!validateForm()) return;
    const payload = checked
      ? {
          ...formData,
          probeninformation: null,        
        }
      : {
          ...formData,
          probeninformation_ltx: null,    
        };
  
    try {
      await axios.post(
        `http://localhost:8000/new_data/vorlaeufige_proben`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
  
      setSnackbarMessage("Daten erfolgreich gesendet!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
  
      // --- NEXT PROBE LOGIC ---
      let nextProbe = "";
  
      if (checked) {
        // LTX-mode → rotate in probeninformationLTX
        const currentIndex = probeninformationLTX.findIndex(
          (probe) => probe.id === formData.probeninformation_ltx
        );
        const nextIndex = (currentIndex + 1) % probeninformationLTX.length;
        nextProbe = probeninformationLTX[nextIndex]?.id || "";
  
        setFormData({
          patient_Id_intern: formData.patient_Id_intern,
          barcode_id: "",
          probeninformation: "",       // always empty in LTX mode
          probeninformation_ltx: nextProbe,
        });
  
      } else {
        // Normal mode → rotate in probeninformation
        const currentIndex = probeninformation.findIndex(
          (probe) => probe.id === formData.probeninformation
        );
        const nextIndex = (currentIndex + 1) % probeninformation.length;
        nextProbe = probeninformation[nextIndex]?.id || "";
  
        setFormData({
          patient_Id_intern: formData.patient_Id_intern,
          barcode_id: "",
          probeninformation: nextProbe,
          probeninformation_ltx: "",   // always empty in NORMAL mode
        });
      }
  
      // Refresh table
      const updatedTableData = await axios.get(
        `http://localhost:8000/table/data?table_name=vorlaeufigeproben`
      );
      setData(updatedTableData.data);
  
    } catch (error) {
      console.error("Error submitting form:", error);
      setSnackbarMessage("Fehler beim Senden der Daten.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };
  

  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: "auto" }}>
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
          Probengefäße (Probenröhrchen) können hier zur Vorbereitung hinzugefügt werden. Das ist nötig um diese später Einschleusen zu können.
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={(event) => {
          event.preventDefault(); // Verhindert (z. B. Seiten-Reload)
          handleSubmit();
        }}
        sx={{ mt: 3 }}
      >
        <TextField
          label="Patienten ID (intern) z.B. HL0126"
          name="patient_Id_intern"
          value={formData.patient_Id_intern}
          onChange={handleChange}
          fullWidth
          onFocus={(e) => e.target.setAttribute("autoComplete", "one-time-code")}
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
          onFocus={(e) => e.target.setAttribute("autoComplete", "one-time-code")}
          margin="normal"
          error={Boolean(errors.barcode_id)}
          helperText={errors.barcode_id}
        />
        <FormGroup>
          <FormControlLabel control={<Checkbox
            checked={checked}
            onChange={handleChange}
            slotProps={{
              input: { 'aria-label': 'controlled' },
            }}
          />} label="LTX-Probe" />
        </FormGroup>

        {/* Normale Probeninformation */}
        {!checked && (
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
          </FormControl>
        )}

        {/* LTX-Probeninformation */}
        {checked && (
          <FormControl variant="outlined" fullWidth margin="normal" error={Boolean(errors.probeninformation_ltx)}>
            <InputLabel id="label-select-ltx-label">LTX Probeninformation</InputLabel>
            <Select
              label="probeninformation_ltx"
              name="probeninformation_ltx"
              labelId="label-select-ltx-label"
              value={formData.probeninformation_ltx}
              onChange={handleChange}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {probeninformationLTX.map((probe) => (
                <MenuItem key={probe.id} value={probe.id}>
                  {probe.probeninformation_text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <Button
          type="submit" // enter activates the function
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
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
        <Table sx={{ minWidth: 90 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ width: 220 }}>Barcode</TableCell>
              <TableCell align="left" style={{ width: 220 }}>Patient ID</TableCell>
              <TableCell align="left" style={{ width: 220 }}>Probeninformation</TableCell>
              <TableCell align="left" style={{ width: 220 }}>Probeninformation-LTX</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sortiert nach dem timestamp-Feld (neueste zuerst)
              .slice(0, 10) // Nimmt nur die ersten 10
              .map((row) => ( //mapping probeninformation_text on row.probeninformation
                <TableRow key={row.id}>
                  <TableCell align="left" style={{ width: 220 }}>{row.barcode_id}</TableCell>
                  <TableCell align="left" style={{ width: 220 }}>{row.patient_Id_intern}</TableCell>
                  <TableCell align="left" style={{ width: 220 }}>
                    {probeninformation.find((probe) => probe.id === row.probeninformation)?.probeninformation_text || "-"}
                  </TableCell>
                  <TableCell align="left" style={{ width: 220 }}>
                    {probeninformationLTX.find((probe) => probe.id === row.probeninformation_ltx)?.probeninformation_text || "-"}
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