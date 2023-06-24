import jwt, { JwtPayload } from 'jsonwebtoken';

export function extractEmailFromToken(authorization: string): string | null {
  const [, token] = authorization.split(' ');

  const { email } = jwt.verify(token || '123', process.env.JWT_SECRET_KEY || '123') as JwtPayload;
  
  return email;
}
