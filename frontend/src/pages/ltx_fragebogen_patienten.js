import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button
} from "@mui/material";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Ltx_fragebogen_patienten() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (ts) => {
    if (!ts) return "-";
    const d = new Date(ts);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/table/data?table_name=ltx_fragebogen"
        );
        const data = await res.json();
        setPatients(data);
      } catch (err) {
        console.error("Fehler beim Laden:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: "auto" }}>
      <Box sx={{ position: "absolute", top: 90, left: 16 }}>
        <Button variant="contained" color="primary" onClick={() => window.location.href = "/overview"}>
          <IoMdArrowRoundBack className="text-2xl" />
        </Button>
      </Box>

      <Box sx={{ textAlign: "center", mt: 4, mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "text.primary" }}>
          LTX-Fragebogen Patienten
        </Typography>
        <Typography variant="h7" sx={{ color: "text.primary" }}>
          Übersicht der Patienten, für welche bereits ein ausgefüllter LTX-Fragebogen vorliegt.
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                Patienten ID (intern)
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Eingetragen am
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {patients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    Keine Patienten gefunden
                  </TableCell>
                </TableRow>
              ) : (
                patients.map((row, index) => (
                  <TableRow
                    key={row.id}
                    hover
                    sx={{
                      backgroundColor:
                        index % 2 === 0 ? "grey.50" : "white"
                    }}
                  >
                    <TableCell>{row.patient_Id_intern}</TableCell>
                    <TableCell>{formatDate(row.timestamp)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}