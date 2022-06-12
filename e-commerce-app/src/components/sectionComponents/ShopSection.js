import React from 'react';
import {
  chakra,
  Box,
  useColorModeValue,
  Flex,
  Stack,
  Icon,
} from '@chakra-ui/react';

const KuttyHero = () => {
  const Feature = (props) => (
    <Flex alignItems='center' color={useColorModeValue(null, 'white')}>
      <Icon
        boxSize={4}
        mr={1}
        color='green.600'
        viewBox='0 0 20 20'
        fill='currentColor'
      >
        <path
          fillRule='evenodd'
          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
          clipRule='evenodd'
        ></path>
      </Icon>
      {props.children}
    </Flex>
  );
  return (
    <Box px={4} pt={32} pb={12} mx='auto'>
      <Box
        w={{ base: 'full', md: 11 / 12, xl: 8 / 12 }}
        textAlign={{ base: 'left', md: 'center' }}
        mx='auto'
      >
        <chakra.h1
          mb={3}
          fontSize={{ base: '4xl', md: '5xl' }}
          fontWeight={{ base: 'bold', md: 'extrabold' }}
          color={useColorModeValue('gray.900', 'gray.100')}
          lineHeight='shorter'
          bgGradient='linear(to-r,teal.400, pink.300)'
          bgClip='text'
          as='i'
        >
          Express your own kind of fashion with affordability.
        </chakra.h1>
        <chakra.p
          mb={6}
          fontSize={{ base: 'lg', md: 'xl' }}
          color='gray.500'
          lineHeight='base'
        >
          We’re on a mission to bring transparency to e-commerce. We charge as
          little as possible, and we always show you upfront. No hidden fees. No
          bad exchange rates. No surprises.
        </chakra.p>

        <Stack
          display='flex'
          direction={{ base: 'column', md: 'row' }}
          justifyContent={{ base: 'start', md: 'center' }}
          mb={3}
          spacing={{ base: 2, md: 8 }}
          fontSize='xs'
          color='gray.600'
        >
          <Feature>No credit card required</Feature>
          <Feature>14 days free</Feature>
          <Feature>Cancel anytime</Feature>
        </Stack>
      </Box>
    </Box>
  );
};

export default KuttyHero;
