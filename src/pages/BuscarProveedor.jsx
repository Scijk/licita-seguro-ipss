import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Grid,
  Card,
  CardContent,
  Skeleton
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import { useState } from 'react';
import dayjs from 'dayjs';
import { buscarProveedorPorRUT } from '../services/api';

const BuscarProveedor = () => {
  const [rut, setRut] = useState('');
  const [proveedor, setProveedor] = useState(null);
  const [rutValido, setRutValido] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatearYValidarRut = (input) => {
    if (!input) return { rutFormateado: '', esValido: false };

    const limpio = input.replace(/[^0-9kK]/g, '').toUpperCase();

    if (limpio.length < 2) return { rutFormateado: input, esValido: false };

    const cuerpo = limpio.slice(0, -1);
    const dvIngresado = limpio.slice(-1);

    let suma = 0;
    let multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo[i]) * multiplo;
      multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    const dvCalculado = 11 - (suma % 11);
    let dvEsperado = '';
    if (dvCalculado === 11) dvEsperado = '0';
    else if (dvCalculado === 10) dvEsperado = 'K';
    else dvEsperado = dvCalculado.toString();

    const esValido = dvIngresado === dvEsperado;

    let rutConPuntos = '';
    let i = cuerpo.length;
    while (i > 3) {
      rutConPuntos = '.' + cuerpo.slice(i - 3, i) + rutConPuntos;
      i -= 3;
    }
    rutConPuntos = cuerpo.slice(0, i) + rutConPuntos;

    return {
      rutFormateado: `${rutConPuntos}-${dvIngresado}`,
      esValido,
    };
  };

  const handleRutChange = (e) => {
    const { rutFormateado, esValido } = formatearYValidarRut(e.target.value);
    setRut(rutFormateado);
    setRutValido(esValido);
  };

  const handleBuscar = async () => {
    setLoading(true);
    setError('');
    setProveedor(null);
    try {
      const data = await buscarProveedorPorRUT(rut);
      setProveedor(data);
    } catch (error) {
      setError('Error al buscar proveedor. Intente nuevamente.');
      console.error('Error al buscar proveedor:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Buscar Proveedor por RUT</Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="RUT proveedor"
          variant="outlined"
          fullWidth
          value={rut}
          onChange={handleRutChange}
          error={!rutValido}
          helperText={!rutValido ? 'RUT inválido' : ''}
        />
        <Button variant="contained" onClick={handleBuscar} disabled={!rutValido || loading || rut === ''}>
          Buscar
        </Button>
      </Box>
      {
        error ? (
          <Typography color="error">Error al cargar información de proveedor. Intente nuevamente</Typography>
        ) : null
      }

      {loading ? (
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Skeleton variant="text" height={32} width="40%" sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} width="50%" sx={{ mb: 0.5 }} />
              <Skeleton variant="text" height={20} width="50%" sx={{ mb: 0.5 }} />
              <Divider sx={{ mb: 2 }} />
              <Skeleton variant="text" height={20} width="70%" sx={{ mb: 0.5 }} />
              <Skeleton variant="text" height={20} width="60%" sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} width="70%" sx={{ mb: 0.5 }} />
              <Skeleton variant="text" height={20} width="60%" sx={{ mb: 1 }} />
            </CardContent>
          </Card>
        </Grid>
      ) : (
        proveedor && (
          <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Resultados de búsqueda
            </Typography>

            <Box mb={2}>
              <Typography variant="body2">
                <strong>Fecha de consulta:</strong> {dayjs(proveedor.FechaCreacion).format('DD/MM/YYYY HH:mm')}
              </Typography>
              <Typography variant="body2">
                <strong>Cantidad de empresas:</strong> {proveedor.Cantidad}
              </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <List>
              {proveedor.listaEmpresas.map((empresa) => (
                <ListItem key={empresa.CodigoEmpresa}>
                  <ListItemIcon>
                    <BusinessIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={empresa.NombreEmpresa}
                    secondary={`Código Empresa: ${empresa.CodigoEmpresa}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        )
      )}
    </Container>
  );
};

export default BuscarProveedor;
