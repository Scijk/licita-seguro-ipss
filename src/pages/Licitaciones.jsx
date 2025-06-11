import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Pagination,
  Box,
  Skeleton,
  Card,
  CardContent
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import LicitacionCard from '../components/LicitacionCard';
import { useLocation } from 'react-router-dom';
import { obtenerLicitaciones } from '../services/api';

const estados = ['Publicada', 'Cerrada', 'Adjudicada', 'Revocada', 'Desierta', 'Suspendida'];

const Licitaciones = () => {
  const [fecha, setFecha] = useState(null);
  const [estado, setEstado] = useState('');
  const [licitaciones, setLicitaciones] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const itemsPorPagina = 6;

  const location = useLocation();
  const filtrosRestaurados = location.state?.filtros;

  const formatoFecha = (fecha) => dayjs(fecha).format('DDMMYYYY');

  const handleBuscar = async () => {
    const filtros = {};
    if (fecha) filtros.fecha = formatoFecha(fecha);
    if (estado) filtros.estado = estado;
    setError('');
    setCargando(true);
    try {
      const data = await obtenerLicitaciones(filtros);
      setLicitaciones(data?.Listado || []);
      setPagina(1);
    } catch (error) {
      setLicitaciones([]);
      setError('Error al obtener licitaciones. Intente nuevamente.');
      console.error('Error obteniendo licitaciones:', error);
    } finally {
      setCargando(false);
    }
  };

  const buscarLimpio = () => {
    setFecha(null);
    setEstado('');
  };

  useEffect(() => {
    if (filtrosRestaurados) {
      setFecha(filtrosRestaurados.fecha || null);
      setEstado(filtrosRestaurados.estado || '');
    }
    handleBuscar(); // Buscar al cargar
  }, []);

  const totalPaginas = Math.ceil(licitaciones.length / itemsPorPagina);
  const licitacionesPaginadas = licitaciones.slice(
    (pagina - 1) * itemsPorPagina,
    pagina * itemsPorPagina
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Listado de Licitaciones</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={5}>
            <DatePicker
              label="Fecha a buscar"
              value={fecha}
              maxDate={dayjs()}
              onChange={(newValue) => {
                if (!newValue || !dayjs(newValue).isValid()) {
                  setFecha(null); // fecha inválida (mal escrita, por ejemplo)
                } else if (dayjs(newValue).isAfter(dayjs(), 'day')) {
                  setFecha(null); // fecha futura no permitida
                } else {
                  setFecha(newValue);
                }}
              }
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!fecha && (!dayjs(fecha).isValid() || dayjs(fecha).isAfter(dayjs(), 'day')),
                  helperText:
                    !!fecha && (!dayjs(fecha).isValid()
                      ? 'Fecha inválida'
                      : dayjs(fecha).isAfter(dayjs(), 'day')
                      ? 'La fecha no puede ser mayor a la fecha actual'
                      : ''),
                },
              }}/>
          </Grid>
          <Grid item xs={12} sm={3} sx={{ minWidth: '15%' }}>
            <TextField
              label="Estado"
              select
              fullWidth
              value={estado}
              onChange={(e) => setEstado(e.target.value)}>
              {estados.map((e) => (
                <MenuItem key={e} value={e}>
                  {e}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button fullWidth variant="contained" onClick={handleBuscar} sx={{ height: '100%' }}>
              Buscar
            </Button>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button fullWidth variant="contained" onClick={buscarLimpio} sx={{ height: '100%' }}>
              Limpiar
            </Button>
          </Grid>
        </Grid>
      </LocalizationProvider>
      {
        error ? (
          <Typography color="error">Error al cargar las licitaciones. Intente nuevamente.</Typography>
        ) : null
      }

      {cargando ? (
        <Grid container spacing={2}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Skeleton variant="text" height={32} width="80%" sx={{ mb: 1 }} />
                  <Skeleton variant="text" height={20} width="60%" sx={{ mb: 0.5 }} />
                  <Skeleton variant="text" height={20} width="60%" sx={{ mb: 0.5 }} />
                  <Skeleton variant="text" height={20} width="50%" sx={{ mb: 1 }} />
                  <Skeleton variant="rectangular" height={36} width={120} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : licitaciones.length === 0 ? (
        <Typography>No se encontraron licitaciones.</Typography>
      ) : (
        <>
          <Box mt={4} display="flex" justifyContent="center">
            <Pagination
              count={totalPaginas}
              page={pagina}
              onChange={(e, value) => setPagina(value)}
              color="primary"
            />
          </Box>
          {licitacionesPaginadas.map((licitacion) => (
            <Grid item xs={12} md={6} key={licitacion.CodigoExterno}>
              <LicitacionCard licitacion={licitacion} />
            </Grid>
          ))}

          <Box mt={4} display="flex" justifyContent="center">
            <Pagination
              count={totalPaginas}
              page={pagina}
              onChange={(e, value) => setPagina(value)}
              color="primary"/>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Licitaciones;
