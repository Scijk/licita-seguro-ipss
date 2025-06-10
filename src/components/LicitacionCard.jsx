import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const LicitacionCard = ({ licitacion, filtrosActuales }) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="h6">{licitacion.Nombre}</Typography>
      <Typography variant="body2">Código Estado: {licitacion.CodigoEstado}</Typography>
      <Typography variant="body2">Código Externo: {licitacion.CodigoExterno}</Typography>
      <Typography variant="body2">Fecha Cierre: {licitacion.FechaCierre}</Typography>
      <Button
        variant="outlined"
        component={Link}
        to={`/licitaciones/${licitacion.CodigoExterno}`}
        state={{ filtros: filtrosActuales }}
        sx={{ mt: 1 }}
      >
        Ver Detalles
      </Button>
    </CardContent>
  </Card>
);

export default LicitacionCard;
