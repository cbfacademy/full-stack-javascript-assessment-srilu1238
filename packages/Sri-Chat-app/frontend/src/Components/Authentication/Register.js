import { Button, FormControl, FormHelperText, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const Register = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();
    const handleClick = () => setShow(!show);
    const ENDPOINT = process.env.REACT_APP_API_URL;

    const postDetails = (pics) => {      //Pic uploading
        setLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please Select an image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "sri-chat-app") //sri-chat-app is the name given in cloudinary for image upload
            data.append("cloud_name", "sri-chat");
            fetch("https://api.cloudinary.com/v1_1/sri-chat/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) =>
                    res.json()
                )

                .then((data) => {
                    setPic(data.url.toString());
                    setLoading(false);
                    console.log(data.url.toString());
                }
                )
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            toast({
                title: "Please select an Image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
    };

    //Registration Submit Handler functionality

    const submitHandler = async () => {
        setLoading(true);
        if (!name || !email || !password || !confirmpassword) {
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
        if (password !== confirmpassword) {
            toast({
                title: "Passwords do not match",
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
            const { data } = await axios.post(`${ENDPOINT}/api/user`, { name, email, password, pic }, config
            );
            toast({
                title: "Succefully registered",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
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
        <FormControl id='full-name' isRequired>
            <FormLabel>FullName</FormLabel>
            <Input placeholder='FullName'
                onChange={(e) => setName(e.target.value)} />
        </FormControl>

        <FormControl id='e_mail' isRequired>
            <FormLabel htmlFor='emailid' >Email ID</FormLabel>

            <Input id='emailid' placeholder='Email' autoComplete="off" type='email'
                onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>

            <InputGroup id='pwd'>
                <Input
                    type={show ? "text" : "password"}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)} />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl id='confirmpassword' isRequired>
            <FormLabel>Confirm Password</FormLabel>

            <InputGroup size="md" id='cpwd'>
                <Input
                    type={show ? "text" : "password"}
                    placeholder='Confirm Password'
                    onChange={(e) => setConfirmPassword(e.target.value)} />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl >
            <FormLabel htmlFor='input_pic'>Upload you Picture</FormLabel>
            <Input id='input_pic'
                name='input_pic'
                type='file'
                p={1.5}
                accept='image/*'
                onChange={(e) => postDetails(e.target.files[0])}
            />
        </FormControl>

        <Button id='register_button'
            colorScheme='blue'
            width='50%'
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            isLoading={loading}

        >Register</Button>

    </VStack>)
}

export default Register;
