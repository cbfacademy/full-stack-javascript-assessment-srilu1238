import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import React, { useState } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useHistory } from 'react-router-dom';
import ChatLoading from '../ChatLoading';
import axios from 'axios';
import UserListItem from '../UserComponents/UserListItem';
import { getSender } from '../config/ChatLogic';
//import { Effect } from "react-notification-badge";
//import NotificationBadge from "react-notification-badge/lib/components/NotificationBadge";
const SideDrawer = () => {
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState()

    const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();
    const history = useHistory();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const ENDPOINT = process.env.REACT_APP_API_URL;

    const logoutHandler = () => {                //Logout Functionality
        localStorage.removeItem("userInfo");
        history.push("/");
    };
    const toast = useToast();
    const handleSearch = async () => {         //Search Functionality
        if (!search) {
            toast({
                title: "Please fill in the fields to search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`${ENDPOINT}/api/user?search=${search}`, config)

            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Error!",
                description: "Search results not found",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
            })
        }
    };

    const accessChat = async (userId) => {       //Accessing Chat
        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(`${ENDPOINT}/api/chat`, { userId }, config);

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch (error) {
            toast({
                title: "Error while fetching chat",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });

        }
    };

    return (
        <>
            <Box display="flex"
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                w="100%"
                p="5px 10px 5px 10px"
                borderWidth="5px">
                <Tooltip label="Search Users" hasArrow placement='bottom-end'>
                    <Button variant='ghost' onClick={onOpen}>
                        <i className="fas fa-search"></i>
                        <Text display={{ base: "none", md: "flex" }} px="4">Search User</Text>
                    </Button>
                </Tooltip>
                <Text fontSize="2xl" fontFamily="sans-serif" textColor="Red">
                    Sri Chat App
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            { /* <NotificationBadge
                                count={notification.length}
                                effect={Effect.SCALE}
                             />*/}
                            <span className="e-badge e-badge-danger e-badge-overlap e-badge-notification"
                                color="red"
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "left"
                                }}>{notification.length}</span>
                            <BellIcon fontSize="2xl" m={1} />


                        </MenuButton>
                        <MenuList pl={2}>
                            {!notification.length && "No new Messages"}
                            {notification.map(notify => (
                                <MenuItem key={notify._id} onClick={() => {
                                    setSelectedChat(notify.chat);
                                    setNotification(notification.filter((n) => n !== notify));
                                }}>
                                    {notify.chat.isGroupChat ? `New Message recieved in ${notify.chat.chatName}`
                                        : `New Message from ${getSender(user, notify.chat.users)}`}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} />
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={<ProfileModal user={user} />}>My Profile</MenuItem>
                            {/*
                            <ProfileModal user={user}>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModal>*/}
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>

            <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
                    <DrawerBody>
                        <Box display="flex" pb={2}>
                            <Input
                                placeholder='Search by name or email'
                                mr={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button onClick={handleSearch}
                            >Go</Button>
                        </Box>
                        {loading ? (<ChatLoading />) :
                            (
                                searchResult?.map(user => (
                                    <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => accessChat(user._id)}
                                    />
                                ))
                            )}
                        {loadingChat && <Spinner ml="auto" display="flex" />}
                    </DrawerBody>
                </DrawerContent>

            </Drawer>
        </>
    );
}

export default SideDrawer;

