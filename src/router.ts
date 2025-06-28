import { Router } from "express";
import { protect, createJWT } from "./modules/auth";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import { body, validationResult } from "express-validator";

const router = Router();
const prisma = new PrismaClient();

const validateProduct = [
  body("name").isString().isLength({ min: 3 }),
  body("description").optional().isString().trim(),
  body("price")
    .isFloat({ min: 1 })
    .withMessage("Price must be a positive number"),
];

/** Product **/

router.get("/product", protect, (req, res) => {
  res.json({ message: "message" });
});
router.get("/product/:id", protect, () => {});
router.put("/product/:id", body("name"), (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
    return;
  }
});
router.post("/product", protect, (req, res) => {});
router.delete("/product/:id", protect, () => {});

/** Update Point **/

router.get("/updatepoint", protect, () => {});
router.get("/updatepoint/:id", protect, () => {});
router.put("/updatepoint/:id", protect, () => {});
router.post("/updatepoint", protect, () => {});
router.delete("/updatepoint/:id", protect, () => {});

export default router;
