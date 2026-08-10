import express from 'express';
// আপনার auth controller ইমপোর্ট করুন (যদি তৈরি করা থাকে)
// import { AuthController } from './auth.controller';

const router = express.Router();

// 1. User Registration Route
router.post('/register', (req, res) => {
  res.send('Register route');
});

// 2. User Login Route
router.post('/login', (req, res) => {
  res.send('Login route');
});

// **অবশ্যই export default করতে হবে**
export const AuthRoutes = router; // অথবা export default router;