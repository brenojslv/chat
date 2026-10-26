const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const natural = require("natural");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Classificador Bayesiano
const classifier = new natural.BayesClassifier();

// Treinamento básico
classifier.addDocument("oi", "saudacao");
classifier.addDocument("olá", "saudacao");
classifier.addDocument("bom dia", "saudacao");
classifier.addDocument("boa tarde", "saudacao");
classifier.addDocument("boa noite", "saudacao");

classifier.addDocument("quero saber meu pedido", "pedido_status");
classifier.addDocument("meu pedido chegou", "pedido_status");
classifier.addDocument("acompanhar pedido", "pedido_status");
classifier.addDocument("onde está minha encomenda", "pedido_status");

classifier.addDocument("obrigado", "agradecimento");
classifier.addDocument("valeu", "agradecimento");
classifier.addDocument("muito obrigada", "agradecimento");

// Novas intenções
classifier.addDocument("qual o preço", "preco");
classifier.addDocument("quanto custa", "preco");
classifier.addDocument("qual o valor do plano", "preco");
classifier.addDocument("quanto é a mensalidade", "preco");
classifier.addDocument("preço do produto", "preco");
classifier.addDocument("está caro", "preco");

classifier.addDocument("preciso de ajuda", "ajuda");
classifier.addDocument("me ajuda", "ajuda");
classifier.addDocument("socorro", "ajuda");
classifier.addDocument("estou com um problema", "ajuda");
classifier.addDocument("não estou conseguindo usar", "ajuda");
classifier.addDocument("como funciona", "ajuda");

classifier.addDocument("quero cancelar", "cancelamento");
classifier.addDocument("cancelar minha assinatura", "cancelamento");
classifier.addDocument("cancelar o pedido", "cancelamento");
classifier.addDocument("desistir da compra", "cancelamento");
classifier.addDocument("encerrar minha conta", "cancelamento");
classifier.addDocument("não quero mais o plano", "cancelamento");

classifier.train();

app.post("/chat", (req, res) => {
  const { message } = req.body;
  const intent = classifier.classify(message.toLowerCase());
  let reply = "Desculpe, não entendi.";

  switch (intent) {
    case "saudacao":
      reply = "Olá! Em que posso te ajudar hoje?";
      break;
    case "pedido_status":
      reply = "Para consultar seu pedido, informe o número ou e-mail da compra.";
      break;
    case "agradecimento":
      reply = "De nada! Estou sempre à disposição";
      break;
    case "preco":
      reply = "O plano Básico custa R$ 29,90/mês e o Premium R$ 59,90/mês.";
      break;
    case "ajuda":
      reply = "Claro! Me conte qual é o problema ou acesse nossa central de ajuda.";
      break;
    case "cancelamento":
      reply = "Que pena! Para cancelar, informe o número do pedido ou o e-mail da conta.";
      break;
  }

  res.json({ reply, intent });
});

app.listen(3000, () => console.log("Chatbot PLN rodando na porta 3000"));
