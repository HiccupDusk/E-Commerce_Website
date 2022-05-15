import React from 'react';
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function ProductCard({ productProp }) {
  const { name, price, _id } = productProp;
  return (
    <Container
      bg={useColorModeValue('#F9FAFB', 'gray.600')}
      p={50}
      alignItems='center'
      justifyContent='center'
    >
      <Flex
        direction='column'
        justifyContent='center'
        alignItems='center'
        w='sm'
        mx='auto'
      >
        {/* background image */}
        <Box
          bg='gray.300'
          h={64}
          w='full'
          rounded='lg'
          shadow='md'
          bgSize='cover'
          bgPos='center'
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1521903062400-b80f2cb8cb9d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80)',
          }}
        ></Box>

        <Box
          w={{ base: 56, md: 64 }}
          bg={useColorModeValue('white', 'gray.800')}
          mt={-10}
          shadow='lg'
          rounded='lg'
          overflow='hidden'
        >
          <chakra.h3
            py={2}
            textAlign='center'
            fontWeight='bold'
            textTransform='uppercase'
            color={useColorModeValue('gray.800', 'white')}
            letterSpacing={1}
          >
            {name}
          </chakra.h3>

          <Flex
            alignItems='center'
            justifyContent='space-between'
            py={2}
            px={3}
            bg={useColorModeValue('gray.200', 'gray.700')}
          >
            <chakra.span
              fontWeight='bold'
              color={useColorModeValue('gray.800', 'gray.200')}
            >
              ₱{price}
            </chakra.span>
            {/* add to cart button */}
            <chakra.button
              bg='gray.800'
              fontSize='xs'
              fontWeight='bold'
              color='white'
              px={2}
              py={1}
              rounded='lg'
              textTransform='uppercase'
              _hover={{
                bg: useColorModeValue('gray.700', 'gray.600'),
              }}
              _focus={{
                bg: useColorModeValue('gray.700', 'gray.600'),
                outline: 'none',
              }}
            >
              Add to cart
            </chakra.button>
            {/* view cart */}
            <chakra.button
              as={Link}
              to={`/product/${_id}`}
              bg='gray.800'
              fontSize='xs'
              fontWeight='bold'
              color='white'
              px={2}
              py={1}
              rounded='lg'
              textTransform='uppercase'
              _hover={{
                bg: useColorModeValue('gray.700', 'gray.600'),
              }}
              _focus={{
                bg: useColorModeValue('gray.700', 'gray.600'),
                outline: 'none',
              }}
            >
              View Item
            </chakra.button>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
}
