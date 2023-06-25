import { Request, Response, NextFunction } from "express";
import { extractRoleFromToken } from "../utils/jwtUtils";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res
      .status(401)
      .json({ error: "Token de autenticação não fornecido." });

  const [, token] = authorization.split(" ");

  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY || "1234");

    return next();
  } catch (err) {
    return res
      .status(401)
      .json({
        body: { message: "Token de autenticação inválido.", statusCode: 401 },
      });
  }
};

const checkUserRole = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      const userRole = authorization && extractRoleFromToken(authorization);

      if (userRole !== requiredRole) {
        return res.status(403).json({ error: "Acesso negado" });
      }
      
    } catch (error) {
      return res.status(401).json({ error: "Falha na autenticação" });
    }
  };
};

export {authMiddleware, checkUserRole};
