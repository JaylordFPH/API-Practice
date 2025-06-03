import express from 'express'
import dotenv from 'dotenv'
import { userRouter } from '../routes/users.js';
import cookieParser from 'cookie-parser'
import session from 'express-session'
// import { mockUsers } from '../utils/constants.js';
import passport from 'passport'
import "./strategies/localStrategy.js"

dotenv.config() //loads all env content

const app = express();
const PORT = process.env.PORT || 5000   

app.use(logger)
app.use(cookieParser("secret"))
app.use(express.json()); // Ensure JSON parsing
app.use(
    session({
        secret: "Jaylord",
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000 * 60,
        }
    })
)

app.use(passport.initialize());
app.use(passport.session());

app.use(userRouter)

app.get('/',  (req, res) => {
    console.log(req.session)
    console.log(req.session.id)
    req.session.visited = true
    res.cookie('hello', 'world', {maxAge: 60000 * 60 * 24, signed: true})
    
    res.status(200).send({message: "Hi"});
})

app.get('/api/products', (req, res) => {
    console.log(req.cookies)
    res.send([
        { id: 1, name: "Drinks"}, 
        {id: 2, name: "Meat"}
    ])
})

// app.post('/api/auth', (req, res) => {
//     const { body: {username, password} } = req;
//     const findUser = mockUsers.find((user) => user.username === username)

//     if(!findUser || findUser.password !== password) 
//         return res.status(401).send({msg: "BAD CREDENTIALS"});

//     req.session.user = findUser;
//     return res.status(200).send(findUser)
// })  

app.post('/api/auth', passport.authenticate('local'), (req, res) => {
    req.session.user = req.user; // optional but needed if you check req.session.user
    res.status(200).send(req.user);
});

app.post('/api/auth/logout', (req, res) => {
    if(!req.user) return res.sendStatus(401);
    req.logout((err) => {
        if(err) return res.sendStatus(401);
        res.send(200)
    });
});

app.get('/api/auth/status', (req, res) => {
    console.log(`Inside/auth/status endpoint`);
    console.log(req.user)
    console.log(req.session)
    if(req.user) return res.send(req.user);
    return res.sendStatus(401)
    // req.sessionStore.get(req.sessionID, (err, sessionData) => {
    //     console.log(sessionData)
    // })
    // return req.session.user ? res.status(200).send(req.session.user) : res.status(401).send({msg: "NOT AUTHENTICATED"});
})  

app.post('/api/cart', (req, res) => {
    if(!req.session.user) return res.sendStatus(401);
    const {body: item} = req
    const {cart} = req.session

    if(cart) {
        cart.push(item)
    }else {
        req.session.cart = [item]
    }
    console.log(req.session.cart)
    return res.status(201).send(item)
})

app.get('/api/cart', (req, res) => {
    if(!req.session.user) return res.sendStatus(401);
    return res.status(200).send(req.session.cart ?? [])
})

app.listen(PORT, () => {
    console.log(`Listening to localhost:${PORT}`)
})

function logger(req, res, next){
    console.log(`${req.method} - ${req.originalUrl}`)
    next()
}

