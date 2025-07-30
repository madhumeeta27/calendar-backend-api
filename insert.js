const { sequelize, User } = require('./models');

async function insertAndShowUsers() {
  try {
    console.log('DB PASSWORD:', JSON.stringify(process.env.DB_PASSWORD));

    await sequelize.authenticate();
    console.log(' Database connected successfully.');

    
    await sequelize.sync(); 
    console.log(' Tables synced.');

    
    await User.bulkCreate([
      { name: 'Alice Johnson', email: 'alice@example.com' },
      { name: 'Bob Smith', email: 'bob@example.com' },
      { name: 'Charlie Brown', email: 'charlie@example.com' },
      { name: 'Diana Prince', email: 'diana@example.com' },
      { name: 'Ethan Hunt', email: 'ethan@example.com' }
    ], { ignoreDuplicates: true });

    console.log(' Sample users inserted.');

    
    const users = await User.findAll({ raw: true });
    console.table(users);

  } catch (error) {
    console.error(' Error:', error);
  } finally {
    await sequelize.close();
    console.log(' Connection closed.');
  }
}

insertAndShowUsers();
