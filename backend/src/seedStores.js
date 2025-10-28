require('dotenv').config();
const sequelize = require('./config/db');
const Store = require('./models/Store');

const seedStores = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');

    await Store.sync();

    const stores = [
      { name: 'DailyMart', email: 'contact@dailymart.com', address: 'Mumbai, India' },
      { name: 'GadgetHub', email: 'info@gadgethub.com', address: 'Pune, India' },
      { name: 'SmartWorld Electronics', email: 'sales@smartworld.com', address: 'Bangalore, India' },
      { name: 'HomeEssentials', email: 'support@homeessentials.com', address: 'Delhi, India' },
      { name: 'UrbanStyle Fashion', email: 'contact@urbanstyle.com', address: 'Hyderabad, India' },
    ];

    for (const store of stores) {
      // Check if this store already exists
      const existing = await Store.findOne({ where: { name: store.name } });
      if (!existing) {
        await Store.create(store);
        console.log(`Added: ${store.name}`);
      } else {
        console.log(`Skipped (already exists): ${store.name}`);
      }
    }

    console.log('Store seeding completed!');
    process.exit();
  } catch (error) {
    console.error('Error adding stores:', error);
    process.exit(1);
  }
};

seedStores();
