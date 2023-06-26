import express from "express";
import cors from "cors";
import usersRouter from "./routes/users-router";
import clansRouter from "./routes/clans-route";
import favoriteClansRouter from "./routes/favorite-clans-route";
import favoriteCharacterRouter from "./routes/favorite-character-route";
import characterRouter from "./routes/character-route";
import rateLimit from "express-rate-limit";

const PORT = process.env.PORT || 4005;
const HOSTNAME = process.env.HOSTNAME || "http://localhost";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //(15 minutos)
  max: 0, 
  message: "Limite de requisições excedido. Tente novamente mais tarde.",
});

app.use(limiter);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", usersRouter);
app.use("/api", clansRouter);
app.use("/api", characterRouter);
app.use("/api", favoriteClansRouter);
app.use("/api", favoriteCharacterRouter);

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use((req: any, res: any) => {
  res.status(404);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`);
});
