import { Router } from "express";
import { protect, createJWT } from "./modules/auth";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import { body, oneOf } from "express-validator";
import { handleInputErrors, validateProduct } from "./modules/middleware";
import { getProducts } from "./handlers/product";

const router = Router();
const prisma = new PrismaClient();

/**
 * Product
 */
router.get("/product", getProducts);
router.get("/product/:id", () => {});
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  (req, res) => {},
);
router.post("/product", body("name").isString(), handleInputErrors, () => {});
router.delete("/product/:id", () => {});

/** Update **/

router.get("/update", protect, () => {});
router.get("/update/:id", protect, () => {});
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("version").optional(),
);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
);
router.delete("/update/:id", protect, () => {});

/** Update Point **/

router.get("/updatepoint", protect, () => {});
router.get("/updatepoint/:id", protect, () => {});
router.put(
  "/updatepoint/:id",
  body("name").isString(),
  body("description").isString(),
  () => {},
);
router.post("/updatepoint", protect, () => {});
router.delete("/updatepoint/:id", protect, () => {});

export default router;
