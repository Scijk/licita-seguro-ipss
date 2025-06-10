import { Box, Typography, Link, Stack } from '@mui/material';
import {
  LocationOn,
  Phone,
  Email,
  Facebook,
  Instagram
} from '@mui/icons-material';

const Footer = () => (
  <Box sx={{ backgroundColor: '#f5f5f5', mt: 5, py: 4 }}>
    <Stack spacing={1} alignItems="center">
      <Typography variant="h6">Contáctanos</Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <LocationOn />
        <Typography>Av. Siempre Viva 123, Santiago, Chile</Typography>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <Phone />
        <Typography>+56 9 1234 5678</Typography>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <Email />
        <Typography>contacto@ejemplo.cl</Typography>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
        <Link href="https://instagram.com" target="_blank" color="inherit">
          <Instagram />
        </Link>
        <Link href="https://facebook.com" target="_blank" color="inherit">
          <Facebook />
        </Link>
      </Stack>
    </Stack>
  </Box>
);

export default Footer;
