require('dotenv').config();
const bcrypt = require('bcryptjs');
const { User } = require('./models');
const sequelize = require('./config/db');

const seedAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully for seeding!');

    const existingAdmin = await User.findOne({ where: { role: 'admin' } });
    if (existingAdmin) {
      console.log('Admin already exists!');
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(process.env.SEED_ADMIN_PASS, 10);

    await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      address: 'Head Office',
      password: hashedPassword,
      role: 'admin',
    });

    console.log('Admin user created successfully!');
    console.log('Email: admin@example.com');
    console.log(`Password: ${process.env.SEED_ADMIN_PASS}`);
    process.exit();
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

seedAdmin();
