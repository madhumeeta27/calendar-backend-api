# Calendar Backend API

A Node.js backend API for a calendar application with user management, calendar subscriptions, and event handling.

## Features

- User management
- Calendar creation and management
- Event creation and management
- Calendar subscriptions
- RESTful API endpoints

## Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL (configured for MySQL in config)
- Body-parser

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```
PORT=3000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASS=
DB_NAME=database_development
DB_DIALECT=mysql
```

4. Set up the database:
Make sure your database server is running and the database exists.

5. Run the application:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Calendars
- `GET /api/calendars` - Get all calendars
- `POST /api/calendars` - Create a new calendar
- `GET /api/calendars/:id` - Get calendar by ID
- `PUT /api/calendars/:id` - Update calendar
- `DELETE /api/calendars/:id` - Delete calendar

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create a new event
- `GET /api/events/:id` - Get event by ID
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Subscriptions
- `GET /api/subscriptions` - Get all subscriptions
- `POST /api/subscriptions` - Subscribe to a calendar
- `DELETE /api/subscriptions/:id` - Unsubscribe from a calendar

### Event Details
- `GET /api/event-details` - Get all event details
- `POST /api/event-details` - Create event details
- `GET /api/event-details/:id` - Get event details by ID
- `PUT /api/event-details/:id` - Update event details
- `DELETE /api/event-details/:id` - Delete event details

## Database Models

### User
- `id` (Primary Key)
- `name` (String)
- `email` (String, unique)
- `created_at` (Date)

### Calendar
- `id` (Primary Key)
- `name` (String)
- `type` (Enum: 'my', 'holiday', 'event', 'subscribed')
- `created_by` (Foreign Key to User)
- `source` (String, optional)

### Event
- `id` (Primary Key)
- `title` (String)
- `description` (Text)
- `start_time` (Date)
- `end_time` (Date)
- `calendar_id` (Foreign Key to Calendar)
- `user_id` (Foreign Key to User)

### Subscription
- `id` (Primary Key)
- `user_id` (Foreign Key to User)
- `calendar_id` (Foreign Key to Calendar)
- `subscribed_at` (Date)

## Testing

To test the API endpoints, you can use Postman or any REST client.

### Example Subscription Request:
```json
POST /api/subscriptions
Content-Type: application/json

{
  "user_id": 1,
  "calendar_id": 1
}
```

## Seeding Test Data

Run the seeder to create test data:
```bash
node seeders/testData.js
```

This will create:
- 2 test users
- 3 test calendars
- Ready-to-use IDs for testing

## License

ISC 