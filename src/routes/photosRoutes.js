import {Router} from 'express';
import { createPhotoController, deletePhotoController, getAllPhotosController, getSinglePhotoController, updatePhotoControllers, updatePhotoUrlControllers } from '../controllers/photosControllers.js';

const photoRouter=Router();

photoRouter.post('/photos', createPhotoController)

photoRouter.get('/photos', getAllPhotosController )

photoRouter.get('/photos/single/:PhotoID', getSinglePhotoController)

photoRouter.put('/photos/update/:PhotoID', updatePhotoControllers)

photoRouter.patch('/photos/patch/:PhotoID', updatePhotoUrlControllers)

photoRouter.delete('/photos/delete/:PhotoID', deletePhotoController)


export default photoRouter;