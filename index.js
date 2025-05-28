import http from 'node:http'

const todayDate = new Date();
const timeFormat = () => {
    let hours = todayDate.getHours();
    const minute = todayDate.getMinutes();
    const meridiem = hours < 12 ? 'AM' : 'PM'
    hours = hours % 12 || 12

    return `${hours}:${minute} ${meridiem}`
}

const server = http.createServer((req, res) => {

    if(req.url === '/'){
        res.write('Hello noob');
        res.end();
    } else if(req.url === '/hello'){
        res.write('Hello World');
        res.end();
    } else if(req.url === '/time'){
        res.write(timeFormat());
        res.end();
    } else {
        res.statusCode = 404;
        res.write('Not Found');
        res.end();
    }





})

server.listen(3000);
console.log('Listening to the localhost:3000');