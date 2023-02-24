import { logEvents } from "./eventLogger.js"

export const errorHandler = (error, req, res, next) => {

    logEvents(`${error.name}, ${error.code}, ${error.message}`, "errLog.log")

}