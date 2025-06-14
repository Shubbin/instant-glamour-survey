import express from 'express';
import { login, registerAdmin, deleteAdmin } from '../controllers/admin.controllers.js';
const router = express.Router();
router.post('/login', login);
router.post('/delete', deleteAdmin);
router.post('/register', registerAdmin);
export default router;