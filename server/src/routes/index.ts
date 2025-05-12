import express from 'express';
import { uploadRouter } from './uploadPdf/uploadRoute';
import { chatRouter } from './chat/chatRoute';

export const rootRouter = express.Router();

rootRouter.use('/upload', uploadRouter);
rootRouter.use('/chat', chatRouter);