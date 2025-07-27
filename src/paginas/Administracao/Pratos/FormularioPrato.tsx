import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";
import IPrato from "../../../interfaces/IPrato";
import { useNavigate, useParams } from "react-router-dom";

const FormularioPrato = () => {
  const parametros = useParams();
  const navigate = useNavigate();

  const [nomePrato, setNomePrato] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tags, setTags] = useState<ITag[]>([]);
  const [tag, setTag] = useState("");

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [restaurante, setRestaurante] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);

  useEffect(() => {
    http
      .get<{ tags: ITag[] }>("tags/")
      .then((resposta) => setTags(resposta.data.tags));

    http
      .get<IRestaurante[]>("restaurantes/")
      .then((resposta) => setRestaurantes(resposta.data));

      if (parametros.id) {
        http
          .get<IPrato>(`pratos/${parametros.id}/`)
          .then((resposta) => {
            setNomePrato(resposta.data.nome);
            setDescricao(resposta.data.descricao);
            setTag(resposta.data.tag);
            setRestaurante(resposta.data.restaurante.toString());
          });
      }

  }, [parametros.id]);

  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0]);
    } else {
      setImagem(null);
    }
  };

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const formData = new FormData();
    formData.append("nome", nomePrato);
    formData.append("descricao", descricao);
    formData.append("tag", tag);
    formData.append("restaurante", restaurante);
    if (imagem) {
      formData.append("imagem", imagem);
    }


  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  if (parametros.id) {
    // Edição
    http
      .put(`pratos/${parametros.id}/`, formData, config)
      .then(() => {
        alert("Prato atualizado com sucesso!");
        navigate("/admin/pratos"); // redireciona
      })
      .catch((erro) => {
        alert("Erro ao atualizar prato: " + erro);
      });
  } else {
    // Criação
    http
      .post("pratos/", formData, config)
      .then(() => {
        setNomePrato("");
        setDescricao("");
        setTag("");
        setRestaurante("");
        setImagem(null);
        alert("Prato cadastrado com sucesso!");
        navigate("/admin/pratos"); // redireciona
      })
      .catch((erro) => {
        alert("Erro ao cadastrar prato: " + erro);
      });
  }
};
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      <Typography component="h1" variant="h6">
        Formulário de Prato
      </Typography>
      <Box
        component="form"
        sx={{ width: "100%", mt: 1 }}
        onSubmit={aoSubmeterForm}
      >
        <TextField
          value={nomePrato}
          onChange={(evento) => setNomePrato(evento.target.value)}
          label="Nome do prato"
          variant="standard"
          fullWidth
          margin="dense"
        />
        <TextField
          value={descricao}
          onChange={(evento) => setDescricao(evento.target.value)}
          label="Descrição do prato"
          variant="standard"
          fullWidth
          margin="dense"
        />

        <FormControl fullWidth margin="dense">
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select
            labelId="select-tag"
            value={tag}
            onChange={(evento) => setTag(evento.target.value)}
          >
            {tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.value}>
                {tag.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel id="select-restaurante">Reataurante</InputLabel>
          <Select
            labelId="select-restaurante"
            value={restaurante}
            onChange={(evento) => setRestaurante(evento.target.value)}
          >
            {restaurantes.map((restaurante) => (
              <MenuItem key={restaurante.id} value={restaurante.id}>
                {restaurante.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <input type="file" onChange={selecionarArquivo} />

        <Button
          sx={{ marginTop: 1 }}
          type="submit"
          fullWidth
          variant="contained"
        >
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioPrato;
