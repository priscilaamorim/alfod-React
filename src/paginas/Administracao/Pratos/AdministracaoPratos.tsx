import { useState, useEffect } from "react";

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
import { Link as RouterLink } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";

const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    http.get<IPrato[]>("pratos/").then((resposta) => setPratos(resposta.data));
  }, []);

  const excluir = (pratoAoExcluir: IPrato) => {
    http
      .delete(`pratos/${pratoAoExcluir.id}/`)
      .then(() => {
        const listaPrato = pratos.filter(
          (prato) => prato.id !== pratoAoExcluir.id
        );
        setPratos([...listaPrato]);
      })
      .catch((erro) => alert("Erro ao excluir restaurante: " + erro));
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato) => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>
              <TableCell>{prato.descricao}</TableCell>
              <TableCell>{prato.tag}</TableCell>
              <TableCell>
                [
                <a
                  href={prato.imagem}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver imagem
                </a>
                ]
              </TableCell>
                 <TableCell>
                            [ <RouterLink to={`/admin/pratos/${prato.id}`}>editar</RouterLink> ]
                        </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(prato)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoPratos;
