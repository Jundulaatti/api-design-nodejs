import prisma from "../db";

export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  res.json({ data: updates });
};

export const getOneUpdate = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: update });
};

export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!product) {
    // does not belong to user
    return res.json({ message: "nope" });
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: { connect: { id: product.id } },
    },
  });

  res.json({ data: update });
};

export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);
  if (!match) {
    return res.json({ message: "nope" });
  }

  const updated = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });
  res.json({ data: updated });
};

export const deleteUpdate = async (req, res) => {
  try {
    // More efficient: directly check if the update belongs to user's products
    const update = await prisma.update.findFirst({
      where: {
        id: req.params.id,
        product: {
          belongsToId: req.user.id,
        },
      },
      include: {
        product: true,
      },
    });

    if (!update) {
      return res.status(404).json({
        message: "Update not found or you don't have permission to delete it",
      });
    }

    const deleted = await prisma.update.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({ data: deleted });
  } catch (error) {
    console.error("Error deleting update:", error);
    res.status(500).json({
      message: "Failed to delete update",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
