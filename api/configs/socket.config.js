import { Server } from "socket.io";

export function configSocket(app) {
    const socketIo = new Server({
        cors: {
            origin: "*",
        }
    });


    socketIo.on("connection", (socket) => {
        let clients = [];
        console.log("New client connected" + socket.id);

        socket.on("client-connection", function (data) {
            clients.push({
                socketId: data?.socketId,
                userId: data?.userId,
            });
        });

        socket.on("message", function (data) {
            const receiver = clients.find((client) => client?.userId === data?.userId);

            if (receiver) {
                socketIo.to(receiver?.socketId).emit("message", data);
            }
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected");
            clients = clients.filter((client) => client?.socketId !== socket.id);
        });
    });

    socketIo.listen(8081);
}