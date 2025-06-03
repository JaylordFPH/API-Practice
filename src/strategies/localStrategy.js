import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsers } from "../../utils/constants.js";

passport.serializeUser((user, done) => {
    console.log(`Inside Serialize User`);
    console.log(user);
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    console.log(`Inside Deserialize User`);
    console.log(`Deserializing User ID: ${id}`)
    try {
        const findUser = mockUsers.find((user) => user.id === id);
        if(!findUser) throw new Error("User not found");
        done(null, findUser)
    } catch (err) {
        done(err, null)
    }
})

export default passport.use(
    new Strategy((username, password, done) => {
        try {
            console.log(`Username: ${username}`)
            console.log(`Password: ${password}`)
            const findUser = mockUsers.find((user) => user.username === username)
            if(!findUser || findUser.password !== password) 
                throw new Error('Invalid Credentials');
            done(null, findUser);
        } catch (err) {
            done(err, null)
        }
    })
)