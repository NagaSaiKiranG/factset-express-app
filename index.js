import express from 'express';
import packageController from './src/package/package.controller.js';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json({limit: '1mb'}));
app.use(packageController);

app.listen(PORT, () =>{
  console.log(`server running in ${PORT}`);
});

