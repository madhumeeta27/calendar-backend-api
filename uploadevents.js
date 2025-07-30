const fs = require('fs');
const Papa = require('papaparse');
const { Event } = require('./models'); // Adjust path to your models

async function importCSVToEvents(csvFilePath, userId) {
  try {
    // Read the CSV file
    const csvData = fs.readFileSync(csvFilePath, 'utf8');
    
    // Parse CSV with Papa Parse
    const parsedData = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
      delimiter: ',',
      trimHeader: true
    });

    console.log(`Found ${parsedData.data.length} records to import`);

    // Process each row
    const eventsToCreate = parsedData.data.map(row => {
      // Clean headers by trimming whitespace
      const cleanRow = {};
      Object.keys(row).forEach(key => {
        cleanRow[key.trim()] = row[key];
      });

      return {
        calendar_id: 8,
        user_id: userId,
        type: 'event',
        priority: 'medium',
        heading: cleanRow['Heading']?.trim(),
        description: cleanRow['Description']?.trim(),
        event_date: cleanRow['Due Date']?.trim(),
        event_time: null,
        attachment_urls: ['https://www.oid.ok.gov/wp-content/uploads/2025/02/3-propcklist_2024_filingsmade2025_final_V2.pdf']
      };
    });

    // Validate data before insertion
    const validEvents = eventsToCreate.filter(event => {
      if (!event.heading || !event.event_date) {
        console.warn(`Skipping invalid row: ${JSON.stringify(event)}`);
        return false;
      }
      
      // Validate date format (YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(event.event_date)) {
        console.warn(`Invalid date format for: ${event.heading} - ${event.event_date}`);
        return false;
      }
      
      return true;
    });

    console.log(`${validEvents.length} valid events to insert`);

    // Bulk insert into database
    const createdEvents = await Event.bulkCreate(validEvents, {
      validate: true,
      ignoreDuplicates: false
    });

    console.log(`Successfully created ${createdEvents.length} events`);
    
    // Log summary
    createdEvents.forEach(event => {
      console.log(`Created: ${event.heading} - Due: ${event.event_date}`);
    });

    return createdEvents;

  } catch (error) {
    console.error('Error importing CSV to events:', error);
    throw error;
  }
}

// Usage example
async function main() {
  try {
    const csvFilePath = './event.csv';
    const userId = 1; // Update with the actual user_id you want to assign
    
    await importCSVToEvents(csvFilePath, userId);
    console.log('Import completed successfully');
  } catch (error) {
    console.error('Import failed:', error);
  }
}

// Run the import
main();

module.exports = { importCSVToEvents };