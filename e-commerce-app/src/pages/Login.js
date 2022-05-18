//  REACT COMPONENTS AND HOOKS
import React, { useState, useEffect, useContext } from 'react';

import Swal from 'sweetalert2';

// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';

// Assets
import signInImage from '../assets/img/background/bg1.jpg';

//
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';

function SignIn() {
  // Chakra color mode
  const titleColor = useColorModeValue('teal.300', 'teal.200');
  const textColor = useColorModeValue('gray.400', 'white');
  // Chakra Toast
  const toast = useToast();
  //  authentication
  //"useContext" hook is used to deconstruct/unpack the data of the UserContext object.
  const { user, setUser } = useContext(UserContext);

  // State hooks to store the values of the input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State to determine whether submit button is enabled or not
  const [isActive, setIsActive] = useState(true);
  const [show, setShow] = useState(false);

  function authenticate(e) {
    e.preventDefault();
    fetch('http://localhost:4000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.accessToken)

        if (typeof data.accessToken !== 'undefined') {
          localStorage.setItem('token', data.accessToken);
          retrieveUserDetails(data.accessToken);
          toast({
            title: 'Login Succesfully.',
            description: 'You have successfully login with your account.',
            status: 'info',
            duration: 5000,
            isClosable: true,
            variant: 'left-accent',
            position: 'top',
          });
        } else {
          toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'info',
            duration: 5000,
            isClosable: true,
            variant: 'left-accent',
            position: 'top',
          });
        }
      });

    setEmail('');
    setPassword('');

    /*
		Syntax:
			localStorage.setItem("propertyName", value)

		*/
    //localStorage.setItem("email", email)

    //Set the global user state to have properties from local storage
    // setUser({
    // 	email: localStorage.getItem('email')
    // })

    //alert(`${email} has been verified. Welcome back!`);
  }

  const retrieveUserDetails = (token) => {
    fetch('http://localhost:4000/api/users/details', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)

        setUser({
          id: data._id,
          isAdmin: data.isAdmin,
        });
      });
  };

  useEffect(() => {
    //Validation to enable the submit button when all the input fields are populated and both passwords match
    if (email !== '' && password !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  return user.id !== null ? (
    <Navigate to='/shop' />
  ) : (
    <>
      <Flex position='relative' mb='40px'>
        <Flex
          h={{ sm: 'initial', md: '75vh', lg: '85vh' }}
          w='100%'
          maxW='1044px'
          mx='auto'
          justifyContent='space-between'
          mb='30px'
          pt={{ sm: '100px', md: '0px' }}
        >
          {/* WELCOME */}
          <Flex
            alignItems='center'
            justifyContent='start'
            style={{ userSelect: 'none' }}
            w={{ base: '100%', md: '50%', lg: '42%' }}
          >
            <Flex
              direction='column'
              w='100%'
              background='transparent'
              p='48px'
              mt={{ md: '150px', lg: '80px' }}
            >
              {/* welcome text */}
              <Heading color={titleColor} fontSize='32px' mb='10px'>
                Welcome Back
              </Heading>
              {/*  enter  text */}
              <Text
                mb='36px'
                ms='4px'
                color={textColor}
                fontWeight='bold'
                fontSize='14px'
              >
                Enter your email and password to sign in
              </Text>
              {/*  end of welcome n enter  text */}
              {/* FORMS */}
              <form onSubmit={(e) => authenticate(e)}>
                <FormControl>
                  {/* email */}
                  <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                    Email
                  </FormLabel>
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    borderRadius='15px'
                    mb='24px'
                    fontSize='sm'
                    type='text'
                    placeholder='Your email adress'
                    size='lg'
                  />
                  {/* end of email */}
                  {/* password */}
                  <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                    Password
                  </FormLabel>
                  <InputGroup>
                    <Input
                      borderRadius='15px'
                      mb='36px'
                      fontSize='sm'
                      type={show ? 'text' : 'password'}
                      placeholder='Your password'
                      size='lg'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem' mt={1}>
                      <Button
                        h='1.75rem'
                        size='sm'
                        onClick={() => setShow(!show)}
                        _hover={{
                          bg: 'teal.200',
                        }}
                      >
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  {/* end of password */}
                  {/* remeber me */}
                  <FormControl display='flex' alignItems='center'>
                    <Switch id='remember-login' colorScheme='teal' me='10px' />
                    <FormLabel
                      htmlFor='remember-login'
                      mb='0'
                      ms='1'
                      fontWeight='normal'
                    >
                      Remember me
                    </FormLabel>
                  </FormControl>
                  {/* end of remember me */}
                  {/* sign in button */}
                  {isActive ? (
                    <Button
                      fontSize='10px'
                      type='submit'
                      bg='teal.300'
                      w='100%'
                      h='45'
                      mb='20px'
                      color='white'
                      mt='20px'
                      _hover={{
                        bg: 'teal.200',
                      }}
                      _active={{
                        bg: 'teal.400',
                      }}
                    >
                      SIGN IN
                    </Button>
                  ) : (
                    <Button
                      fontSize='10px'
                      type='submit'
                      bg='teal.300'
                      w='100%'
                      h='45'
                      mb='20px'
                      color='white'
                      mt='20px'
                      _hover={{
                        bg: 'teal.200',
                      }}
                      _active={{
                        bg: 'teal.400',
                      }}
                      disabled
                    >
                      SIGN IN
                    </Button>
                  )}

                  {/* end of sign in button */}
                </FormControl>
              </form>

              {/* END OF FORMS */}
              {/* dont have an account */}
              <Flex
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                maxW='100%'
                mt='0px'
              >
                <Text color={textColor} fontWeight='medium'>
                  Don't have an account?
                  <Link color={titleColor} as='span' ms='5px' fontWeight='bold'>
                    Sign Up
                  </Link>
                </Text>
              </Flex>
              {/* end of dont have an account */}
            </Flex>
          </Flex>
          {/* image */}
          <Box
            display={{ base: 'none', md: 'block' }}
            overflowX='hidden'
            h='100%'
            w='40vw'
            position='absolute'
            right='0px'
          >
            <Box
              bgImage={signInImage}
              w='100%'
              h='100%'
              bgSize='cover'
              bgPosition='50%'
              position='absolute'
              borderBottomLeftRadius='20px'
            ></Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default SignIn;
