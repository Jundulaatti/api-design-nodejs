import prisma from "../db";
import { hashPassword, createJWT, comparePasswords } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
  try {
    // Input validation
    if (!req.body.username || !req.body.password) {
      const error = new Error("Username and password are required") as any;
      error.type = "input";
      return next(error);
    }

    if (req.body.password.length < 6) {
      const error = new Error("Password must be at least 6 characters") as any;
      error.type = "input";
      return next(error);
    }

    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (e) {
    // Handle Prisma errors (like duplicate username)
    if (e.code === "P2002") {
      const error = new Error("Username already exists") as any;
      error.type = "input";
      return next(error);
    }

    // Handle other database errors
    const error = new Error("Failed to create user") as any;
    error.type = "input";
    next(error);
  }
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: "nope" });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
