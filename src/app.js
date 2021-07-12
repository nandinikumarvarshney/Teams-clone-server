/* Imported libraries to be used
 */
const express = require('express')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')

//Imported .env File, used for Dev deployment
require('dotenv').config()  

//Port definition
const PORT = process.env.PORT || 8080

/* importing Routes that are used  */
const userRoutes = require('./routes/user')

//Initialize express class
const app = express()

//Created the server using http
const server = require("http").createServer(app)

//used for logging dev environment
app.use(logger('dev'))

//define socket.io for the server
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

//used cors 
app.use(cors())
//used express.json
app.use(express.json())
//set express.urlencoded to false
app.use(express.urlencoded({ extended: false }))
//set cookies
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
app.get('/',(req,res)=>{
	res.send("SERVER IS RUNNING")
})
app.use('/users', userRoutes)

//connected to the socket
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

//listening to the server
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));