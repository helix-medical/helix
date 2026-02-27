import log from '../tools/newLogger';
import { createRemoteJWKSet, jwtVerify } from 'jose';

class Auth {
  private scopes: string[];

  constructor() {
    this.middleware = this.middleware.bind(this);
    this.scopes = [];
  }

  getScopes() {
    return this.scopes;
  }

  async middleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      log.message('Authorization header is missing / not in Bearer scheme');
      return res.status(400).json({ error: 'Error in Authorization Header' });
    }

    const token = authHeader.slice(7);
    const jwks = createRemoteJWKSet(new URL('http://localhost:3010/oidc/jwks'));

    let payload;
    try {
      const result = await jwtVerify(token, jwks, {
        issuer: 'http://localhost:3010/oidc',
        audience: 'http://localhost:3001/api',
      });
      payload = result.payload;
    } catch (err) {
      log.message('Token verification failed');
      return res.status(401).json({ error: 'Token verification failed' });
    }

    this.scopes = payload.scope?.toString().split(' ');
    if ((req.method === 'GET' && !this.scopes.includes('api:read')) ||
      (req.method !== 'GET' && !this.scopes.includes('api:write'))) {
      log.message('Insufficient scope');
      return res.status(403).json({ error: 'Insufficient scope' });
    }

    return next();
  }
}

export default new Auth();