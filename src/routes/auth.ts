import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares";
import { login } from "../controllers";

export const authRouter = Router();

authRouter.post(
  "/login",
  [
    check("email", "Mail is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  login
);
