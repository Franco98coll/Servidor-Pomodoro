import express from 'express';
import cors from 'cors';




const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }, { origin: 'http://localhost:3000' }, { origin: 'http://app:3000' }));



export default app;
