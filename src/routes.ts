import { Router } from 'express';
import {
  AuthenticatedUser,
  Register,
  Login,
  Logout,
  UpdateInfo
} from './controller/auth.controller';
import { AuthMiddleware } from './middleware/auth.middleware';
import { UpdatePassword } from './controller/auth.controller';
import { Ambassadors } from './controller/user.controller';
import {
  Products,
  CreateProduct,
  GetProduct,
  UpdateProduct,
  DeleteProduct
} from './controller/product.controller';

export const routes = (router: Router) => {
  router.post('/api/admin/register', Register);
  router.post('/api/admin/login', Login);
  router.get('/api/admin/user', AuthMiddleware, AuthenticatedUser);
  router.post('/api/admin/logout', AuthMiddleware, Logout);
  router.put('/api/admin/users/info', AuthMiddleware, UpdateInfo);
  router.put('/api/admin/users/password', AuthMiddleware, UpdatePassword);

  router.get('/api/admin/ambassadors', AuthMiddleware, Ambassadors);
  router.get('/api/admin/products', AuthMiddleware, Products);
  router.post('/api/admin/products', AuthMiddleware, CreateProduct);
  router.get('/api/admin/products/:id', AuthMiddleware, GetProduct);
  router.put('/api/admin/products/:id', AuthMiddleware, UpdateProduct);
  router.delete('/api/admin/products/:id', AuthMiddleware, DeleteProduct);
};
