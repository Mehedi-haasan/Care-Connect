const DB = require('./models');
const { Server } = require("socket.io");
const Message = DB.message;
const socketUserMap = new Map();
const userSocketMap = new Map();


module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: ['http://localhost:3000', 'http://localhost:3001'],
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('login', (userId) => {
            socketUserMap.set(socket.id, userId);
            userSocketMap.set(userId, socket.id);

            console.log(
                `User ${userId} is now connected with socket ${socket.id}`
            );
        });

        socket.on('logout', () => {
            const userId = socketUserMap.get(socket.id);

            if (userId) {
                userSocketMap.delete(userId);
                socketUserMap.delete(socket.id);

                console.log(`User ${userId} has disconnected`);
            }
        });

        socket.on('create-message', async (data, callback) => {
            const { senderId, receiverId, message } = data;

            try {
                const receiverSocketId = userSocketMap.get(receiverId);

                if (receiverSocketId) {
                    io.to(receiverSocketId).emit('receive-message', {
                        senderId,
                        message
                    });
                }

                callback({
                    status: 'success',
                    message: 'Message sent successfully'
                });
            } catch (error) {
                console.error(error);

                callback({
                    status: 'error',
                    message: 'Could not save message'
                });
            }
        });

        socket.on('disconnect', () => {
            const userId = socketUserMap.get(socket.id);

            if (userId) {
                userSocketMap.delete(userId);
                socketUserMap.delete(socket.id);
            }

            console.log('User disconnected:', socket.id);
        });
    });

    return io;
};