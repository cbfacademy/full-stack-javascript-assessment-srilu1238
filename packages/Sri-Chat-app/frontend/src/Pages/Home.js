import React, { useEffect } from 'react';
import { Container, Box, Text, Tab, TabList, TabPanel, TabPanels, Tabs, Center } from "@chakra-ui/react";
import Register from '../Components/Authentication/Register';
import Login from '../Components/Authentication/Login';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const Home = () => {
    const history = useHistory();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if (user) history.push("/chats");
    }, [history]);

    return (
        <Container maxW='xl' centerContent >
            <Box d='flex'
                justifyContent='center'
                fontFamily="Roboto"
                p={3}
                bg={"white"}
                w="100%"
                m="40px 0 15px 0"
                borderRadius="1g"
                borderWidth="1px"
            >
                <Text align="center" fontSize="4xl" fontFamily="Roboto" color="#70ccd0" fontStyle="italic
                " marginBottom="10px">Sri-Chat-App</Text>

                <Tabs isFitted variant='enclosed' >
                    <TabList mb='1em' >
                        <Tab >Login</Tab>
                        <Tab backgroundColor='#70ccd0' color='white'>Register</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel >
                            <Login />
                        </TabPanel>
                        <TabPanel >
                            <Register />
                        </TabPanel>
                    </TabPanels>
                </Tabs>

            </Box>
        </Container>
    );
}

export default Home;
