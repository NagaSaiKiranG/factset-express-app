import express from 'express';
import packageController from '../src/package/package.controller.js';

const app = express();
app.arguments(packageController);

export default app;