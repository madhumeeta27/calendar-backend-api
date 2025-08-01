# Calendar Backend API

A RESTful API for managing calendars, events, and subscriptions built with Node.js, Express, and Sequelize.

## Features

- **User Management**: Create and manage users
- **Calendar Management**: Create different types of calendars (personal, holiday, event, subscribed)
- **Event Management**: Create and manage events with details
- **Subscription System**: Subscribe/unsubscribe to calendars
- **RESTful API**: Clean and intuitive API endpoints

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Sequelize** - ORM for database operations
- **PostgreSQL** - Database (configurable)
- **dotenv** - Environment variable management

## API Endpoints

### Users
- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Calendars
- `POST /api/calendars` - Create a new calendar
- `GET /api/calendars` - Get all calendars
- `GET /api/calendars/:id` - Get calendar by ID
- `PUT /api/calendars/:id` - Update calendar
- `DELETE /api/calendars/:id` - Delete calendar
- `GET /api/calendars/my/:user_id` - Get "My Calendars" (owned + subscribed)
- `GET /api/calendars/browse/available` - Browse public calendars available for subscription
- `POST /api/calendars/default/:user_id` - Create user's default calendars (My Calendar, Events, Holidays)

### Events
- `POST /api/events` - Create a new event
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Event Details
- `POST /api/event-details` - Create event details
- `GET /api/event-details` - Get all event details
- `GET /api/event-details/:id` - Get event details by ID
- `PUT /api/event-details/:id` - Update event details
- `DELETE /api/event-details/:id` - Delete event details

### Subscriptions
- `POST /api/subscriptions` - Subscribe to a calendar
- `GET /api/subscriptions` - Get all subscriptions
- `GET /api/subscriptions?user_id=1` - Get subscriptions by user
- `DELETE /api/subscriptions/:id` - Unsubscribe from a calendar

## Installation

1. Clone the repository:
```bash
git clone https://github.com/madhumeeta27/calendar-backend-api.git
cd calendar-backend-api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
PORT=3000
DB_HOST=localhost
DB_USER=your_username
DB_PASS=your_password
DB_NAME=your_database
DB_DIALECT=postgres
```

4. Set up the database:
```bash
# The database will be automatically created when you run the app
npm start
```

5. Seed test data (optional):
```bash
node seeders/testData.js
```

## Usage

### Start the development server:
```bash
npm run dev
```

### Start the production server:
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## Database Schema

### Users
- `id` (Primary Key)
- `name` (String)
- `email` (String, Unique)
- `created_at` (Date)

### Calendars
- `id` (Primary Key)
- `name` (String)
- `type` (Enum: 'my', 'holiday', 'event', 'subscribed')
- `created_by` (Foreign Key to Users)
- `source` (String, Optional)

### Events
- `id` (Primary Key)
- `title` (String)
- `description` (Text)
- `start_time` (Date)
- `end_time` (Date)
- `calendar_id` (Foreign Key to Calendars)
- `user_id` (Foreign Key to Users)

### Event Details
- `id` (Primary Key)
- `event_id` (Foreign Key to Events)
- `location` (String)
- `attendees` (Text)
- `notes` (Text)

### Subscriptions
- `id` (Primary Key)
- `user_id` (Foreign Key to Users)
- `calendar_id` (Foreign Key to Calendars)
- `subscribed_at` (Date)

## Testing with Postman

After starting the server and seeding test data, you can test the API endpoints using Postman:

### 1. **Create User's Default Calendars:**
   ```
   POST http://localhost:3000/api/calendars/default/1
   ```
   This creates "My Calendar", "Events", and "Holidays" for the user.

### 2. **Get "My Calendars" (owned + subscribed):**
   ```
   GET http://localhost:3000/api/calendars/my/1
   ```
   Returns user's own calendars plus any subscribed calendars.

### 3. **Browse Available Calendars:**
   ```
   GET http://localhost:3000/api/calendars/browse/available?user_id=1
   ```
   Shows all public calendars available for subscription, with subscription status.

### 4. **Subscribe to a Calendar:**
   ```
   POST http://localhost:3000/api/subscriptions
   Content-Type: application/json
   
   {
     "user_id": 1,
     "calendar_id": 3
   }
   ```

### 5. **List Subscriptions:**
   ```
   GET http://localhost:3000/api/subscriptions?user_id=1
   ```

### 6. **Create Custom Calendar:**
   ```
   POST http://localhost:3000/api/calendars
   Content-Type: application/json
   
   {
     "name": "My Custom Calendar",
     "type": "my",
     "created_by": 1
   }
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

Madhu Meeta #   c a l e n d a r - b a c k e n d - a p i 
 
 