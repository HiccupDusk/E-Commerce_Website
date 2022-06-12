import React from 'react';
import { useState } from 'react';

// CHAKRA COMPONENT
import {
  chakra,
  Flex,
  Button,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';

// ALERTS
import Swal from 'sweetalert2';

function Ma({ CardItemProp }) {
  // color
  const dataColor = useColorModeValue('white', 'gray.800');

  const bg2 = useColorModeValue('gray.100', 'gray.700');

  // destructing
  const { name, price, _id } = CardItemProp;

  const [count, setCount] = useState(0);

  // toast
  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
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
    // e.preventDefault();
    fetch(
      'https://stark-spire-46613.herokuapp.com/api/products/removeFromCart',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          productId: _id,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged === true) {
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
    <Flex direction={{ base: 'row', md: 'column' }} bg={dataColor} key={_id}>
      <SimpleGrid
        spacingY={3}
        columns={{ base: 1, md: 3 }}
        w={{ base: 120, md: 'full' }}
        textTransform='uppercase'
        bg={bg2}
        color={'gray.500'}
        py={{ base: 1, md: 4 }}
        px={{ base: 2, md: 10 }}
        fontSize='md'
        fontWeight='hairline'
      >
        <span>Name</span>
        <span>Price</span>
        <chakra.span textAlign={{ md: 'right' }}>Actions</chakra.span>
      </SimpleGrid>
      <SimpleGrid
        spacingY={3}
        columns={{ base: 1, md: 3 }}
        w='full'
        py={2}
        px={10}
        fontWeight='hairline'
      >
        <span>{name}</span>
        <chakra.span
          textOverflow='ellipsis'
          overflow='hidden'
          whiteSpace='nowrap'
        >
          ${price}
        </chakra.span>
        <Flex justify={{ md: 'end' }}>
          <Button
            variant='solid'
            colorScheme='red'
            size='sm'
            onClick={removeFromCart}
          >
            Remove From Cart
          </Button>
        </Flex>
      </SimpleGrid>
    </Flex>
  );
}
export default Ma;
