import { Router } from "express";
import { protect, createJWT } from "./modules/auth";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import { body, oneOf } from "express-validator";
import { handleInputErrors, validateProduct } from "./modules/middleware";
import {
  getProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./handlers/product";
import {
  getUpdates,
  getOneUpdate,
  createUpdate,
  updateUpdate,
  deleteUpdate,
} from "./handlers/update";

const router = Router();
const prisma = new PrismaClient();

/**
 * Product
 */
router.get("/product", protect, getProducts);
router.get("/product/:id", protect, getOneProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct,
);
router.post(
  "/product",
  protect,
  body("name").isString(),
  handleInputErrors,
  createProduct,
);
router.delete("/product/:id", protect, deleteProduct);

/** Update **/

router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);
router.put(
  "/update/:id",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("version").optional(),
  updateUpdate,
);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  createUpdate,
);
router.delete("/update/:id", deleteUpdate);

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
