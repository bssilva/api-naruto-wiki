import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({ error: "Token de autenticação não fornecido." });

  const [, token] = authorization.split(" ");

  try {
    jwt.verify(token, "asegredo_do_seu_token_jwt");
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token de autenticação inválido." });
  }
};

export default authMiddleware;
