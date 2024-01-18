import React from 'react';
import { ChatState } from '../Context/ChatProvider';
import { Box, IconButton, Text } from '@chakra-ui/react';
import SingleChat from './SingleChat';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender } from './config/ChatLogic';

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
    const { selectedChat } = ChatState();
    return (
        <>

            <Box
                display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
                alignItems="center"
                flexDirection="column"
                p={3}
                bg="white"
                w={{ base: "100%", md: "68%" }}
                borderRadius="lg"
                borderWidth="1px"
            >
                <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            </Box>
        </>
    );
};

export default ChatBox;
