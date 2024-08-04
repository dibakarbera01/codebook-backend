// import express from "express";
// import jsonServer from "json-server";
// import auth from "json-server-auth";

// const server = express();
// server.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers', '*')
//     next()
// })

// const router = jsonServer.router('./data/db.json');
// server.use('/api', router);
// server.db = router.db

// const middlewares = jsonServer.defaults()
// const rules = auth.rewriter({
//     products: 444,
//     featured_products: 444,
//     orders: 660,
//     users: 600
// });

// server.use(rules)
// server.use(auth)
// server.use(middlewares)
// server.use(router)

// server.listen(8000);



//deploy code
import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import jsonServer from "json-server";
import auth from "json-server-auth";

// Get __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
const port = 8000;

// Middleware to handle CORS
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

// Serve static files from the 'dist' directory
server.use(express.static(path.join(__dirname, 'dist')));

// JSON Server router setup
const router = jsonServer.router(path.join(__dirname, 'data', 'db.json'));
server.use('/api', router);
server.db = router.db;

// Default middlewares (logger, static, cors, no-cache)
const middlewares = jsonServer.defaults();
server.use(middlewares);

// Authentication rules
const rules = auth.rewriter({
    products: 444,
    featured_products: 444,
    orders: 660,
    users: 600
});

server.use(rules);
server.use(auth);

// Route fallback for the frontend application
server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
