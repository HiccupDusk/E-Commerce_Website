//  REACT COMPONENTS AND HOOKS
import React, { useState, useEffect, useContext } from 'react';

// REACT-ROUTER
import { Link as ReactRouterLink } from 'react-router-dom';

// toast
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
  Switch,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  HStack,
} from '@chakra-ui/react';

// Assets
import signInImage from '../assets/img/background/bg1.jpg';

// USERCONTEXT
import UserContext from '../UserContext';

// REACT-DOM
import { Navigate } from 'react-router-dom';

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue('gray.400', 'white');

  //  authentication
  //"useContext" hook is used to deconstruct/unpack the data of the UserContext object.
  const { user, setUser } = useContext(UserContext);

  // State hooks to store the values of the input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State to determine whether submit button is enabled or not
  const [isActive, setIsActive] = useState(true);
  const [show, setShow] = useState(false);

  // TOAST
  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  function authenticate(e) {
    e.preventDefault();
    fetch('https://stark-spire-46613.herokuapp.com/api/users/login', {
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
          Toast.fire({
            title: 'Sign in successfully',
            icon: 'success',
            text: 'Welcome to Camisetas, Enjoy your Stay!',
            background: '#F5F5F5',
          });
        } else {
          Toast.fire({
            title: 'Login Failed',
            icon: 'error',
            text: 'Check your login details and try again!',
            background: '#F5F5F5',
          });
        }
      });

    setEmail('');
    setPassword('');
  }

  const retrieveUserDetails = (token) => {
    fetch('https://stark-spire-46613.herokuapp.com/api/users/details', {
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

  if (user.id !== null && user.isAdmin !== true) {
    return <Navigate to='/shop' />;
  } else if (user.id !== null && user.isAdmin === true) {
    return <Navigate to='/' />;
  } else {
    return (
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
                <Heading
                  bgGradient='linear(to-r, teal.300, pink.400)'
                  bgClip='text'
                  fontSize='32px'
                  mb='10px'
                >
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
                      id='1'
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
                        id='2'
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
                      <Switch
                        id='remember-login'
                        colorScheme='teal'
                        me='10px'
                      />
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
                        bgGradient='linear(to-r, teal.300, pink.400)'
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
                        bgGradient='linear(to-r, teal.200, pink.300)'
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
                  <HStack>
                    <Text color={textColor} fontWeight='medium'>
                      Don't have an account?
                    </Text>
                    <ReactRouterLink to='/signup'>
                      <Text
                        bgGradient='linear(to-r, teal.200, pink.300)'
                        bgClip='text'
                        ms='5px'
                        fontWeight='bold'
                      >
                        Sign Up
                      </Text>
                    </ReactRouterLink>
                  </HStack>
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
}

export default SignIn;
