import prisma from "../db";

// Get all the products for the user
export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      Product: true,
    },
  });
  res.json({ data: user.Product });
};

// Get one product for the user
export const getOneProduct = async (req, res) => {
  const product = await prisma.product.findFirst({
    where: {
      id: req.params.id,
      belongsToId: req.user.id,
    },
  });
  res.json({ data: product });
};

// Create a product
export const createProduct = async (req, res) => {
  try {
    const user = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id,
      },
    });
    res.json({ data: user });
  } catch (e) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  const updated = await prisma.product.update({
    where: {
      id: req.params.id,
      belongsToId: req.user.id,
    },
    data: {
      name: req.body.name,
    },
  });
  res.json({ data: updated });
};

// Delete a product
export const deleteProduct = async (req, res) => {
  const deleted = await prisma.product.findUnique({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
  });

  if (!deleted) {
    return res.status(404).json({ error: "Product not found" });
  }

  await prisma.product.delete({
    where: { id: req.params.id },
  });

  res.json({ data: deleted });
};
