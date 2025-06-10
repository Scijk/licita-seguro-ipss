import axios from 'axios';
import licitaciones from '../ResponseTodasLicitaciones.json'

const API_BASE = 'https://api.mercadopublico.cl/servicios/v1/publico';
const API_TICKET = 'ticket=AC3A098B-4CD0-41AF-81A5-41284248419B';

export const obtenerLicitaciones = async (filtros = {}) => {
  let params = new URLSearchParams(filtros);
  let response;
  console.log('Parametros de búsqueda:', params);
  if(params.size>0) {
    params = '&' + params;
    response = await axios.get(`${API_BASE}/licitaciones.json?${API_TICKET}${params}`);
  }
  else {
    console.log('No se aplicaron filtros, usando datos de ejemplo');
    return licitaciones;
  }
  return response.data;
};

export const obtenerDetalleLicitacion = async (codigo) => {
  const response = await axios.get(`${API_BASE}/licitaciones.json?codigo=${codigo}&${API_TICKET}`);
  return response.data;
};

export const buscarProveedorPorRUT = async (rut) => {
  const response = await axios.get(`${API_BASE}/Empresas/BuscarProveedor?rutempresaproveedor=${rut}&${API_TICKET}`);
  return response.data;
};
