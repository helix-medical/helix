// import { NextFunction, Request, Response } from 'express';
// import validate from '../validation/validator';
// import logger from '../tools/logger';
// import sc from '../tools/status-codes';
// import jwt from 'jsonwebtoken';
// import log from '../tools/newLogger';
//
// require('dotenv').config();
//
// const login = (req: Request, res: Response, next: NextFunction) => {
//   const isValid = validate.login(req.body);
//   if (!isValid) {
//     res.status(sc.NOT_ACCEPTABLE).json({ message: 'Invalid request body' });
//     logger.fail(req, res, 'Invalid request body');
//   } else {
//     logger.success(req, res, 'Valid request body');
//     next();
//   }
// };
//
// const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization || (req.headers.Authorization as string);
//   if (!authHeader?.startsWith('Bearer ')) {
//     log.message('No token provided');
//     res.status(sc.UNAUTHORIZED).json({ message: 'No token provided' });
//   }
//   const token = authHeader.split(' ')[1];
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, decoded: any) => {
//     if (err) {
//       log.message('Invalid token');
//       res.status(sc.FORBIDDEN).json({ message: 'Invalid token' });
//     } else {
//       logger.success(req, res, 'Valid token');
//       // req.body.role = decoded.userData.role;
//       next();
//     }
//   });
// };
//
// const verifyRole =
//   (...allowedRoles: number[]) =>
//     (req: Request, res: Response, next: NextFunction) => {
//       if (!req.body?.role) {
//         log.message('No role provided');
//         res.status(sc.UNAUTHORIZED).json({ message: 'No role provided' });
//       }
//       if (!allowedRoles.includes(req.body.role)) {
//         log.message('Unauthorized role');
//         res.status(sc.UNAUTHORIZED).json({ message: 'Unauthorized' });
//       }
//
//       logger.success(req, res, 'Role Authorized');
//       next();
//     };
//
// export default module.exports = {
//   login,
//   verifyToken,
//   verifyRole,
// };
