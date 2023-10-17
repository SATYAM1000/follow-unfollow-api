import express from 'express';
import { createUser, followUser, login, unfollowUser } from '../controller/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const route=express.Router();

route.post('/create', createUser);
route.get('/login', login);
route.post('/follow/:username', verifyToken, followUser);
route.post('/unfollow/:username',verifyToken, unfollowUser);

export default route;