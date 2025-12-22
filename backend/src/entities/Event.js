import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Event = db.define("Event", 
{
    EventId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },

    startTime: {
        type: Sequelize.DATE,
        allowNull: false
    },

    duration: {
        type: Sequelize.INTEGER,     
        allowNull: false,
        validate: {
            min: 1
        }
    },

    accessCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,                
        validate: {
            notEmpty: true
        }
    },

    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "CLOSED",
        validate: {
            isIn: [["OPEN", "CLOSED"]]
        }
    }

});

export default Event;