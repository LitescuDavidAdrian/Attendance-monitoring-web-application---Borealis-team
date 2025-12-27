# Attendance Monitoring Backend - Setup Instructions

## Prerequisites

- Node.js (v14 or higher)
- MySQL or MariaDB installed locally
- A database client (HeidiSQL, MySQL Workbench, or command line)

## Installation Steps

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Database Setup

#### Create the Database

Open your MySQL/MariaDB client (HeidiSQL, MySQL Workbench, or command line) and run:

```sql
CREATE DATABASE IF NOT EXISTS attendance_db;
```

#### Configure Database Connection

Create a `.env` file in the `backend` folder:

```
PORT=9000
DB_DIALECT=mysql
DB_DATABASE=attendance_db
DB_USERNAME=root
DB_PASSWORD=your_password_here
DB_HOST=localhost
```

Replace `your_password_here` with your actual MySQL/MariaDB password.

### 3. Start the Backend Server

```bash
npm start
```

You should see:
```
Database created successfully
Event scheduler started - checking every minute
Server running on port 9000
```

### 4. Initialize Database Tables

Open your browser or Postman and make a GET request to:

```
http://localhost:9000/api/create
```

This will create the `Event` and `Attendance` tables in your database.

You should receive a success message.

## Verifying the Setup

### Check Database Tables

In your database client, refresh and verify that `attendance_db` contains two tables:
- `Event`
- `Attendance`

### Test the API

Create a test event using Postman or curl:

```bash
POST http://localhost:9000/api/event
Content-Type: application/json

{
  "name": "Test Event",
  "description": "Testing the API",
  "startTime": "2025-01-20T14:00:00",
  "duration": 60,
  "status": "OPEN"
}
```

The access code will be generated automatically.

## API Endpoints

### Events

- `POST /api/event` - Create a new event
- `GET /api/event` - Get all events
- `GET /api/event/:id` - Get event by ID
- `PUT /api/event/:id` - Update event
- `DELETE /api/event/:id` - Delete event
- `GET /api/event/:id/qrcode` - Get QR code for event
- `GET /api/eventFilter` - Filter events with pagination

### Attendance

- `POST /api/attendance` - Record attendance
- `GET /api/attendance` - Get all attendance records
- `GET /api/attendance/:id` - Get attendance by ID
- `PUT /api/attendance/:id` - Update attendance
- `DELETE /api/attendance/:id` - Delete attendance
- `GET /api/attendanceFilter` - Filter attendance with pagination

## Troubleshooting

### Authentication Error

If you get an authentication plugin error, run this in your MySQL client:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_password';
FLUSH PRIVILEGES;
```

### Database Connection Issues

- Verify MySQL/MariaDB is running
- Check that credentials in `.env` are correct
- Ensure the database exists

### Port Already in Use

If port 9000 is already in use, change the `PORT` value in your `.env` file.

## Notes

- The backend runs on `http://localhost:9000`
- Access codes are automatically generated as 8-character alphanumeric strings
- Event status automatically changes based on scheduled time
