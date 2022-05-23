import React from 'react';
import {
  chakra,
  Box,
  useColorModeValue,
  Flex,
  Badge,
  Input,
  VisuallyHidden,
  SimpleGrid,
  Button,
  InputGroup,
  InputRightElement,
  Image,
} from '@chakra-ui/react';

const KuttyHero = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      spacing={0}
      _after={{
        bg: 'brand.500',
        opacity: 0.25,
        pos: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: -1,
        content: '" "',
      }}
    >
      <Flex
        direction='column'
        alignItems='start'
        justifyContent='center'
        px={{ base: 4, lg: 20 }}
        py={24}
      >
        <chakra.h1
          mb={6}
          fontSize={{ base: '4xl', md: '4xl', lg: '5xl' }}
          fontWeight='bold'
          color={useColorModeValue('brand.600', 'gray.300')}
          lineHeight='shorter'
          bgGradient='linear(to-l,pink.300,  teal.400)'
          bgClip='text'
        >
          Great customer relationships start here.
        </chakra.h1>

        <chakra.p
          pr={{ base: 0, lg: 16 }}
          mb={4}
          fontSize='sm'
          color={useColorModeValue('gra.500', 'gray.400')}
          letterSpacing='wider'
        >
          Get the #1 Product here in Camisetas and start purchasing personalized
          products at every stage of the your journey.
        </chakra.p>
      </Flex>
      <Box>
        <Image
          src='https://images.unsplash.com/photo-1531548731165-c6ae86ff6491?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80'
          alt='3 women looking at a laptop'
          fit='cover'
          w='full'
          h={{ base: 64, md: 'full' }}
          bg='gray.100'
          loading='lazy'
        />
      </Box>
    </SimpleGrid>
  );
};

export default KuttyHero;
