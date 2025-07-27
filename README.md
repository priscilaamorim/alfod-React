![Integrando seu projeto React com APIs](thumbnail.png)

# Alfood

O Alfood é uma aplicação desenvolvida com React e TypeScript que permite gerenciar restaurantes e pratos de forma dinâmica.
O projeto simula um sistema administrativo onde o próprio dono do site pode cadastrar, editar e deletar informações de forma prática por meio de uma API REST.

<img src="screencapture.png" alt="Imagem do Alfood" width="50%">


## 🔥 O que foi desenvolvido?

Este projeto começou como uma vitrine estática de restaurantes e pratos, com dados fixos no código. Ao longo do curso, transformamos esse site em um sistema dinâmico completo, com:

✅ Requisições HTTP com axios
✅ Leitura de dados da API com GET
✅ Criação de novos registros com POST
✅ Edição de registros com PUT
✅ Exclusão com DELETE
✅ Upload de imagens com FormData
✅ Administração via rotas exclusivas com React Router
✅ Validação de seleções com <Select> para Tags e Restaurantes
✅ Navegação por links na AppBar administrativa
✅ Atualização de estado após ações do usuário

## ✨ Tecnologias e ferramentas utilizadas

Se liga nessa lista de tudo que usaremos nesse treinamento:

- `React`
- `React Hooks`
- `TypeScript`
- `axios`
- `React Router DOM`
- `FormData`
- `JSON Server` (API simulada)

----
## 📸 Funcionalidades em destaque

### 🧩 Vitrine dinâmica
- A vitrine agora carrega dados da API com `axios`.
- Para cada restaurante, os pratos são carregados automaticamente com base no ID.

### 🧑‍🍳 Área administrativa
- Formulários funcionais para cadastrar novos pratos e restaurantes.
- Campos com seleção obrigatória de restaurante e tag.
- Upload de imagem usando `FormData` e `multipart/form-data`.

### 🗑️ Remoção de restaurantes
- Botões que disparam requisições `DELETE` para remover registros.

## 📚 Mais informações
Este projeto faz parte do curso **Integrando seu projeto React com APIs** da plataforma Alura, na Escola de Front-End.  
É um ótimo exemplo de como consumir APIs REST no React de forma moderna, escalável e organizada.

----

## 🛠️ Abrir e rodar o projeto

Para abrir e rodar o projeto, execute npm i para instalar as dependências e npm start para inicar o projeto.

Depois, acesse <a href="http://localhost:3000/">http://localhost:3000/</a> no seu navegador.

## 📚 Mais informações do curso

Busque na plataforma da Alura o curso **Integrando seu projeto React com APIs** publicado na Escola Frontend.