import React from 'react';
import {
  chakra,
  Box,
  useColorModeValue,
  Flex,
  Button,
  VStack,
  Text,
  Link,
} from '@chakra-ui/react';

// react-router
import { Link as ReactRouterLink } from 'react-router-dom';

const KuttyHero = () => {
  return (
    <Flex px={4} mt='5rem' p={15} mx='auto'>
      <Box mx='auto' w={{ lg: 8 / 12, xl: 5 / 12 }}>
        <chakra.p
          mb={2}
          fontSize='xs'
          fontWeight='semibold'
          letterSpacing='wide'
          color='gray.400'
          textTransform='uppercase'
        >
          For Customers
        </chakra.p>
        <chakra.h1
          mb={3}
          fontSize={{ base: '3xl', md: '4xl' }}
          fontWeight='bold'
          lineHeight='shorter'
          as='i'
          bgGradient='linear(to-r,pink.300,  teal.400)'
          bgClip='text'
        >
          You are currently not Sign In as a Customer
        </chakra.h1>
        <chakra.p mb={5} color='gray.500' fontSize={{ md: 'lg' }}>
          -"Express your own kind of fashion with affordability."
        </chakra.p>
        <VStack alignItems='start'>
          <Text
            bgGradient='linear(to-r, teal.200, pink.300)'
            bgClip='text'
            fontWeight='medium'
          >
            Already have an account?
            <ReactRouterLink to='/login'>
              <Link
                color='teal.400'
                as='span'
                ms='5px'
                href='#'
                fontWeight='bold'
              >
                Sign In
              </Link>
            </ReactRouterLink>
          </Text>
          <Button
            as='a'
            bgGradient='linear(to-l,pink.300,  teal.400)'
            w={{ base: 'full', sm: 'auto' }}
            size='lg'
            mb={{ base: 2, sm: 0 }}
            cursor='pointer'
          >
            <ReactRouterLink to='/signup'>
              <Text color='white'>Sign up for free</Text>
            </ReactRouterLink>
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default KuttyHero;
