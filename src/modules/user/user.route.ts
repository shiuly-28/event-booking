import express from 'express';

const router = express.Router();

// 1. Get All Users Route
router.get('/', (req, res) => {
  res.send('Get all users route');
});

// 2. Get Single User Route
router.get('/:id', (req, res) => {
  res.send('Get single user route');
});

// 3. Update User Route
router.patch('/:id', (req, res) => {
  res.send('Update user route');
});

// 4. Soft Delete User Route
router.delete('/:id', (req, res) => {
  res.send('Delete user route');
});

// **অবশ্যই export নিশ্চিত করতে হবে**
export const UserRoutes = router;