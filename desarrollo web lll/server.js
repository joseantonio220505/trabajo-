const http = require('http');
const fs = require('fs');
const path = require('path');

function handleRequest(req, res) {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const params = new URLSearchParams(body);
            const nombres = params.getAll('nombre');
            const mensaje = nombres.map(nombre => `Hola, ${nombre}`).join('\n');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(mensaje);
        });
    } else if (req.method === 'GET') {
        if (req.url === '/') {
            const filePath = path.join(__dirname, 'public', 'index.html');
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Error interno del servidor');
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(data);
                }
            });
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Página no encontrada');
        }
    } else {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Método no permitido');
    }
}

const server = http.createServer(handleRequest);

const port = 3000; // Puedes cambiar a 3001 si es necesario
server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
