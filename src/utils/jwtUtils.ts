import jwt, { JwtPayload } from 'jsonwebtoken';


function extractEmailFromToken(authorization: string): string | null {
  const [, token] = authorization.split(' ');

  const { email } = jwt.verify(token || '123', process.env.JWT_SECRET_KEY || '123') as JwtPayload;
  
  return email;
}

function extractRoleFromToken(authorization: string): string | null {
  const [, token] = authorization.split(' ');

  const { role } = jwt.verify(token || '123', process.env.JWT_SECRET_KEY || '123') as JwtPayload;
  
  return role;
}
export { extractEmailFromToken, extractRoleFromToken}
