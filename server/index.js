const { Socket } = require('socket.io');

var playersPairs = [];
var flag = 0;
const io = require('socket.io')(process.env.PORT || 8000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
})

io.on('connection', socket => {
    socket.on("playerJoined", player => {
        if (flag == 0) {
            p1ID = Socket.Id;
            flag = 1;
        }
        else {
            p2Id = Socket.Id;
            flag = 0;
        }
        if(p1ID == null && p2Id == null)
        {
            playersPairs.push({
                "player1":p1ID,
                "player2":p2Id
            });
        }

    });

    socket.on('selected-cell', selectesNum => {
        console.log("selected number ", selectesNum);
        socket.broadcast.emit('clicked-event', selectesNum);
    });

    socket.on("User-Won", () => {
        socket.broadcast.emit('game-status', "lost");
    });
});