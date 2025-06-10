import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Stack
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import viteLogo from '/vite.svg'

const navLinks = [
  { label: 'Inicio', path: '/' },
  { label: 'Licitaciones', path: '/licitaciones' },
  { label: 'Buscar Proveedor', path: '/buscar-proveedor' }
];

const Header = () => {
  const location = useLocation();

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box component={Link} to="/" sx={{ height: 50 }}>
          <img
            src={viteLogo}
            alt="Logo"
            style={{ height: '100%', objectFit: 'contain' }}
          />
        </Box>
        <Stack direction="row" spacing={2}>
          {navLinks.map(({ label, path }) => (
            <Button
              key={path}
              component={Link}
              to={path}
              variant={location.pathname === path ? 'outlined' : 'text'}
              sx={{ color: 'white', borderColor: 'white' }}
            >
              {label}
            </Button>
          ))}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
