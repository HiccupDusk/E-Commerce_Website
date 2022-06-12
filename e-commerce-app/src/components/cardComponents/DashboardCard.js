import React, { useState, useEffect } from 'react';

// CHAKRA
import {
  HStack,
  chakra,
  Flex,
  Icon,
  useColorModeValue,
  Button,
  Stack,
  SimpleGrid,
  ButtonGroup,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Textarea,
  FormLabel,
  Input,
} from '@chakra-ui/react';

// ICONS
import { AiFillEdit, AiTwotoneLock } from 'react-icons/ai';
import { BsBoxArrowUpRight, BsFillTrashFill } from 'react-icons/bs';

// ALERTS
import Swal from 'sweetalert2';

//
const DashboardCard = ({ productProp }) => {
  // destructuring
  const { name, price, _id, description, createdOn, isActive } = productProp;

  // UseState
  const [count, setCount] = useState(0);
  // background
  const bg2 = useColorModeValue('white', 'gray.800');
  const bg3 = useColorModeValue('gray.100', 'gray.700');

  // modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
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

  // archiveProduct
  function archiveProduct() {
    fetch(
      `https://stark-spire-46613.herokuapp.com/api/products/archive/${_id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data === true) {
          Toast.fire({
            title: 'Product Archived',
            icon: 'success',
            text: 'You have succesfully archived a product',
          });
        } else {
          Toast.fire({
            title: 'Error on Archiving a Product',
            icon: 'error',
            text: 'Kindly Try Again',
          });
        }
      });
  }

  // archiveProduct
  function unarchiveProduct() {
    fetch(
      `https://stark-spire-46613.herokuapp.com/api/products/unarchiveProduct/${_id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data === true) {
          Toast.fire({
            title: 'Product Archived',
            icon: 'success',
            text: 'You have succesfully archived a product',
          });
        } else {
          Toast.fire({
            title: 'Error on Archiving a Product',
            icon: 'error',
            text: 'Kindly Try Again',
          });
        }
      });
  }

  // delete a product
  const deleteProduct = () => {
    fetch(
      `https://stark-spire-46613.herokuapp.com/api/products/deleteProduct/${_id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data === true) {
          Toast.fire({
            title: 'Product Delete',
            icon: 'success',
            text: 'You have succesfully deleted a product',
          });
        } else {
          Toast.fire({
            title: 'Error on Deleting a Product',
            icon: 'error',
            text: 'Kindly Try Again',
          });
        }
      });
  };

  // update a product

  //State hooks to store the values of the input fields
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productdescription, setProductDescription] = useState('');

  function updateProduct(e) {
    //prevents page redirection via a form submission
    e.preventDefault();
    fetch(
      `https://stark-spire-46613.herokuapp.com/api/products/updateProduct/${_id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name: productName,
          price: productPrice,
          description: productdescription,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data === true) {
          //Clear input fields
          setProductName('');
          setProductPrice('');
          setProductDescription('');
          onEditClose();
          Toast.fire({
            title: 'Product has been Updated',
            icon: 'success',
            text: 'You have Updated a Product',
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
  const [isActiveButton, setIsActiveButton] = useState(false);
  useEffect(() => {
    //Validation to enable the submit button when all the input fields are populated and both passwords match
    if (name !== '' && price !== '' && description !== '') {
      setIsActiveButton(true);
    } else {
      setIsActiveButton(false);
    }
  }, [name, price, description]);

  return (
    <Flex direction={{ base: 'row', md: 'column' }} bg={bg2} key={_id}>
      <SimpleGrid
        spacingY={3}
        columns={{ base: 1, md: 4 }}
        w={{ base: 120, md: 'full' }}
        textTransform='uppercase'
        bg={bg3}
        color={'gray.500'}
        py={{ base: 1, md: 4 }}
        px={{ base: 2, md: 10 }}
        fontSize='md'
        fontWeight='hairline'
      >
        <span>Name</span>
        <span>Created</span>
        <span>Data</span>
        {/* <span>Status</span> */}
        <chakra.span textAlign={{ md: 'right' }}>Actions</chakra.span>
      </SimpleGrid>
      <SimpleGrid
        spacingY={3}
        columns={{ base: 1, md: 4 }}
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
          {createdOn}
        </chakra.span>
        <Flex>
          <Button
            size='sm'
            variant='solid'
            leftIcon={<Icon as={AiTwotoneLock} />}
            colorScheme='purple'
            onClick={onOpen}
          >
            View Profile
          </Button>
          {/* MODAL VIEW DATA */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader
                textTransform='uppercase'
                fontWeight='extrabold'
                fontSize='3xl'
              >
                {name}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex direction='column' gap={'5'}>
                  <HStack spacing='10'>
                    <Text fontWeight='bold' fontSize='xl'>
                      PRICE:
                    </Text>
                    <Text>${price}</Text>
                  </HStack>

                  <Flex direction='column'>
                    <Text fontWeight='bold' fontSize='xl'>
                      DESCRIPTION:
                    </Text>
                    <Text>{description}</Text>
                  </Flex>

                  <Text>
                    {isActive ? (
                      <>
                        <HStack spacing='10'>
                          <Text fontWeight='bold' fontSize='xl'>
                            Status:
                          </Text>
                          <Button
                            bg='teal.400'
                            onClick={() => {
                              archiveProduct();
                              onClose();
                              setCount(count + 1);
                            }}
                          >
                            Active
                          </Button>
                        </HStack>
                      </>
                    ) : (
                      <>
                        <HStack spacing='10'>
                          <Box>
                            <Text fontWeight='bold' fontSize='xl'>
                              Status:
                            </Text>
                          </Box>
                          <Button
                            bg='red.400'
                            onClick={() => {
                              unarchiveProduct();
                              onClose();
                              setCount(count + 1);
                            }}
                          >
                            Archived
                          </Button>
                        </HStack>
                      </>
                    )}
                  </Text>
                </Flex>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme='red'
                  mr={3}
                  onClick={onClose}
                  variant='solid'
                >
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          {/* MODAL FOR DELETE */}
          <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                Are you sure you want to delete the item?
              </ModalHeader>
              <ModalCloseButton />

              <ModalFooter>
                <Button
                  colorScheme='teal'
                  mr={3}
                  onClick={() => {
                    onDeleteClose();
                    deleteProduct();
                  }}
                  variant='solid'
                >
                  Confirm
                </Button>
                <Button
                  colorScheme='red'
                  mr={3}
                  onClick={onDeleteClose}
                  variant='solid'
                >
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>

        <Flex justify={{ md: 'end' }}>
          <ButtonGroup variant='solid' size='sm' spacing={3}>
            <IconButton colorScheme='blue' icon={<BsBoxArrowUpRight />} />
            <IconButton
              colorScheme='green'
              icon={<AiFillEdit />}
              onClick={onEditOpen}
            />

            <Drawer isOpen={isEditOpen} placement='right' onClose={onEditClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth='1px'>
                  Edit The Product
                </DrawerHeader>

                <DrawerBody>
                  <Stack spacing='24px'>
                    {/* FORMS */}
                    <form onSubmit={(e) => updateProduct(e)}>
                      <Box>
                        <FormLabel>Name</FormLabel>
                        <Input
                          type='text'
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          placeholder='Enter A Product Name'
                        />
                      </Box>
                      <Box>
                        <FormLabel>Price</FormLabel>
                        <Input
                          type='number'
                          value={productPrice}
                          onChange={(e) => setProductPrice(e.target.value)}
                          placeholder='Enter A Product`s Price'
                        />
                      </Box>
                      <Box>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                          value={productdescription}
                          onChange={(e) =>
                            setProductDescription(e.target.value)
                          }
                        />
                      </Box>
                      <Box my='5'>
                        {isActiveButton ? (
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
            <IconButton
              onClick={onDeleteOpen}
              colorScheme='red'
              variant='outline'
              icon={<BsFillTrashFill />}
            />
          </ButtonGroup>
        </Flex>
      </SimpleGrid>
    </Flex>
  );
};

export default DashboardCard;
