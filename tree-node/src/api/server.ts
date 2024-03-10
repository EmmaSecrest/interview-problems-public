import express from 'express';
import {controller} from './controller';

const app = express();
app.use(express.json()); 
app.post('/path', controller );

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});