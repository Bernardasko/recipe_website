import jwt from 'jsonwebtoken';
import { pg_getUserByEmail } from '../models/usersModel.mjs';

const openToken = (req) => {
  try {
    let token;
    const headerToken = req.headers.authorization;
    if (headerToken && headerToken.startsWith('Bearer')) {
      token = headerToken.split(' ')[1];
    }
    // console.log(headerToken);
    if (!token) {
      return res.status(401).json({ error: 'Go home, you are not allowed.🛑' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Error while decoding token');
  }
};

export const isAdmin = (req, res, next) => {
  try {
    const decoded = openToken(req);
    if (decoded.role !== 'admin') {
      return res.status(401).json({ message: 'Premission denied' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const isUser = async (req, res, next) => {
  try {
    const decoded = openToken(req);
    if (decoded.role !== 'user' && decoded.role !== 'admin') {
      return res.status(401).json({ message: 'Premission denied' });
    }
    req.user = decoded
    console.log('Decoded role is: ',decoded.role);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
} 
