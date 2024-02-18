import {Router} from 'express';
import { createPostController, deletePostController, getAllPostsController, getAllUserPostsController, getSingleSingleController, updateContentControllers, updatePostControllers } from '../controllers/postsControllers.js';

const postRouter=Router();

postRouter.post('/posts',createPostController )

postRouter.get('/posts', getAllPostsController )
postRouter.get('/user/posts/:UserID', getAllUserPostsController )


postRouter.get('/posts/single/:PostID', getSingleSingleController)

postRouter.put('/posts/update/:UserID/:PostID',updatePostControllers)

postRouter.patch('/posts/patch/:PostID',updateContentControllers)

postRouter.delete('/posts/delete/:PostID', deletePostController)


export default postRouter;