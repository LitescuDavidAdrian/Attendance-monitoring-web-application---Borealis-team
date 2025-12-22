# Attendance Monitoring Web Application - Setup Instructions

## Project Overview
This is a full-stack attendance monitoring web application built with React (frontend) and Node.js/Express (backend) with MySQL database.

## Features Implemented

### Backend Features
- ✅ RESTful API with Express.js
- ✅ MySQL database with Sequelize ORM
- ✅ Event and EventGroup management
- ✅ Automatic event lifecycle (OPEN/CLOSED status based on time)
- ✅ Unique access code generation for each event
- ✅ QR code generation for events
- ✅ Attendance tracking with check-in validation
- ✅ CSV/XLSX export for single events and event groups
- ✅ CORS enabled for frontend communication

### Frontend Features
- ✅ React SPA with React Router
- ✅ Event Organizer dashboard
- ✅ Event creation and management
- ✅ QR code display for events
- ✅ Real-time attendance monitoring
- ✅ Participant check-in interface
- ✅ QR code scanner (using device camera)
- ✅ Manual access code entry
- ✅ CSV/XLSX export buttons
- ✅ Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server (v5.7 or higher)
- npm or yarn package manager
- A modern web browser with camera support (for QR scanning)

## Setup Instructions

### 1. Database Setup

1. Make sure MySQL is running on your machine
2. Update the database credentials in `backend/.env`:

```env
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=AttendanceDB
DB_HOST=localhost
PORT=3000
```

### 2. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create the database (run this endpoint once):
```bash
# Start the server first
npm start

# Then in a browser or Postman, call:
GET http://localhost:3000/api/create
```

This will create the database and all tables with proper relationships.

### 3. Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. The frontend is already configured to connect to `http://localhost:3000/api` (see `frontend/.env`)

### 4. Running the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Server will run on http://localhost:3000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
React app will run on http://localhost:3001 (or 3000 if backend is on different port)

## API Endpoints

### Database
- `GET /api/create` - Create/reset database

### Events
- `GET /api/event` - Get all events
- `GET /api/event/:id` - Get event by ID
- `POST /api/event` - Create new event
- `PUT /api/event/:id` - Update event
- `DELETE /api/event/:id` - Delete event
- `GET /api/event/:id/qrcode` - Get QR code for event
- `GET /api/event/:id/export?format=csv|xlsx` - Export event attendance

### Event Groups
- `GET /api/eventgroup` - Get all event groups
- `GET /api/eventgroup/:id` - Get event group by ID
- `GET /api/eventgroup/:id/events` - Get event group with all events
- `POST /api/eventgroup` - Create new event group
- `PUT /api/eventgroup/:id` - Update event group
- `DELETE /api/eventgroup/:id` - Delete event group
- `GET /api/eventgroup/:id/export?format=csv|xlsx` - Export group attendance

### Attendance
- `GET /api/attendance` - Get all attendance records
- `GET /api/attendance/:id` - Get attendance by ID
- `POST /api/attendance` - Create attendance record
- `PUT /api/attendance/:id` - Update attendance
- `DELETE /api/attendance/:id` - Delete attendance

### Check-in
- `POST /api/checkin` - Participant check-in with access code

**Request Body:**
```json
{
  "accessCode": "ABC12345",
  "StudentName": "John Doe",
  "StudentId": "12345"
}
```

## Usage Guide

### For Event Organizers

1. **Create Event Group** (optional):
   - Go to Event Groups page
   - Click "Create Event Group"
   - Fill in name and description

2. **Create Event**:
   - Go to Organizer Dashboard → Create Event
   - Fill in event details (name, description, start time, duration)
   - Optionally assign to an event group
   - An access code will be automatically generated

3. **Display QR Code**:
   - Go to Events → View event details
   - Display the QR code on a projector/screen
   - Or share the access code manually

4. **Monitor Attendance**:
   - On event detail page, see real-time attendance list
   - List auto-refreshes every 10 seconds
   - Shows student name, ID, and check-in time

5. **Export Data**:
   - On event detail page, click "Export CSV" or "Export XLSX"
   - For event groups, go to Event Groups and export from there

### For Participants

1. **Check In**:
   - Go to "Participant Check-in" page
   - Enter your name and student ID
   - Either:
     - Click "Scan QR Code" and scan the displayed QR code
     - Or manually type the access code
   - Click "Check In"

2. **Validation**:
   - Event must be in OPEN status
   - Cannot check in twice to the same event
   - Access code must be valid

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── entities/          # Sequelize models
│   │   ├── controllers/       # Business logic
│   │   ├── routes/            # API routes
│   │   ├── services/          # Helper services
│   │   └── app.js             # Express app entry
│   ├── .env                   # Environment variables
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/        # Reusable components (QRScanner)
    │   ├── pages/             # Page components
    │   ├── services/          # API service layer
    │   ├── App.js             # Main app with routing
    │   └── App.css            # Global styles
    ├── .env                   # Frontend env variables
    └── package.json
```

## Automatic Event Lifecycle

The backend runs a scheduler that checks every minute:
- Events automatically become **OPEN** at their `startTime`
- Events automatically become **CLOSED** after `startTime + duration`
- No manual intervention needed

## Technologies Used

### Backend
- Node.js with Express
- Sequelize ORM
- MySQL2
- node-cron (scheduler)
- qrcode (QR generation)
- xlsx (Excel export)
- cors

### Frontend
- React 19
- React Router DOM
- Axios
- qrcode.react (QR display)
- html5-qrcode (QR scanner)

## Troubleshooting

### Backend won't start
- Check if MySQL is running
- Verify database credentials in `.env`
- Make sure port 3000 is not in use

### Frontend can't connect to backend
- Verify backend is running on port 3000
- Check CORS is enabled in backend
- Verify `REACT_APP_API_URL` in `frontend/.env`

### QR Scanner not working
- Ensure HTTPS or localhost (camera requires secure context)
- Grant camera permissions in browser
- Try a different browser (Chrome/Firefox recommended)

### Events not auto-opening/closing
- Backend scheduler runs every minute
- Check server logs for scheduler messages
- Verify event `startTime` and `duration` are correct

## Development Notes

- Backend runs on port 3000 by default
- Frontend runs on port 3001 by default (if 3000 is taken)
- Access codes are 8-character alphanumeric strings
- Event status is managed automatically
- Attendance timestamps are auto-generated

## Deployment Considerations

For production deployment:
1. Update `REACT_APP_API_URL` to production backend URL
2. Enable HTTPS for QR scanner to work
3. Configure MySQL for production
4. Set secure environment variables
5. Build React app: `npm run build`
6. Serve React build with a static server or integrate with backend

## License

Educational project for Web Technologies course.
