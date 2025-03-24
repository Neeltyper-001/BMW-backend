import dotenv from "dotenv"
import { connectionToDb } from "./db/db.connection.js"
import { app } from "./app.js"

dotenv.config({
    path: "./.env"
})

connectionToDb().then((response)=>{    
    app.listen(process.env.PORT_NUMBER, ()=>{
        console.log(response)
        console.log(`Connection is successful and the server is now online`);
        console.log(`http://localhost:${process.env.PORT_NUMBER || 7000}`)
    })
})
.catch(error => console.log(error))
