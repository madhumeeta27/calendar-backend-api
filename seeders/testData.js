const { User, Calendar } = require('../models');

async function seedTestData() {
  try {
    // Create test users
    const user1 = await User.create({
      name: 'John Doe',
      email: 'john@example.com'
    });

    const user2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@example.com'
    });

    console.log('Created users:', user1.id, user2.id);

    // Create test calendars
    const calendar1 = await Calendar.create({
      name: 'Work Calendar',
      type: 'my',
      created_by: user1.id
    });

    const calendar2 = await Calendar.create({
      name: 'Personal Calendar',
      type: 'my',
      created_by: user2.id
    });

    const calendar3 = await Calendar.create({
      name: 'Holiday Calendar',
      type: 'holiday',
      source: 'public'
    });

    console.log('Created calendars:', calendar1.id, calendar2.id, calendar3.id);

    console.log('Test data seeded successfully!');
    console.log('You can now test with:');
    console.log('- user_id: 1 or 2');
    console.log('- calendar_id: 1, 2, or 3');

  } catch (error) {
    console.error('Error seeding test data:', error);
  }
}

// Run the seeder
seedTestData(); 