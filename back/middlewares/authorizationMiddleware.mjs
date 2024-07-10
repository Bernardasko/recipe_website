import jwt from 'jsonwebtoken';
import { pg_getUserByEmail } from '../models/usersModel.mjs';

// export const protect = async (req, res, next) => {
//   try {
//     let token;
//     const headerToken = req.headers.authorization;
//     if (headerToken && headerToken.startsWith('Bearer')) {
//       token = headerToken.split(' ')[1];
//     }

//     if (!token) {
//       return res.status(401).json({ error: 'Go home, you are not allowed.🛑' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log(decoded);
//     const currentUser = await pg_getUserByEmail(decoded.email);
//     if (!currentUser) {
//       return res
//         .status(401)
//         .json({ message: 'The user belonging to this token does not exsist' });
//     }
//     // put verified token user to req
//     // console.log(currentUser);
//     req.user = currentUser;
//     console.log('protect');
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };

export const isAdmin = (req, res, next) => {
  try {
    let token;
    const headerToken = req.headers.authorization;
    if (headerToken && headerToken.startsWith('Bearer')) {
      token = headerToken.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ error: 'Go home, you are not allowed.🛑' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);
    if (decoded.role !== 'admin') {
      return res.status(401).json({ message: 'Premission denied' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const isUser = (req, res, next) => {
  try {
    let token;
    const headerToken = req.headers.authorization;
    if (headerToken && headerToken.startsWith('Bearer')) {
      token = headerToken.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ error: 'Go home, you are not allowed.🛑' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    if (decoded.role === 'user' || decoded.role === 'admin') {
        next();
    }
    
    res.status(401).json({ message: 'Premission denied' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
