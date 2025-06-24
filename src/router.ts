import { Router } from "express";
import { protect, createJWT } from "./modules/auth";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const router = Router();
const prisma = new PrismaClient();

/** User Auth **/
router.post("/signup", async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: hash,
    },
  });

  const token = createJWT(user);
  res.json({ token });
});

router.post("/signin", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  if (!user) {
    res.status(401);
    res.json({ message: "Invalid username or password" });
    return;
  }

  const valid = await bcrypt.compare(req.body.password, user.password);

  if (!valid) {
    res.status(401);
    res.json({ message: "Invalid username or password" });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
});

/** Product **/

router.get("/product", protect, (req, res) => {
  res.json({ message: req.shhhh_secret });
});
router.get("/product/:id", protect, () => {});
router.put("/product/:id", protect, () => {});
router.post("/product", protect, () => {});
router.delete("/product/:id", protect, () => {});

/** Update Point **/

router.get("/updatepoint", protect, () => {});
router.get("/updatepoint/:id", protect, () => {});
router.put("/updatepoint/:id", protect, () => {});
router.post("/updatepoint", protect, () => {});
router.delete("/updatepoint/:id", protect, () => {});

export default router;
