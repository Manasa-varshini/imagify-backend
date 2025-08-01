// import express from 'express';
// import { registerUser, loginUser } from '../controllers/userController.js';
// import verifyToken from '../middlewares/auth.js';

// const router = express.Router();

// router.post('/register', registerUser);
// router.post('/login', loginUser);


// export default router;
import express from 'express';
import { registerUser, loginUser, forgotPassword } from '../controllers/userController.js';
import verifyToken from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// ✅ Add this route to handle forgot password
router.post('/forgot-password', forgotPassword);

export default router;
