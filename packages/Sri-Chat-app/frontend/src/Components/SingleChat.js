import React, { useEffect, useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from './config/ChatLogic';
import ProfileModal from './Miscellaneous/ProfileModal';
import axios from 'axios';
import "./Styles/Styles.css";
import ScrollableChat from './ScrollableChat';
import io from "socket.io-client";

const ENDPOINT = process.env.REACT_APP_API_URL//"https://sri-chat-app-1v2h.onrender.com";
var socket, selectedChatCompare;




const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();
    const toast = useToast();
    const { user, selectedChat, setSelectedChat } = ChatState();
    const [socketConnected, setSocketConnected] = useState(false);
    const ENDPOINT = process.env.REACT_APP_API_URL;

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            setLoading(true);
            const { data } = await axios.get(`ENDPOINT/api/message/${selectedChat._id}`,
                config);
            console.log("Single chat ", messages);
            setMessages(data);
            setLoading(false);

            socket.emit('join chat', selectedChat._id);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to send the message",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",

            });

        }
    };

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));
    }, []);

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat]);


    //Sending Messages fuctionality.
    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                setNewMessage("");

                const { data } = await axios.post(
                    "ENDPOINT/api/message",
                    {
                        content: newMessage,
                        chatId: selectedChat._id,
                    },
                    config
                );
                console.log(data);
                socket.emit("new message", data);
                setMessages([...messages, data]);
            } catch (error) {
                toast({
                    title: "Error Occured!",
                    description: "Failed to send the message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });

            }
        }
    };


    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
                //give notification
            }
            else {
                setMessages([...messages, newMessageRecieved])
            }
        });
    });

    //Typing handler is entering message functionality
    const typingHandler = (e) => {
        setNewMessage(e.target.value);

    }

    return (
        <>
            {selectedChat ? (
                <>
                    <Text
                        fontSize={{ base: "28px", md: "30px" }}
                        pb={3}
                        px={2}
                        w="100%"
                        fontFamily="sanserif"
                        display="flex"
                        justifyContent={{ base: "space-between" }}
                        alignItems="center"
                    >
                        <IconButton
                            display={{ base: "flex", md: "none" }}
                            icon={<ArrowBackIcon />}
                            onClick={() => setSelectedChat("")}
                        />
                        {!selectedChat.isGroupChat ? (
                            <>
                                {getSender(user, selectedChat.users)}
                                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                            </>
                        ) : (<>
                            {selectedChat.chatName.toUpperCase()}
                            {/*
                            <UpdateGroupChatModal
                            fetchAgain={fetchAgain}
                            setFetchAgain={setFetchAgain}/>
                        */}
                        </>)}

                    </Text>
                    <Box
                        display="flex"
                        background="#E8E8E8"
                        flexDir="column"
                        justifyContent="flex-end"
                        p={4}
                        width="100%"
                        height="100%"
                        borderRadius="lg"
                        overflowY="hidden"
                    >
                        {/*Messages here */}

                        {loading ? (<Spinner
                            size="xl"
                            width={20}
                            height={20}
                            alignSelf="center"
                            margin="auto" />) :
                            (<div className='messages'>
                                <ScrollableChat messages={messages} />
                            </div>
                            )}
                        <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                            <Input
                                variant="filled"
                                background="#E0E0E0"
                                placeholder='Enter a message..'
                                onChange={typingHandler}
                                value={newMessage}></Input>
                        </FormControl>

                    </Box>
                </>
            ) : (
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                    <Text fontSize="3xl" pb={3} fontFamily="sanserif">
                        Click on a user to start chatting
                    </Text>

                </Box>
            )}
        </>
    );
}

export default SingleChat;
