import { Container, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => (
  <Container sx={{ textAlign: 'center', mt: 5 }}>
    <Typography variant="h6" gutterBottom>Explora licitaciones y busca proveedores fácilmente</Typography>
    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
      <Button variant="contained" component={Link} to="/licitaciones">Ver Licitaciones</Button>
      <Button variant="outlined" component={Link} to="/buscar-proveedor">Buscar Proveedor</Button>
    </Stack>
  </Container>
);

export default Home;
