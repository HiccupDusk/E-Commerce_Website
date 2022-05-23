// REACT COMPONENT
import React from 'react';
import { useEffect, useState } from 'react';

// CHAKRA COMPNENTS
import {
  chakra,
  Flex,
  Icon,
  useColorModeValue,
  Button,
  useBreakpointValue,
  Stack,
  SimpleGrid,
  ButtonGroup,
  IconButton,
} from '@chakra-ui/react';

// local components
import DashboardCard from '../components/DashboardCard';
export default function Component() {
  const [products, setProducts] = useState();

  useEffect(() => {
    fetch('http://localhost:4000/api/products/all')
      .then((res) => res.json())
      .then((data) => {
        setProducts(
          data.map((products) => {
            return <DashboardCard key={products._id} productProp={products} />;
          })
        );
      });
  }, []);

  const bg = useColorModeValue('white', 'gray.800');
  const bg2 = useColorModeValue('white', 'gray.800');
  const bg3 = useColorModeValue('gray.100', 'gray.700');

  return (
    <Flex
      w='full'
      bg='gray.50'
      // p={30}
      alignItems='center'
      justifyContent='center'
    >
      <Stack
        direction={{ base: 'column' }}
        w='full'
        bg={{ md: bg }}
        shadow='lg'
      >
        {products}
      </Stack>
    </Flex>
  );
}
