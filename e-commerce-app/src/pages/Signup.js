// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';

// Assets
import BgSignUp from '../assets/img/background/BgSignUp.png';

// REACT and HOOKS
import React from 'react';
import { useState, useEffect, useContext } from 'react';
// REACT ROUTER DOM
import { Navigate, useNavigate } from 'react-router-dom';
import { Link as ReactRouterLink } from 'react-router-dom';

// ALERTS
import Swal from 'sweetalert2';

// ICONS
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa';

// USERCONTEXT
import UserContext from '../UserContext';

function SignUp() {
  const titleColor = useColorModeValue('teal.300', 'teal.200');
  const textColor = useColorModeValue('gray.700', 'white');
  const bgColor = useColorModeValue('white', 'gray.700');
  const bgIcons = useColorModeValue('teal.200', 'rgba(255, 255, 255, 0.5)');

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  // TOAST
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-center',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  //State hooks to store the values of the input fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  //State to determine whether the button is enabled or not
  const [isActive, setIsActive] = useState(false);

  function registerUser(e) {
    //prevents page redirection via a form submission
    e.preventDefault();

    fetch('http://localhost:4000/api/users/checkEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // true/false

        if (data === true) {
          Swal.fire({
            title: 'Duplicate email found',
            icon: 'error',
            text: 'Kindly provide another email to complete the registration',
          });
        } else {
          fetch('http://localhost:4000/api/users/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              email: email,
              mobileNo: mobileNo,
              password: password1,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data === true) {
                //Clear input fields
                setFirstName('');
                setLastName('');
                setEmail('');
                setMobileNo('');
                setPassword1('');
                setPassword2('');

                Toast.fire({
                  title: 'Registration successful',
                  icon: 'success',
                  text: 'Welcome to Camisetas, Enjoy your Shopping!',
                });

                navigate('/login');
              } else {
                Toast.fire({
                  title: 'Something went wrong!',
                  icon: 'error',
                  text: 'Please try again.',
                });
              }
            });
        }
      });
  }

  useEffect(() => {
    //Validation to enable the submit button when all the input fields are populated and both passwords match
    if (
      firstName !== '' &&
      lastName !== '' &&
      mobileNo.length === 10 &&
      email !== '' &&
      password1 !== '' &&
      password2 !== '' &&
      password1 === password2
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, mobileNo, email, password1, password2]);

  return user.id !== null ? (
    <Navigate to='/shop' />
  ) : (
    <Box position='relative' mb='40px'>
      <Flex
        direction='column'
        alignSelf='center'
        justifySelf='center'
        overflow='hidden'
        position='relative'
      >
        {/*  image bg */}
        <Box
          position='absolute'
          minH={{ base: '70vh', md: '50vh' }}
          w={{ md: 'calc(100vw - 50px)' }}
          borderRadius={{ md: '15px' }}
          left='0'
          right='0'
          bgRepeat='no-repeat'
          overflow='hidden'
          zIndex='-1'
          top='0'
          bgImage={BgSignUp}
          bgSize='cover'
          mx={{ md: 'auto' }}
          mt={{ md: '14px' }}
        ></Box>
        {/* Welcome Text */}
        <Flex
          direction='column'
          textAlign='center'
          justifyContent='center'
          align='center'
          mt='6.5rem'
          mb='30px'
        >
          <Text fontSize='4xl' color='white' fontWeight='bold'>
            Welcome!
          </Text>
          <Text
            fontSize='md'
            color='white'
            fontWeight='normal'
            mt='10px'
            mb='26px'
            w={{ base: '90%', sm: '60%', lg: '40%', xl: '30%' }}
          >
            Register now to enjoy shopping at Camisetas Page!
          </Text>
        </Flex>
        {/* WHOLE FORM */}
        <Flex alignItems='center' justifyContent='center' mb='60px' mt='20px'>
          <Flex
            direction='column'
            w='445px'
            background='transparent'
            borderRadius='15px'
            p='40px'
            mx={{ base: '100px' }}
            bg={bgColor}
            boxShadow='0 20px 27px 0 rgb(0 0 0 / 5%)'
          >
            {/* register with * */}
            <Text
              fontSize='xl'
              color={textColor}
              fontWeight='bold'
              textAlign='center'
              mb='22px'
            >
              Register With
            </Text>
            {/* icons */}
            <HStack spacing='15px' justify='center' mb='22px'>
              <Flex
                justify='center'
                align='center'
                w='75px'
                h='75px'
                borderRadius='15px'
                border='1px solid lightgray'
                cursor='pointer'
                transition='all .25s ease'
                _hover={{ filter: 'brightness(120%)', bg: bgIcons }}
              >
                <Link href='#'>
                  <Icon
                    as={FaFacebook}
                    w='30px'
                    h='30px'
                    _hover={{ filter: 'brightness(120%)' }}
                  />
                </Link>
              </Flex>
              <Flex
                justify='center'
                align='center'
                w='75px'
                h='75px'
                borderRadius='15px'
                border='1px solid lightgray'
                cursor='pointer'
                transition='all .25s ease'
                _hover={{ filter: 'brightness(120%)', bg: bgIcons }}
              >
                <Link href='#'>
                  <Icon
                    as={FaApple}
                    w='30px'
                    h='30px'
                    _hover={{ filter: 'brightness(120%)' }}
                  />
                </Link>
              </Flex>
              <Flex
                justify='center'
                align='center'
                w='75px'
                h='75px'
                borderRadius='15px'
                border='1px solid lightgray'
                cursor='pointer'
                transition='all .25s ease'
                _hover={{ filter: 'brightness(120%)', bg: bgIcons }}
              >
                <Link href='#'>
                  <Icon
                    as={FaGoogle}
                    w='30px'
                    h='30px'
                    _hover={{ filter: 'brightness(120%)' }}
                  />
                </Link>
              </Flex>
            </HStack>
            <Text
              fontSize='lg'
              color='gray.400'
              fontWeight='bold'
              textAlign='center'
              mb='22px'
            >
              or
            </Text>
            {/* FORM CONTROL*/}

            <form onSubmit={(e) => registerUser(e)}>
              <FormControl>
                <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                  First Name
                </FormLabel>
                <Input
                  fontSize='sm'
                  ms='4px'
                  borderRadius='15px'
                  type='text'
                  placeholder='Your first name'
                  mb='24px'
                  size='lg'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                  Last Name
                </FormLabel>
                <Input
                  fontSize='sm'
                  ms='4px'
                  borderRadius='15px'
                  type='text'
                  placeholder='Your full name'
                  mb='24px'
                  size='lg'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                  Email
                </FormLabel>
                <Input
                  fontSize='sm'
                  ms='4px'
                  borderRadius='15px'
                  type='email'
                  placeholder='Your email address'
                  mb='24px'
                  size='lg'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                  Phone Number
                </FormLabel>
                <InputGroup>
                  <InputLeftAddon
                    fontSize='sm'
                    ms='4px'
                    borderRadius='15px'
                    mb='14px'
                    size='lg'
                    children='+63'
                  />
                  <Input
                    fontSize='sm'
                    ms='4px'
                    borderRadius='15px'
                    mb='24px'
                    size='lg'
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    type='tel'
                    placeholder='phone number'
                  />
                </InputGroup>
                <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                  Password
                </FormLabel>
                <Input
                  fontSize='sm'
                  ms='4px'
                  borderRadius='15px'
                  type='password'
                  placeholder='Your password'
                  mb='24px'
                  size='lg'
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                />
                <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                  Confirm Password
                </FormLabel>
                <Input
                  fontSize='sm'
                  ms='4px'
                  borderRadius='15px'
                  type='password'
                  placeholder='Confirm Your password'
                  mb='24px'
                  size='lg'
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
                {/* remember me */}
                <FormControl display='flex' alignItems='center' mb='24px'>
                  <Switch id='remember-login' colorScheme='teal' me='10px' />
                  <FormLabel
                    htmlFor='remember-login'
                    mb='0'
                    fontWeight='normal'
                  >
                    Remember me
                  </FormLabel>
                </FormControl>
                {/* button sign up! */}
                {isActive ? (
                  <Button
                    bgGradient='linear(to-l,pink.300,  teal.400)'
                    type='submit'
                    bg='teal.300'
                    fontSize='10px'
                    color='white'
                    fontWeight='bold'
                    w='100%'
                    h='45'
                    mb='24px'
                    _hover={{
                      bg: 'teal.200',
                    }}
                    _active={{
                      bg: 'teal.400',
                    }}
                  >
                    SIGN UP
                  </Button>
                ) : (
                  <Button
                    bgGradient='linear(to-l,pink.300,  teal.400)'
                    type='submit'
                    bg='teal.300'
                    fontSize='10px'
                    color='white'
                    fontWeight='bold'
                    w='100%'
                    h='45'
                    mb='24px'
                    _hover={{
                      bg: 'teal.200',
                    }}
                    _active={{
                      bg: 'teal.400',
                    }}
                    disabled
                  >
                    SIGN UP
                  </Button>
                )}
              </FormControl>
            </form>
            {/* already have an account sign in */}
            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              maxW='100%'
              mt='0px'
            >
              {/* already have an account sign in */}
              <Text
                bgGradient='linear(to-r, teal.200, pink.300)'
                bgClip='text'
                fontWeight='medium'
              >
                Already have an account?
                <ReactRouterLink to='/login'>
                  <Link
                    color={titleColor}
                    as='span'
                    ms='5px'
                    href='#'
                    fontWeight='bold'
                  >
                    Sign In
                  </Link>
                </ReactRouterLink>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default SignUp;
