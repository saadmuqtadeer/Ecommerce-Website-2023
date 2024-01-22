import Express from "express";
import {
    deleteUserController,
  forgotPasswordController,
  getAllOrdersController,
  getAllUsers,
  getOrdersController,
  getUserController,
  loginController,
  orderStatusController,
  registerController,
  testController,
  updateProfileController,
  updateUserController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// router object
const router = Express.Router();

// Regitration Router ||POST
router.post("/register", registerController);

// Login Route || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//get list of all users
router.get("/all-users", requireSignIn, isAdmin, getAllUsers);

//get single user by id
router.get("/user-details/:id", requireSignIn, isAdmin, getUserController);

//delete single user
router.delete("/delete-user/:id", requireSignIn, isAdmin, deleteUserController);

//update user
router.put("/edit-user/:id", requireSignIn, isAdmin, updateUserController);

// test routes
router.get("/test", requireSignIn, isAdmin, testController);

// protected user route auth/dashboard
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected Admin route auth/dashboard
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
