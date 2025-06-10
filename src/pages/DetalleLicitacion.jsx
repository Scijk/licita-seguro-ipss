import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Grid,
  Paper,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Skeleton
} from '@mui/material';
import { Email, Phone, LocationOn, Business, CalendarToday, Badge, CurrencyExchange } from '@mui/icons-material';
import dayjs from 'dayjs';
import { obtenerDetalleLicitacion } from '../services/api'; // tu servicio API
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const LicitacionDetalle = () => {
  const { codigo } = useParams();
  const [detalle, setDetalle] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const filtros = location.state?.filtros;

  const formatCLP = (monto, moneda) => {
    if (!monto) return 'No informado';
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: moneda,
      minimumFractionDigits: 0
    }).format(monto);
  };

  useEffect(() => {
    setLoading(true);
    const fetchDetalle = async () => {
      try {
        const data = await obtenerDetalleLicitacion(codigo);
        setDetalle(data?.Listado?.[0] || null);
      } catch (error) {
        console.error('Error al obtener detalle:', error);
      } finally {
        setLoading(false);
      }
    };
    if(codigo) fetchDetalle();
  }, [codigo]);

  if (loading) {
    return (
      <Box p={2}>
        <Skeleton variant="text" animation="wave" height={48} width="60%" sx={{ mb: 2 }} />
        <Skeleton variant="text" animation="wave" height={24} width="80%" sx={{ mb: 3 }} />
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Skeleton variant="text" animation="wave" height={32} width="30%" />
          <Skeleton variant="rectangular" animation="wave" height={36} width={120} />
        </Box>

        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">Datos del Comprador</Typography>
        <Grid container spacing={2}>
          {[...Array(2)].map((_, colIdx) => (
            <Grid item xs={12} sm={6} key={colIdx}>
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} variant="text" animation="wave" height={24} width={`${80 - i * 5}%`} sx={{ mb: 1 }} />
              ))}
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">Fechas Relevantes</Typography>
        <Grid container spacing={2}>
          {[...Array(4)].map((_, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <Skeleton variant="rectangular" animation="wave" height={60} sx={{ borderRadius: 1 }} />
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">Ítems Licitados</Typography>
        <Grid container spacing={2}>
          {[...Array(3)].map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant="rectangular" animation="wave" height={100} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (!detalle) {
    return (
      <Box p={2}>
        <Typography variant="h6" color="error">
          No se encontró información de la licitación.
        </Typography>
      </Box>
    );
  }

  const { Nombre, Descripcion, Estado, Comprador, Fechas, Items, MontoEstimado, Moneda, Tiempo } = detalle;

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>{Nombre}</Typography>
      <Typography variant="subtitle1" gutterBottom>{Descripcion}</Typography>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5" gutterBottom>Estado: {Estado}</Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/licitaciones', { state: { filtros } })}
            sx={{ mb: 2 }}>
            Volver
          </Button>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Datos del Comprador</Typography>

      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column">
          <List sx={{ alignItems: 'flex-start' }}>
            <ListItem alignItems="flex-start">
              <ListItemIcon sx={{ minWidth: 36 }}><Business /></ListItemIcon>
              <ListItemText primary={Comprador.NombreOrganismo || 'No informado'} secondary="Organismo" />
            </ListItem>
            <ListItem alignItems="flex-start">
              <ListItemIcon sx={{ minWidth: 36 }}><Badge /></ListItemIcon>
              <ListItemText primary={Comprador.RutUnidad || 'No informado'} secondary="Rut Empresa" />
            </ListItem>
            <ListItem alignItems="flex-start">
              <ListItemIcon sx={{ minWidth: 36 }}><LocationOn /></ListItemIcon>
              <ListItemText primary={Comprador.DireccionUnidad || 'No informado'} secondary="Dirección" />
            </ListItem>
            <ListItem alignItems="flex-start">
              <ListItemIcon sx={{ minWidth: 36 }}><Phone /></ListItemIcon>
              <ListItemText primary={Comprador.FonoResponsableContrato || 'No informado'} secondary="Teléfono" />
            </ListItem>
            <ListItem alignItems="flex-start">
              <ListItemIcon sx={{ minWidth: 36 }}><Email /></ListItemIcon>
              <ListItemText primary={Comprador.EmailResponsableContrato || 'No informado'} secondary="Email" />
            </ListItem>
            <ListItem alignItems="flex-start">
              <ListItemIcon sx={{ minWidth: 36 }}><CurrencyExchange /></ListItemIcon>
              <ListItemText primary={formatCLP(MontoEstimado, Moneda)} secondary="Monto estimado" />
            </ListItem>
          </List>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column">
          <List sx={{ alignItems: 'flex-start' }}>
            <ListItem alignItems="flex-start">
              <ListItemText primary={Comprador.NombreUnidad || 'No informado'} secondary="Nombre Unidad" />
            </ListItem>
            <ListItem alignItems="flex-start">
              <ListItemText primary={Comprador.NombreUsuario || 'No informado'} secondary="Usuario Responsable" />
            </ListItem>
            <ListItem alignItems="flex-start">
              <ListItemText primary={Comprador.CargoUsuario || 'No informado'} secondary="Cargo" />
            </ListItem>
            <ListItem alignItems="flex-start">
              <ListItemText primary={Comprador.ComunaUnidad || 'No informado'} secondary="Comuna" />
            </ListItem>
            <ListItem alignItems="flex-start">
              <ListItemText primary={Comprador.RegionUnidad || 'No informado'} secondary="Región" />
            </ListItem>
            <ListItem alignItems="flex-start">
              <ListItemText primary={Tiempo || 'No informado'} secondary="Tiempo" />
            </ListItem>
          </List>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Fechas Relevantes</Typography>
      <Grid container spacing={2}>
        {Object.entries(Fechas).map(([key, value]) => (
          value && (
            <Grid
              item
              key={key}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ maxWidth: 300 }}
            >
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="body2">
                  <CalendarToday fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                  <strong>{key.replace('Fecha', '')}:</strong><br />
                  {dayjs(value).format('DD/MM/YYYY HH:mm')}
                </Typography>
              </Paper>
            </Grid>
          )
        ))}
      </Grid>

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Ítems Licitados</Typography>
      <Grid container spacing={2}>
        {Items?.Listado?.map((item) => (
          <Grid
            item
            key={item.Correlativo}
            xs={12}
            sm={6}
            md={4}
            lg={4}
            sx={{ maxWidth: 360 }}
          >
            <Paper elevation={2} sx={{p:1, m: 1, height: '90%' }}>
              <Typography variant="subtitle1" gutterBottom>{item.NombreProducto}</Typography>
              <Typography variant="body2" gutterBottom sx={{ wordBreak: 'break-word' }}>{item.Descripcion}</Typography>
              <Typography variant="caption" color="textSecondary">
                Cantidad: {item.Cantidad} {item.UnidadMedida}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LicitacionDetalle;
