import http from 'node:http'

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.write('Hello World');
        res.end();
    }

        if(req.url === '/hello'){
        res.write('Hello World');
        res.end();
    }
})

server.listen(3000);
console.log('Listening to the localhost:3000');