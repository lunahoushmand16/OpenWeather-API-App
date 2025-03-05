import dotenv from 'dotenv';
import express from 'express';
import path from 'path';

dotenv.config();

// Import routes
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// // TODO: Serve static files of entire client dist folder
// Use `process.cwd()` to correctly find `client/dist`
const distPath = path.join(process.cwd(), '../client/dist');
console.log('Serving static files from:', distPath);

// TODO: Implement middleware for parsing JSON and urlencoded form data
// static frontend files
app.use(express.static(distPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: Implement middleware to connect the APIroutes
app.use('/', routes);

// Serve `index.html` correctly
app.get('*', (_, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

// Start the server on the port
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
