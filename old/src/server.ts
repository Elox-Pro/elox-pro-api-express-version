import http from "http"
import app from "./app"
import config from "./config"

const port = config.APP_PORT
const server = http.createServer(app)

server.listen(port, () => {
  console.log("Server running on port 1206")
})