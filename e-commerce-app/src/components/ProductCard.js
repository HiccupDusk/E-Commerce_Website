import React from 'react';
import { chakra, Box, Flex, useColorModeValue, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function ProductCard({ productProp }) {
  const { name, price, _id, description } = productProp;
  return (
    <Flex
      bg={useColorModeValue('teal.50', 'gray.600')}
      p={50}
      alignItems='center'
      justifyContent='center'
    >
      <Box
        maxW='xs'
        mx='auto'
        bg={useColorModeValue('white', 'gray.800')}
        shadow='lg'
        rounded='lg'
      >
        {/* NAME */}
        <Box px={4} py={2}>
          <chakra.h1
            color={useColorModeValue('gray.800', 'white')}
            fontWeight='bold'
            fontSize='3xl'
            textTransform='uppercase'
          >
            {name}
          </chakra.h1>
          {description}
          <chakra.p
            mt={1}
            fontSize='sm'
            color={useColorModeValue('gray.600', 'gray.400')}
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
          bg='gray.300'
          roundedBottom='lg'
        >
          {/* PRICE */}
          <chakra.h1 color='white' fontWeight='bold' fontSize='lg'>
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
          >
            Add to cart
          </chakra.button>
          {/*  VIEW ITEMS */}
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
            // onClick =
          >
            View Item
          </chakra.button>
        </Flex>
      </Box>
    </Flex>
  );
}
