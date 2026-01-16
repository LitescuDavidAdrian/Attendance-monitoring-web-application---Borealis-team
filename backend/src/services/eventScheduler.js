import cron from 'node-cron';
import Event from '../entities/Event.js';
import { Op } from 'sequelize';

// Check and update event statuses every 10 seconds
function startEventScheduler() {
    cron.schedule('*/10 * * * * *', async () => {
        try {
            const now = new Date();

            // Find events that should be OPEN (startTime <= now AND endTime >= now AND status = CLOSED)
            const eventsToOpen = await Event.findAll({
                where: {
                    startTime: {
                        [Op.lte]: now
                    },
                    status: 'CLOSED'
                }
            });

            for (const event of eventsToOpen) {
                const endTime = new Date(event.startTime);
                endTime.setMinutes(endTime.getMinutes() + event.duration);

                // Only open if we're still within the event duration
                if (now < endTime) {
                    await event.update({ status: 'OPEN' });
                    console.log(`Event ${event.EventId} (${event.name}) opened at ${now}`);
                }
            }

            // Find events that should be CLOSED (endTime < now AND status = OPEN)
            const eventsToClose = await Event.findAll({
                where: {
                    status: 'OPEN'
                }
            });

            for (const event of eventsToClose) {
                const endTime = new Date(event.startTime);
                endTime.setMinutes(endTime.getMinutes() + event.duration);

                if (now >= endTime) {
                    await event.update({ status: 'CLOSED' });
                    console.log(`Event ${event.EventId} (${event.name}) closed at ${now}`);
                }
            }

        } catch (error) {
            console.error('Error in event scheduler:', error);
        }
    });

    console.log('Event scheduler started - checking every 10 seconds');
}

export { startEventScheduler };
