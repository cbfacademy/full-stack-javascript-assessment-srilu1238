const chats = [
    {
        isGroupChat: false,
        users: [
            {
                name: "Guest",
                email: "xx@yahoo.com",
            },
            {
                name: "Sri",
                email: "sri@gmail.com",
            },
        ],
        _id: "617a077e18c25468bc7c4dd4",
        chatName: "Sri",
    },
    {
        isGroupChat: false,
        users: [
            {
                name: "Guest User",
                email: "guest@example.com",
            },
            {
                name: "Rid",
                email: "rid@hotmail.com",
            },
        ],
        _id: "617a077e18c25468b27c4dd4",
        chatName: "User",
    },
    {
        isGroupChat: false,
        users: [
            {
                name: "Anthony",
                email: "anthony@example.com",
            },
            {
                name: "V",
                email: "v32@example.com",
            },
        ],
        _id: "617a077e18c2d468bc7c4dd4",
        chatName: "Vee",
    },
    {
        isGroupChat: true,
        users: [
            {
                name: "Dhruva",
                email: "dhruv@example.com",
            },
            {
                name: "Sri",
                email: "sri@example.com",
            },
            {
                name: "User",
                email: "guest@example.com",
            },
        ],
        _id: "617a518c4081150716472c78",
        chatName: "Friends",
        groupAdmin: {
            name: "Guest User",
            email: "guest@example.com",
        },
    },
    {
        isGroupChat: false,
        users: [
            {
                name: "Jane Doe",
                email: "jane@example.com",
            },
            {
                name: "Piyush",
                email: "piyush@example.com",
            },
        ],
        _id: "617a077e18c25468bc7cfdd4",
        chatName: "Jane Doe",
    },
    {
        isGroupChat: true,
        users: [
            {
                name: "John Doe",
                email: "jon@example.com",
            },
            {
                name: "america",
                email: "america@apple.com",
            },
            {
                name: "User",
                email: "guest@example.com",
            },
        ],
        _id: "617a518c4081150016472c78",
        chatName: "Fun",
        groupAdmin: {
            name: "Guest User",
            email: "guest@example.com",
        },
    },
];

module.exports = { chats };