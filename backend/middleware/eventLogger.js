import fs from "fs"
import fsPromises from "fs/promises"
import { v4 as uuid } from "uuid"
import { format } from "date-fns"
import path from "path"
const __dirname = path.resolve()

export const logEvents = async (message, filename) => {
    const logDate = format(new Date(), "ddMMyy\thh:mm:ss")
    const logItem = `${logDate}\t${uuid()}\t${message}\n`


    try {
        if (!fs.existsSync(path.join(__dirname, "logs"))) {
            await fsPromises.mkdir(path.join(__dirname, "logs"))
        }


        await fsPromises.appendFile(path.join(__dirname, "logs", filename), logItem)
    } catch (error) {
        console.error(error)
    }



}

export const logger = async (req, res, next) => {
    logEvents(`${req.method}, ${req.baseUrl}, ${req.path}, ${req.originalUrl}`, "reqLog.log")
    next()
}