import { Router } from 'express';
import {
  AuthenticatedUser,
  Register,
  Login,
  Logout
} from './controller/auth.controller';
import { AuthMiddleware } from './middleware/auth.middleware';

export const routes = (router: Router) => {
  router.post('/api/admin/register', Register);
  router.post('/api/admin/login', Login);
  router.get('/api/admin/user', AuthMiddleware, AuthenticatedUser);
  router.post('/api/admin/logout', AuthMiddleware, Logout);
};
