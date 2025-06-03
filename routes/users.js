import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { createUserValidationSchema } from "../utils/validationSchemas.js";
import { mockUsers } from "../utils/constants.js";

export const userRouter = Router();

userRouter.get('/api/users', (req, res) => {
    console.log(req.session)
    console.log(req.session.id)
    req.sessionStore.get(req.session.id, (err, sessionData) => {
        if(err){
            console.log(err);
            throw err;
        }
        console.log(sessionData)
    })
    res.status(200).send(mockUsers)
})

//POST  
userRouter.post('/api/users/new', checkSchema(createUserValidationSchema), (req, res) => {
    const result = validationResult(req)
    if(!result.isEmpty()) return res.status(400).send({errors: result.array()});

    const data = matchedData(req);
    console.log(data)
    mockUsers.push({id: mockUsers.length + 1, ...data})
    return res.status(201).send(mockUsers)
});

// function findUserIndex (req, res, next) {
//     const {id} = req.params;
//     const parsedId = parseInt(id)

//     if(isNaN(parsedId)) return res.sendStatus(400);

//     const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
//     if(findUserIndex === -1) return res.sendStatus(404);
//     req.findUserIndex = findUserIndex
//     next()
// }
