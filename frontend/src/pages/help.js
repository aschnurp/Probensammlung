'use client'; // Ensure this directive is at the top

import Image from 'next/image';
import { FaBeer, FaCoffee, FaApple } from 'react-icons/fa';
import { useRouter } from 'next/navigation'; // Ensure correct import for router
import { TextField } from '@mui/material';
import { Box, Typography, Divider } from '@mui/material';

require('dotenv').config();

export default function Sonstiges() {
  return (
    <Box
      sx={{
        textAlign: 'center',
        mt: 4,
        mb: 2,
        height: 0,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
        Need Help?
      </Typography>
      
      <Box
        sx={{
          mt: 10,
          height: 0,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
        Software-Code-Dokumentation
        </Typography>
      </Box>
      <Box
        sx={{
          boxShadow: 4,
          borderRadius: 4,
          p: 3,
          m: 7
        }}
      >
        <Box
          sx={{
            textAlign: 'left',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" sx={{ color: 'text.primary' }}>
          Informationen können den Zusatzdokumenten der Probensammlung entnommen werden. Eine Übersicht zu allen genutzten Codes und Fremdschlüsseln sowie eine Erklärung der Bedeutung der Inhalte sind in dem Dokument "Software-Dokumentation-Probensammlung_v1.2" festgehalten.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          mt: 10,
          height: 0,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
        SOP-User Anleitung
        </Typography>
      </Box>
      <Box
        sx={{
          boxShadow: 4,
          borderRadius: 4,
          p: 3,
          m: 7
        }}
      >
        <Box
          sx={{
            textAlign: 'left',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" sx={{ color: 'text.primary' }}>
          Informationen zu dem Ablauf der Sammlung von Proben können in dem Dokument "SOP Probensammlung.pdf" nachgeschlagen werden. Darin enthalten sind Informationen zu den Probenvorbereitungen, der Probenaufbereitung und zur Archivierung von Proben im Kontext der digitalen Probensammlung.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          mt: 10,
          height: 0,
        }}
      ><Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Benutzersupport, administrative Unterstützung
        </Typography>
      </Box>
      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 4,
          borderRadius: 4,
          p: 3,
          m: 7
        }}
      ><Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center', // Ensures alignment of title and button
        }}
      >
          <Typography variant="h6" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
            {process.env.NEXT_PUBLIC_CONTACT_NAME_TWO}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
            {process.env.NEXT_PUBLIC_CONTACT_MAIL_TWO}

          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
      </Box>
    </Box>
  )
}
