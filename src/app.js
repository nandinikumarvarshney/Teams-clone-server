const createError = require('http-errors')
const express = require('express')
const path = require('path')
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

app.use(express.static(path.join(__dirname, 'public')))


//view engine set up 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

/* routers initated */
app.get('/',()=>{
	res.send("SERVER IS RUNNING")
})
app.use('/users', userRoutes)

io.on("connection", (socket) => {
	socket.emit("me", socket.id);
	console.log(socket.emit("me", socket.id));
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

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404))
})

 // error handler
app.use((err, req, res, next) => {
    // render the error page
    res.status(err.status || 500)
    res.render('error')
}) 

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
