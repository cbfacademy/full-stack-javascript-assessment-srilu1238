import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState();
    const history = useHistory();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        //console.log(userInfo);
        if (!userInfo) {
            // console.log(history);
            history.push('/');
        }

    }, [history]);



    return (<ChatContext.Provider
        value={{ selectedChat, setSelectedChat, user, setUser, chats, setChats }}>
        {children}
    </ChatContext.Provider>);
};
export const ChatState = () => {
    //console.log(ChatContext);
    return useContext(ChatContext);
};

export default ChatProvider;