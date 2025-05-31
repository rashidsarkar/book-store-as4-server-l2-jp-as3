import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { USER_ROLE } from '../user/user.const';
import auth from '../../middlewares/auth';
import { OrderValidation } from './order.validation';
import { OrderControllers } from './order.controller';

const router = express.Router();

router.get(
  '/:id',
  auth(USER_ROLE.admin),

  OrderControllers.getAllOrder,
);
router.get(
  '/get-my-order/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  OrderControllers.getAllOrderForMe,
);
router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),

  OrderControllers.createOrder,
);
router.post(
  '/create-order-with-Payment',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(OrderValidation.createOrderValidationSchema),
  OrderControllers.createOrderPayment,
);
router.patch(
  '/update/:id',
  auth(USER_ROLE.admin),
  validateRequest(OrderValidation.updateOrderValidationSchema),
  OrderControllers.updateOrder,
);

export const OrderRoutes = router;
// router.patch(
//   '/:id',
//   auth(USER_ROLE.admin),
//   validateRequest(BookValidation.updateBookValidationSchema),
//   BookControllers.updateBook,
// );
// router.delete('/:id', auth(USER_ROLE.admin), BookControllers.deletedBook);
// router.get('/', BookControllers.getAllBook);
// router.get('/book/:idx', BookControllers.getSingleBook);
