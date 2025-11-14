# Attendance-monitoring-web-application---Borealis-team
Attendance monitoring web app project for web technologies course. 

**Overview**

This project implements a web application for monitoring attendance using text or QR access codes.

**Features**

Event organizer (EO) can create an event group
EO can add one or more events to an event group.

Each event has:
Name
Description
Scheduled start time
Duration
Generated access code (text and QR)

Event lifecycle:
Initially CLOSED
Automatically OPEN at scheduled time
Automatically CLOSED after duration
EO can display access codes (text or QR) for participants.
EO can view participant attendance:
Participant ID
Timestamp of check-in
EO can export attendance data for:
A single event (CSV / XLSX)
An event group (CSV / XLSX)

**Participant Features**

Participant can enter access code manually.
Participant can scan access code via QR using the device camera.
Participant confirms presence by submitting the code.
System records timestamp automatically.

**Technologies**
React.js (Single Page App Front-End)
Node.js (REST Back-End)
Database: PostgreSQL/SQLite

Stage 1 
Specifications (this document)
Git repo created
README created
Initial folder structure

Stage 2 
Database schema setup
REST API implemented

Stage 3
React SPA front-end complete
QR scanning & code input
Backend integration
Final demo
