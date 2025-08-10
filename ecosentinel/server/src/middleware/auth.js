import jwt from 'jsonwebtoken';

export function signJwt(payload) {
  const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

export function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    const cookieToken = req.cookies && req.cookies.token;
    const jwtToken = token || cookieToken;
    if (!jwtToken) return res.status(401).json({ message: 'Unauthorized' });

    const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
    const decoded = jwt.verify(jwtToken, secret);
    req.user = { id: decoded.id, email: decoded.email, name: decoded.name };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}