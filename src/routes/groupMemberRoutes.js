import {Router} from 'express';
import { createGroupMembersController, deleteGroupMembersControllers, getAllGroupMembersController, getSingleGroupMembersController } from '../controllers/groupMembers.js';


const groupMemberRouter=Router();

groupMemberRouter.post('/members', createGroupMembersController)

groupMemberRouter.get('/members',  getAllGroupMembersController)

groupMemberRouter.get('/members/single/:GroupID', getSingleGroupMembersController )

// groupMemberRouter.put('/members/update/:GroupMemberID', )

// groupMemberRouter.patch('/members/patch/:GroupMemberID', )

groupMemberRouter.delete('/members/delete/:GroupID', deleteGroupMembersControllers)


export default groupMemberRouter;