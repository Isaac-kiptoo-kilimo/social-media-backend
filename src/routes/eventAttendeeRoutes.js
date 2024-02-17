import {Router} from 'express';
import { createEventAttendeesController, deleteEventAttendeesController, getAllEventAttendeessController, getSingleEventAttendeesController } from '../controllers/EventAttendeeControllers.js';


const eventAttendeeRouter=Router();

eventAttendeeRouter.post('/event/attendee', createEventAttendeesController )

eventAttendeeRouter.get('/event/attendee', getAllEventAttendeessController )

eventAttendeeRouter.get('/event/attendee/:EventID', getSingleEventAttendeesController)

// eventAttendeeRouter.put('/event/attendee/:EventID',)

// eventAttendeeRouter.patch('/events/patch/:EventID',)

eventAttendeeRouter.delete('/event/attendee/delete/:EventID', deleteEventAttendeesController)


export default eventAttendeeRouter;