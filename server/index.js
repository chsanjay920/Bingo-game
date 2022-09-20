
const io = require('socket.io')(process.env.PORT || 8000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
})

var players = {};
io.on('connection', socket => {
    socket.on('player-joined', name => {
        socket.broadcast.emit('opponent-player-joined', name);
        console.log("new user", name);
        players[socket.id] = name;
    });

    socket.on('selected-cell', selectesNum => {
        console.log("selected number ", selectesNum);
        socket.broadcast.emit('clicked-event', selectesNum);
    });

    socket.on("User-Won", () => {
        socket.broadcast.emit('game-status', "lost");
    });
})