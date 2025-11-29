import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Attendance = db.define("Attendance", 
{
    AttendanceId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    StudentName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    StudentId: {
        type: Sequelize.STRING,
        allowNull: false
    },

    Timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }

});

export default Attendance;