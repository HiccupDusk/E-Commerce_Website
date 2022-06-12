import React from 'react';
import {
  Flex,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Textarea,
  FormLabel,
  Box,
  Stack,
  Input,
} from '@chakra-ui/react';

// toast
import Swal from 'sweetalert2';

// Chakra Components
import { useDisclosure } from '@chakra-ui/react';

// HOOKS
import { useState, useEffect } from 'react';

const CreateNewProduct = () => {
  // TOAST
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

  const { isOpen, onOpen, onClose } = useDisclosure();

  //State hooks to store the values of the input fields
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  // CREATE A PRODUCT
  function createProduct(e) {
    e.preventDefault();
    fetch(
      'https://stark-spire-46613.herokuapp.com/api/products/createProduct',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name: name,
          price: price,
          description: description,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data === true) {
          //Clear input fields
          setName('');
          setPrice('');
          setDescription('');
          onClose();
          Toast.fire({
            title: 'Product Development is a Success',
            icon: 'success',
            text: 'You have Created a Product',
          });
        } else {
          Toast.fire({
            title: 'Something went wrong!',
            icon: 'error',
            text: 'Please try again.',
          });
        }
      });
  }

  //State to determine whether the button is enabled or not
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    //Validation to enable the submit button when all the input fields are populated and both passwords match
    if (name !== '' && price !== '' && description !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [name, price, description]);

  return (
    <>
      {/* CREATE PRODUCT BUTTON */}
      <Flex justifyContent='center' my='10'>
        <Button
          leftIcon={'+'}
          colorScheme='teal'
          onClick={onOpen}
          justifyContent='center'
        >
          Create New Product
        </Button>
      </Flex>
      {/* MODAL */}
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Create New Product
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px'>
              {/* FORMS */}
              <form onSubmit={(e) => createProduct(e)}>
                <Box>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Enter A Product Name'
                  />
                </Box>
                <Box>
                  <FormLabel>Price</FormLabel>
                  <Input
                    type='number'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder='Enter A Product`s Price'
                  />
                </Box>
                <Box>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Box>
                <Box my='5'>
                  {isActive ? (
                    <>
                      <Button
                        colorScheme='blue'
                        type='submit'
                        bgGradient='linear(to-l,pink.300,  teal.400)'
                      >
                        Submit
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        colorScheme='blue'
                        type='submit'
                        disabled
                        bgGradient='linear(to-l,pink.300,  teal.400)'
                      >
                        Submit
                      </Button>
                    </>
                  )}
                </Box>
              </form>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateNewProduct;
