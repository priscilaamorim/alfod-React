import { useState, useEffect } from "react";

import IRestaurante from "../../../interfaces/IRestaurante";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import http from "../../../http";

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    
      http.get<IRestaurante[]>("restaurantes/")
      .then((resposta) => setRestaurantes(resposta.data));

    
  }, []);

  const excluir = (restauranteAoExcluir: IRestaurante) => {
    
      http.delete(`restaurantes/${restauranteAoExcluir.id}/`)
      .then(() => {
    const listaRestaurante = restaurantes.filter((restaurante) => restaurante.id !== restauranteAoExcluir.id);
    setRestaurantes([...listaRestaurante])
      })
      .catch(erro => alert("Erro ao excluir restaurante: " + erro))
  }
  return (
    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((restaurante) => (
            <TableRow key={restaurante.id}>
              <TableCell>{restaurante.nome}</TableCell>
              <TableCell>
               [<Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>]
              </TableCell>
              <TableCell>
                <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>
                  Excluir</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
};

export default AdministracaoRestaurantes;
