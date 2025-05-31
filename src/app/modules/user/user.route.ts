import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.const';

const router = express.Router();
router.post(
  '/register',
  validateRequest(UserValidation.registerUserValidationSchema),
  UserControllers.createUser,
);

router.post(
  '/login',
  validateRequest(UserValidation.loginValidationSchema),
  UserControllers.loginUser,
);
router.patch(
  '/change-password',
  auth(USER_ROLE.user, USER_ROLE.admin),

  validateRequest(UserValidation.changePasswordValidationSchema),
  UserControllers.changePassword,
);

router.get(
  '/getSingleUser',
  auth(USER_ROLE.user, USER_ROLE.admin),
  UserControllers.getSingleUsers,
);
router.get('/getAllUsers', auth(USER_ROLE.admin), UserControllers.getAllUsers);
router.patch(
  '/update-user/:email',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.updatedUsers,
);
export const UserRoutes = router;
// todo
