import React, { useEffect, useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import { Box } from '@chakra-ui/react';
import SideDrawer from "../Components/Miscellaneous/SideDrawer";
import MyChats from '../Components/MyChats';
import ChatBox from '../Components/ChatBox';

const Chat = () => {
    const { user } = ChatState();
    const [fetchAgain, setFetchAgain] = useState(false);
    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box display='flex' width='100%' justifyContent='space-between' height='91.5vh' padding='10px'>
                {user && (<MyChats fetchAgain={fetchAgain} />)}
                {user && (<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />)}

            </Box>

        </div>
    );
};

export default Chat;
