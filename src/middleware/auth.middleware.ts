import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { verify } from 'jsonwebtoken';
import { User } from '../entity/user.entity';

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const jwt = req.cookies['jwt'];
    const payload: any = verify(jwt, process.env.SECRET_KEY);
    if (!payload) {
      return res.status(401).send({
        message: 'unauthenticated'
      });
    }
    req['user'] = await getRepository(User).findOne(payload.id);
    next();
  } catch (e) {
    return res.status(401).send({
      message: 'unauthenticated'
    });
  }
};
