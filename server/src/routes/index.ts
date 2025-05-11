import express from 'express';
import { uploadRouter } from './uploadPdf/uploadPdf';

export const rootRouter = express.Router();

rootRouter.use('/upload', uploadRouter);