import express from "express"
import http from "http"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"

const app = express()

app.use(
  cors({
    credentials: true,
  })
)

app.use(cookieParser())
app.use(compression())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(1206, () => {
  console.log("Server running on port 1206")
})
