const express = require('express')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')

const PORT = process.env.PORT || 8080

require('dotenv').config()  

/* importing Routes that are used  */
const userRoutes = require('./routes/user')

const app = express()
const server = require("http").createServer(app)

app.use(logger('dev'))


const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

/* Config Helmet for security */
app.use(helmet())
app.use(helmet.frameguard())

//configure bodyparser to hande the post requests
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

/* routers initated */
app.get('/',(req,res,next)=>{
	res.send("SERVER IS RUNNING")
})
app.use('/users', userRoutes)

io.on("connection", (socket) => {
	socket.emit("me", socket.id);
	
	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));