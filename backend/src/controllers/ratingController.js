const { Rating, Store } = require('../models');

// Add a new rating
exports.addRating = async (req, res) => {
  try {
    const { storeId, ratingValue, comment } = req.body;
    const userId = req.user.id;

    if (!storeId || !ratingValue) {
      return res.status(400).json({ message: 'Store ID and rating are required!' });
    }

    const store = await Store.findByPk(storeId);
    if (!store) {
      return res.status(404).json({ message: 'Store not found!' });
    }

    // Add rating
    await Rating.create({
      storeId,
      userId,
      ratingValue,
      comment,
    });

    // Update average rating
    const ratings = await Rating.findAll({ where: { storeId } });
    const avg = ratings.reduce((sum, r) => sum + r.ratingValue, 0) / ratings.length;
    store.averageRating = avg.toFixed(1);
    await store.save();

    res.status(201).json({ message: 'Rating added successfully!', average: avg.toFixed(1) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all ratings for a store
exports.getStoreRatings = async (req, res) => {
  try {
    const { storeId } = req.params;
    const ratings = await Rating.findAll({ where: { storeId } });
    res.json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
