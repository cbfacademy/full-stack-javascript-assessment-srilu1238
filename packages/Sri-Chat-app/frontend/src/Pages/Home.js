import React from 'react';
import { Container, Box, Text, Tab, TabList, TabPanel, TabPanels, Tabs, Center } from "@chakra-ui/react";
import Register from '../Components/Authentication/Register';
import Login from '../Components/Authentication/Login';
const Home = () => {
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
