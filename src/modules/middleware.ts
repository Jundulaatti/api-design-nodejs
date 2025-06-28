import { body, validationResult } from "express-validator";

export const handleInputErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
    return;
  } else {
    next();
  }
};

export const validateProduct = [
  body("name").isString().isLength({ min: 3 }),
  body("description").optional().isString().trim(),
  body("price")
    .isFloat({ min: 1 })
    .withMessage("Price must be a positive number"),
];
