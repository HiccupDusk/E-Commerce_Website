import * as React from 'react';
import {
  Container,
  chakra,
  Stack,
  Text,
  Button,
  Box,
  Link,
  VStack,
} from '@chakra-ui/react';

// Here we have used react-icons package for the icons
import { Link as ReactRouterLink } from 'react-router-dom';

const HeroSection = () => {
  return (
    <Container p={{ base: 8, sm: 14 }}>
      <Stack direction='column' spacing={6} alignItems='center'>
        <Box
          py={2}
          px={3}
          bgGradient='linear(to-r, teal.400, pink.300)'
          w='max-content'
          color='white'
          rounded='md'
          fontSize='sm'
        >
          <Stack direction={{ base: 'column', sm: 'row' }}>
            <Text fontWeight='bold'>Ready, Set, Shop! 🛒 </Text>
            <Text>Sign now to start shopping!</Text>
          </Stack>
        </Box>
        <chakra.h1
          fontSize={{ base: '4xl', sm: '5xl' }}
          fontWeight='bold'
          textAlign='center'
          maxW='600px'
          bgGradient='linear(to-l,teal.400, pink.300)'
          bgClip='text'
        >
          Shop accessible Camisteas's products with speed
        </chakra.h1>
        <Text maxW='550px' fontSize='xl' textAlign='center' color='gray.500'>
          Camisetas is an online store that offers shirts, tops and clothes with
          original and personalized design. Our products are hand -made, made to
          last, and made from 100% comfortable materials
        </Text>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          w={{ base: '100%', sm: 'auto' }}
          spacing={5}
        >
          <VStack alignItems='center'>
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
        </Stack>
      </Stack>
    </Container>
  );
};

export default HeroSection;
