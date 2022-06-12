// REACT COMPONENT
import React from 'react';
import { useEffect, useState } from 'react';

// CHAKRA COMPNENTS
import { Flex, useColorModeValue, Stack } from '@chakra-ui/react';

// local components
import DashboardCard from '../cardComponents/DashboardCard';
export default function Component() {
  const [products, setProducts] = useState();

  useEffect(() => {
    fetch('https://stark-spire-46613.herokuapp.com/api/products/all')
      .then((res) => res.json())
      .then((data) => {
        setProducts(
          data.map((element) => {
            return (
              <DashboardCard
                key={element._id}
                productProp={element}
                setProducts={setProducts}
              />
            );
          })
        );
      });
  });

  const bg = useColorModeValue('white', 'gray.800');
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
