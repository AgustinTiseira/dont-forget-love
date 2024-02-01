import express from "express"
import mongoose from "mongoose"
import userRoutes from "../routes/users"
import { join } from "path"
import { createReadStream } from "fs"
const app = express()

const PORT = process.env?.PORT ?? 3000

/**
 * inicia tu servicio HTTP (web)
 */

const initServer = (botInstance: any) => {

    const MONGO_DB_URI =
        process.env.MONGO_DB_URI ||
        "";

    const option = {
        maxPoolSize: 50,
        wtimeoutMS: 2500
    };

    mongoose
        .connect(MONGO_DB_URI, option)
        .then(() => {
            console.log("Established connection DB");
        })
        .catch((err) => {
            console.error(err);
        });


    app.listen(PORT, () => {
        console.log(`http://locahost:${PORT} ready!`)
    })

    app.get("/qr", async (_, res) => {
        const PATH_QR = join(process.cwd(), "bot.qr.png")
        const fileSteam = createReadStream(PATH_QR)
        res.writeHead(200, { "Content-Type": "image/png" })
        fileSteam.pipe(res)
    })

    //routes
    app.use(userRoutes)
}

export { initServer }