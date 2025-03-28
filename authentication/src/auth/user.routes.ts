import express from "express";
import { validate } from "@src/middleware/validate";
import * as Validation from "./validation";
import * as Handler from "./user.handler";

const router = express.Router();

router.post("/register", validate(Validation.registerSchema), Handler.registerHandler);
router.post("/login", validate(Validation.loginSchema), Handler.loginHandler);
router.post("/verify-token", validate(Validation.verifyTokenSchema), Handler.verifyTokenHandler);
router.post("/verify-admin-token", validate(Validation.verifyAdminTokenSchema), Handler.verifyAdminTokenHandler);

router.post(
  "/v1/register",
  validate(Validation.registerSchema),
  Handler.registerHandlerV1
);


router.post("/v1/login", validate(Validation.loginSchema), Handler.loginHandlerV1);

router.post(
  "/v1/verify-token",
  validate(Validation.verifyTokenSchema),
  Handler.verifyTokenHandlerV1
);
router.post(
  "/v1/verify-admin-token",
  validate(Validation.verifyAdminTokenSchema),
  Handler.verifyAdminTokenHandlerV1
);



export default router;

