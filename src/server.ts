import http from 'http';
import { Server } from 'socket.io';

const httpServer = http.createServer((req, res) => {
	// Define the routes
	if (req.method === 'GET' && req.url === '/') {
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end('Server is running ...');
	} else {
		// Handle 404 Not Found
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('404 Not Found');
	}
});

const corsOrigins = [process.env.CLIENT_URL ?? 'http://localhost:5173'];
console.log(`cors origins: `, corsOrigins);

const io = new Server(httpServer, {
	cors: {
		origin: corsOrigins,
		methods: ['GET', 'POST'],
		credentials: true
	}
});

io.on('connection', (socket) => {
	console.log('A client connected');

	socket.on('mouseMove', (data) => {
		console.log('mouseMove', data);
		io.emit('mouseMove', data);
	});

	socket.on('disconnect', (reason) => {
		console.log('A client disconnected. Reason:', reason);
	});
});
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, async () => {
	console.log(`socket.io server is running on port ${PORT}`);
});
