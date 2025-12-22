import mysql from 'mysql2/promise';
import env from 'dotenv';
import Attendance from './Attendance.js';
import Event from './Event.js';
import EventGroup from './EventGroup.js';

env.config();

async function Create_DB(){
let conn;

    try {
        conn = await mysql.createConnection({
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST || 'localhost'
        });

        await conn.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`);
        await conn.end();
        console.log('Database created successfully');
    } catch (err) {
        console.warn('Error creating database:', err.message);
    }
}

function FK_Config(){

    // -------------------------- 1-n EventGroup to Event --------------------------
    EventGroup.hasMany(Event, { as: 'Events', foreignKey: 'EventGroupId' });
    Event.belongsTo(EventGroup, { as: 'eventGroup', foreignKey: 'EventGroupId' });

    // -------------------------- 1-n Event to Attendance --------------------------
    Event.hasMany(Attendance, { as: 'Attendances', foreignKey: 'EventId' });
    Attendance.belongsTo(Event, { as: 'event', foreignKey: 'EventId' });

}

async function DB_Init(){
    await Create_DB();
    FK_Config();
}

export default DB_Init;