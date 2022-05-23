import React from 'react';
import { useEffect, useState } from 'react';

// CHAKRA COMPONENT
import { chakra, Box, Flex, useColorModeValue, HStack } from '@chakra-ui/react';

import { StarIcon } from '@chakra-ui/icons';

// ALERTS
import Swal from 'sweetalert2';

function Ma({ CardItemProp }) {
  // destructing
  const { name, price, _id, description } = CardItemProp;

  const [count, setCount] = useState(0);

  // toast
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

  //

  // remove from cart function
  function removeFromCart(e) {
    e.preventDefault();
    fetch('http://localhost:4000/api/products/removeFromCart', {
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
        if (data.acknowledged === true) {
          setCount(count + 1);
          Toast.fire({
            title: 'Succesfully Remove From Cart',
            icon: 'success',
            text: 'You have successfully remove an item from your cart',
          });
        } else {
          Toast.fire({
            title: 'There seems to be a problem!',
            icon: 'error',
            text: 'Kindly try again',
          });
        }
      });
  }

  return (
    <Flex
      bg={useColorModeValue('gray.50', 'gray.600')}
      // p=
      // w='full'
      alignItems='center'
      justifyContent='center'
      m='4'
    >
      <Flex
        maxW='md'
        mx='auto'
        bgGradient='linear(to-r, teal.50, pink.50)'
        shadow='lg'
        rounded='lg'
        overflow='hidden'
      >
        <Box
          w={1 / 3}
          display={{ base: 'none', md: 'flex' }}
          bgSize='cover'
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1494726161322-5360d4d0eeae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80')",
          }}
        ></Box>

        <Box w={2 / 3} p={{ base: 4, md: 4 }}>
          <chakra.h1
            fontSize='2xl'
            fontWeight='bold'
            color={useColorModeValue('gray.800', 'gray.600')}
          >
            {name}
          </chakra.h1>
          <chakra.h1
            fontSize='2xl'
            fontWeight='bold'
            color={useColorModeValue('gray.800', 'gray.600')}
          >
            $ {price}
          </chakra.h1>

          <chakra.p
            mt={2}
            fontSize='sm'
            color={useColorModeValue('gray.600', 'gray.400')}
            display={{ base: 'none', md: 'flex' }}
          >
            {description}
          </chakra.p>

          <HStack spacing={1} display='flex' alignItems='center' mt={2}>
            <StarIcon color={useColorModeValue('yellow.700', 'teal.300')} />
            <StarIcon color={useColorModeValue('yellow.700', 'teal.300')} />
            <StarIcon color={useColorModeValue('yellow.700', 'teal.300')} />
            <StarIcon color='gray.500' />
            <StarIcon color='gray.500' />
          </HStack>

          <Flex mt={3} alignItems='center' justifyContent='space-between'>
            <chakra.h1 color='gray.600' fontWeight='bold' fontSize='lg'>
              ${price}
            </chakra.h1>
            <chakra.button
              px={2}
              py={1}
              fontSize='xs'
              color='gray.900'
              fontWeight='bold'
              rounded='lg'
              textTransform='uppercase'
              _hover={{
                bg: 'teal.200',
              }}
              _focus={{
                bg: 'teal.400',
              }}
              bg='red.200'
              onClick={removeFromCart}
            >
              Remove from cart
            </chakra.button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Ma;
