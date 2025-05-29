import express from 'express';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = 3000;

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: { error: 'Too many requests, please try again later.' }
});

app.use('/api', limiter);

app.get('/api', (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).json({ error: 'Missing URL parameter' });
    }
    
  res.json({ message: 'Hello from the API! ' + url });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 