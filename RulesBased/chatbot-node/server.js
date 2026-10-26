const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Remove acentos para que "promoção" e "promocao" sejam tratados igual
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

app.post("/chat", (req, res) => {
  const message = normalizar(req.body.message || "");
  let response = "Desculpe, não entendi sua pergunta.";

  if (message.includes("login") || message.includes("senha")) {
    response = "Você pode redefinir sua senha clicando em 'Esqueci minha senha'.";
  } else if (message.includes("plano")) {
    response = "Temos planos Básico e Premium. Qual você gostaria de saber mais?";
  } else if (message.includes("atendente")) {
    response = "Ok! Encaminhando você para um atendente.";
  } else if (
    message.includes("horario") ||
    message.includes("abre") ||
    message.includes("fecha") ||
    message.includes("funcionamento")
  ) {
    response =
      "Nosso horário de atendimento é de segunda a sexta, das 8h às 18h, e aos sábados, das 9h às 13h.";
  } else if (
    message.includes("localizacao") ||
    message.includes("endereco") ||
    message.includes("onde fica") ||
    message.includes("onde voces ficam")
  ) {
    response =
      "Estamos na Av. Paulista, 1000 - São Paulo/SP. Também atendemos online pelo nosso site.";
  } else if (
    message.includes("promocao") ||
    message.includes("promocoes") ||
    message.includes("desconto") ||
    message.includes("cupom")
  ) {
    response =
      "Temos 20% de desconto no plano Premium este mês! Use o cupom PROMO20 no momento da compra.";
  }

  res.json({ reply: response });
});

app.listen(3000, () => console.log("Chatbot rodando na porta 3000"));
