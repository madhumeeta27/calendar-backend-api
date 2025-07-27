const { User, Calendar } = require('../models');

async function seedTestData() {
  try {
    console.log('Starting to seed test data...');

    // Check if users already exist
    let user1 = await User.findOne({ where: { email: 'john@example.com' } });
    let user2 = await User.findOne({ where: { email: 'jane@example.com' } });

    // Create users if they don't exist
    if (!user1) {
      user1 = await User.create({
        name: 'John Doe',
        email: 'john@example.com'
      });
      console.log('Created user 1:', user1.id);
    } else {
      console.log('User 1 already exists:', user1.id);
    }

    if (!user2) {
      user2 = await User.create({
        name: 'Jane Smith',
        email: 'jane@example.com'
      });
      console.log('Created user 2:', user2.id);
    } else {
      console.log('User 2 already exists:', user2.id);
    }

    // Check if calendars already exist
    let calendar1 = await Calendar.findOne({ where: { name: 'Work Calendar', created_by: user1.id } });
    let calendar2 = await Calendar.findOne({ where: { name: 'Personal Calendar', created_by: user2.id } });

    // Create user calendars if they don't exist
    if (!calendar1) {
      calendar1 = await Calendar.create({
        name: 'Work Calendar',
        type: 'my',
        created_by: user1.id
      });
      console.log('Created calendar 1:', calendar1.id);
    } else {
      console.log('Calendar 1 already exists:', calendar1.id);
    }

    if (!calendar2) {
      calendar2 = await Calendar.create({
        name: 'Personal Calendar',
        type: 'my',
        created_by: user2.id
      });
      console.log('Created calendar 2:', calendar2.id);
    } else {
      console.log('Calendar 2 already exists:', calendar2.id);
    }

    // Create public calendars (these can be recreated each time)
    const publicCalendarNames = [
      'US Public Holidays',
      'Global Events', 
      'Sports Calendar',
      'Academic Calendar'
    ];

    const publicCalendars = [];
    for (const name of publicCalendarNames) {
      let existingCalendar = await Calendar.findOne({ where: { name, source: 'public' } });
      
      if (!existingCalendar) {
        const calendar = await Calendar.create({
          name,
          type: name.includes('Holiday') || name.includes('Academic') ? 'holiday' : 'event',
          source: 'public',
          created_by: null
        });
        publicCalendars.push(calendar);
        console.log(`Created public calendar: ${name} (ID: ${calendar.id})`);
      } else {
        publicCalendars.push(existingCalendar);
        console.log(`Public calendar already exists: ${name} (ID: ${existingCalendar.id})`);
      }
    }

    console.log('\n=== Test Data Summary ===');
    console.log('Users:');
    console.log(`- User 1 (ID: ${user1.id}): John Doe`);
    console.log(`- User 2 (ID: ${user2.id}): Jane Smith`);
    console.log('\nUser Calendars:');
    console.log(`- Calendar 1 (ID: ${calendar1.id}): Work Calendar (owned by User 1)`);
    console.log(`- Calendar 2 (ID: ${calendar2.id}): Personal Calendar (owned by User 2)`);
    console.log('\nPublic Calendars (available for subscription):');
    publicCalendars.forEach((cal, index) => {
      console.log(`- Calendar ${index + 3} (ID: ${cal.id}): ${cal.name}`);
    });
    
    console.log('\n=== API Testing Guide ===');
    console.log('1. Create default calendars for user: POST /api/calendars/default/1');
    console.log('2. Get My Calendars: GET /api/calendars/my/1');
    console.log('3. Browse available calendars: GET /api/calendars/browse/available?user_id=1');
    console.log('4. Subscribe to calendar: POST /api/subscriptions');
    console.log('   Body: {"user_id": 1, "calendar_id": 3}');
    console.log('5. List subscriptions: GET /api/subscriptions?user_id=1');

  } catch (error) {
    console.error('Error seeding test data:', error);
  }
}

// Run the seeder
seedTestData(); 