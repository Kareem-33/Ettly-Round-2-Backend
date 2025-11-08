import {Router} from 'express';
import { getProfile, login, logout, register } from './user.controller.js';
import { protectRoute } from '../../middlewares/auth.middlewares.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get("/profile", protectRoute, getProfile);

export default router;