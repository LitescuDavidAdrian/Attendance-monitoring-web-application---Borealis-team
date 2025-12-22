import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const EventGroup = db.define("EventGroup",
{
    EventGroupId: {
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
    }

});

export default EventGroup;
