import express from "express";
import cors from "cors";
import { testConnection } from "./config/db";
import cartaRoutes from "./routes/carta.routes";
import { controller } from "./controller/controllerInstance";
import { Carta } from "./model/Carta";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API EXODIA funcionando com CORS.");
});

app.use("/cartas", cartaRoutes);

const PORT = process.env.PORT || 3000;

async function fetchECriar(): Promise<void> {
  try {
    console.log("Banco vazio. Buscando cartas na API...");

    const response = await fetch(
      "https://db.ygoprodeck.com/api/v7/cardinfo.php"
    );

    if (!response.ok) {
      throw new Error(`Erro na API. Status: ${response.status}`);
    }

    const responseJson = await response.json();

    await controller.criarCartas(responseJson);

    console.log("Cartas buscadas na API e salvas no banco.");
  } catch (error: any) {
    console.error("Erro ao buscar dados da API:", error.message);
  }
}

async function iniciar() {
  try {
    await testConnection();

    await controller.carregarDoBanco();

    if (controller.listar().length === 0) {
      await fetchECriar();
      await controller.carregarDoBanco();
    }

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
}

iniciar();