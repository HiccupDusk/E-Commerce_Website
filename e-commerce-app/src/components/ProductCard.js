import React from 'react';
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

// USERCONTEXT
// import UserContext from '../UserContext';

// ALERTS
import Swal from 'sweetalert2';

export default function ProductCard({ productProp }) {
  const { name, price, _id, description } = productProp;
  // const { user } = useContext(UserContext);

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

  // modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  function addToCart() {
    fetch('http://localhost:4000/api/users/addToCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        productId: _id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === true) {
          Toast.fire({
            title: 'Succesfully Added to Cart',
            icon: 'success',
            text: 'View your added items at the Cart Page',
          });
        } else {
          Toast.fire({
            title: 'Login in or Sign up First',
            icon: 'error',
            text: 'Kindly register first with your account to add the product to cart',
          });
        }
      });
  }

  return (
    <Flex
      bg={useColorModeValue('gray.50', 'transparent')}
      p={25}
      alignItems='center'
      justifyContent='center'
    >
      <Box
        maxW='xs'
        mx='auto'
        // bg={useColorModeValue('WHITE', 'gray.600')}
        bgGradient='linear(to-r,teal.100, pink.100)'
        shadow='lg'
        rounded='lg'
      >
        {/* NAME */}
        <Box px={4} py={2}>
          <chakra.h1
            color={useColorModeValue('gray.800', 'gray.600')}
            fontWeight='bold'
            fontSize='3xl'
            textTransform='uppercase'
          >
            {name}
          </chakra.h1>

          <chakra.p
            mt={1}
            fontSize='sm'
            color={useColorModeValue('gray.600', 'gray.600')}
          >
            {description}
          </chakra.p>
        </Box>
        {/*  IMAGE*/}
        <Image
          h={48}
          w='full'
          fit='cover'
          mt={2}
          src='https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80'
          alt='NIKE AIR'
        />

        <Flex
          alignItems='center'
          justifyContent='space-between'
          px={4}
          py={2}
          bg={useColorModeValue('transparent', 'gray.600')}
          roundedBottom='lg'
        >
          {/* PRICE */}
          <chakra.h1
            color={useColorModeValue('black.50', 'white')}
            fontWeight='bold'
            fontSize='lg'
          >
            ${price}
          </chakra.h1>
          {/* ADD TO CART */}
          <chakra.button
            px={2}
            py={1}
            bg='white'
            fontSize='xs'
            color='gray.900'
            fontWeight='bold'
            rounded='lg'
            textTransform='uppercase'
            _hover={{
              bg: 'gray.200',
            }}
            _focus={{
              bg: 'gray.400',
            }}
            onClick={addToCart}
          >
            Add to cart
          </chakra.button>
          {/*  VIEW ITEMS */}
          <chakra.button
            onClick={onOpen}
            px={2}
            py={1}
            bg='white'
            fontSize='xs'
            color='gray.900'
            fontWeight='bold'
            rounded='lg'
            textTransform='uppercase'
            _hover={{
              bg: 'gray.200',
            }}
            _focus={{
              bg: 'gray.400',
            }}
          >
            View Item
          </chakra.button>
          {/* modal */}
          <Modal isOpen={isOpen} onClose={onClose} size='sm'>
            <ModalOverlay />
            <ModalContent bgGradient='linear(to-r, teal.100, pink.50)'>
              <ModalHeader
                color={useColorModeValue('gray.800', 'white')}
                fontWeight='bold'
                fontSize='3xl'
                textTransform='uppercase'
              >
                {name}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <chakra.h1
                  color={useColorModeValue('black.50', 'white')}
                  fontWeight='bold'
                  fontSize='lg'
                >
                  Price: ${price}
                </chakra.h1>
                <Text> Description: {description}</Text>

                <Image
                  fit=''
                  mt={2}
                  w='full'
                  src='https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80'
                  alt='NIKE AIR'
                />
              </ModalBody>

              <ModalFooter gap='5'>
                <Button
                  colorScheme='red'
                  variant='solid'
                  onClick={onClose}
                  mr={3}
                >
                  Close me!
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      </Box>
    </Flex>
  );
}
