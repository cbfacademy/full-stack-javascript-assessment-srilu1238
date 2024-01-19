import { Button, FormControl, FormHelperText, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ChatState } from '../../Context/ChatProvider';

const Login = () => {
    const [show, setShow] = useState(false);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState();
    const toast = useToast();
    const history = useHistory();
    const handleClick = () => setShow(!show);
    const { setUser } = ChatState();

    //Login Submit functionality
    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please enter the fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post("/api/user/login", { email, password }, config
            );
            toast({
                title: "Login successfull",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));

            setLoading(false);
            history.push("/chats");

        } catch (error) {
            toast({
                title: "Error Error!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };
    return (<VStack spacing='5px'  >


        <FormControl id='email' isRequired>
            <FormLabel autoComplete='off'>Email</FormLabel>

            <Input type='email' autoComplete='off' placeholder='Email' value={email}
                onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>

            <InputGroup >
                <Input id='l_pwd'
                    type={show ? "text" : "password"}
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>



        <Button
            colorScheme='blue'
            width='50%'
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            isLoading={loading}

        >Login</Button>


        <Button
            colorScheme='red'
            width='50%'
            style={{ marginTop: 15 }}
            onClick={() => {
                setEmail("guestuser@example.com");
                setPassword("123456");
            }}

        >Guest User login</Button>

    </VStack>);

}

export default Login;
