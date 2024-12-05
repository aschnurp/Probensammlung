'use client'; // Ensure this directive is at the top

import Image from 'next/image';
import { FaBeer, FaCoffee, FaApple } from 'react-icons/fa';
import { useRouter } from 'next/navigation'; // Ensure correct import for router
import { TextField } from '@mui/material';
import { Box, Typography, Divider } from '@mui/material';

require('dotenv').config();
console.log(process.env.NEXT_PUBLIC_CONTACT_NAME_ONE);

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
          Technical Support, Backup and Restoring Support, Administrative Support
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
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" sx={{ color: 'text.primary' }}>
            {process.env.NEXT_PUBLIC_CONTACT_NAME_ONE}
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.primary' }}>
            {process.env.NEXT_PUBLIC_CONTACT_MAIL_ONE}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
      </Box>
      <Box
        sx={{
          mt: 10,
          height: 0,
        }}
      ><Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          User Support, Administrative Support
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
