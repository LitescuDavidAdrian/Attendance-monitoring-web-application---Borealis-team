import mysql from 'mysql2/promise';
import env from 'dotenv';
import Attendance from './Attendance.js';
import Event from './Event.js';

env.config();

function Create_DB(){
let conn;

    mysql.createConnection({
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD
    })
    .then((connection) => {
    conn = connection
    return connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`)
    })
    .then(() => {
    return conn.end()
    })
    .catch((err) => {
    console.warn(err.stack)
    })
}

function FK_Config(){

    // -------------------------- 1-n --------------------------
    Event.hasMany(Attendance, { as: 'Attendances', foreignKey: 'EventId' });
    Attendance.belongsTo(Event, { foreignKey: 'EventId' });

}

function DB_Init(){
    Create_DB();
    FK_Config();
}

export default DB_Init;