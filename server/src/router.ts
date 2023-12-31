const router = require('express').Router();
import { authMiddleware, ownerCheckMiddleware } from './middlewares';
import {
  create,
  login,
  logout,
  profile,
  getServices,
  getServicesSubCategories,
  createOrder,
  getOrderByUser,
  updateOrderStatus,
  getOrders,
  getAllSubCategories,
  getOrderById,
} from './controllers';
import { upload } from './multer';

//GET
router.get('/me', authMiddleware, profile);
router.get('/logout', authMiddleware, logout);

//GET-Services
router.get('/services', authMiddleware, getServices);
router.get('/services-sub-categories', authMiddleware, getServicesSubCategories);
router.get('/all-sub-categories', authMiddleware, getAllSubCategories);

//Orders
router.get('/orders', authMiddleware, getOrders);
router.get('/order/:id', authMiddleware, getOrderById);
router.get('/user-orders', authMiddleware, getOrderByUser);
router.get('/user-orders-by-service-sub-category', authMiddleware, getOrderByUser);

//POST

//Auth
router.post('/register', create);
router.post('/login', login);

//Order
router.post('/order', authMiddleware, upload.array('files', 40), createOrder);
router.patch('/update-order-status', authMiddleware, ownerCheckMiddleware, updateOrderStatus);

export { router };
