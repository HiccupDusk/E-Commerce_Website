import React from 'react';

// CHAKRA
import {
  HStack,
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Spacer,
  Box,
  VStack,
} from '@chakra-ui/react';

// ICONS
import { AiFillEdit, AiTwotoneLock } from 'react-icons/ai';
import { BsBoxArrowUpRight, BsFillTrashFill } from 'react-icons/bs';

//
const DashboardCard = ({ productProp }) => {
  // destructuring
  const { name, price, _id, description, createdOn, isActive } = productProp;

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
                          <Button bg='teal.400'>Active</Button>
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
                          <Button bg='red.400'>Archive</Button>
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
                  onClick={onDeleteClose}
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
            <IconButton colorScheme='green' icon={<AiFillEdit />} />
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
