// component library --------------------------------------
import React, { useContext } from 'react';
import {
  chakra,
  HStack,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Box,
  Flex,
  IconButton,
  useColorModeValue,
  useDisclosure,
  CloseButton,
  VStack,
  Button,
  useColorMode,
  SimpleGrid,
  Icon,
  Text,
} from '@chakra-ui/react';
import { useViewportScroll } from 'framer-motion';
// ICONS --------------------------------------
import { IoIosArrowDown } from 'react-icons/io';
import { TiHomeOutline, TiShoppingCart, TiShoppingBag } from 'react-icons/ti';
import { AiOutlineMenu, AiOutlineDashboard } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { SiElastic } from 'react-icons/si';

// ROUTER --------------------------------------
import { Link as ReactRouterLink } from 'react-router-dom';

// UserContext --------------------------------------
import UserContext from '../UserContext';

export default function Header() {
  // chakra --------------------------------------
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const bg = useColorModeValue('gray.50', 'gray.800');
  const ref = React.useRef();
  const [y, setY] = React.useState(0);
  const { height = 0 } = ref.current ? ref.current.getBoundingClientRect() : {};
  const { scrollY } = useViewportScroll();

  // UserContext --------------------------------------
  const { user } = useContext(UserContext);

  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);
  const cl = useColorModeValue('gray.800', 'white');
  const mobileNav = useDisclosure();

  const Section = (props) => {
    const ic = useColorModeValue('brand.600', 'brand.50');
    const hbg = useColorModeValue('gray.50', 'brand.400');
    const tcl = useColorModeValue('gray.900', 'gray.50');
    const dcl = useColorModeValue('gray.500', 'gray.50');
    return (
      <Link
        m={-3}
        p={3}
        display='flex'
        alignItems='start'
        rounded='lg'
        _hover={{ bg: hbg }}
      >
        <Icon
          flexShrink={0}
          h={6}
          w={6}
          color={ic}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          aria-hidden='true'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
        >
          <path d={props.icon} />
        </Icon>
        <Box ml={4}>
          <chakra.p fontSize='sm' fontWeight='700' color={tcl}>
            {props.title}
          </chakra.p>
          <chakra.p mt={1} fontSize='sm' color={dcl}>
            {props.children}
          </chakra.p>
        </Box>
      </Link>
    );
  };

  const sections = [
    {
      title: 'Analytics',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      description:
        'Get a better understanding of where your traffic is coming from.',
    },
    {
      title: 'Engagement',
      icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122',
      description: 'Speak directly to your customers in a more meaningful way.',
    },
    {
      title: 'Security',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      description: `Your customers's data will be safe and secure`,
    },
    {
      title: 'Integrations',
      icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
      description: `Connect with third-party tools that you're already using.`,
    },
    {
      title: 'Automations',
      icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
      description:
        'Build strategic funnels that will drive your customers to convert',
    },
  ];

  const Features = (props) => {
    return (
      <React.Fragment>
        <SimpleGrid
          columns={props.h ? { base: 1, md: 3, lg: 5 } : 1}
          pos='relative'
          gap={{ base: 6, sm: 8 }}
          px={5}
          py={6}
          p={{ sm: 8 }}
        >
          {sections.map(({ title, icon, description }, sid) => (
            <Section title={title} icon={icon} key={sid}>
              {description}
            </Section>
          ))}
        </SimpleGrid>
      </React.Fragment>
    );
  };

  const MobileNavContent = (
    <VStack
      pos='absolute'
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? 'flex' : 'none'}
      flexDirection='column'
      p={2}
      pb={4}
      m={2}
      bg={bg}
      spacing={3}
      rounded='sm'
      shadow='sm'
    >
      <CloseButton
        aria-label='Close menu'
        justifySelf='self-start'
        onClick={mobileNav.onClose}
      />
      {/* home */}
      <ReactRouterLink to='/'>
        <Button w='full' variant='ghost' leftIcon={<TiHomeOutline />}>
          Home
        </Button>
      </ReactRouterLink>
      {/* shop */}
      <ReactRouterLink to='/shop'>
        <Button
          w='full'
          variant='ghost'
          colorScheme='brand'
          leftIcon={<TiShoppingBag />}
        >
          Shop
        </Button>
      </ReactRouterLink>
      {/* cart */}
      <ReactRouterLink to='/cart'>
        <Button w='full' variant='ghost' leftIcon={<TiShoppingCart />}>
          Cart
        </Button>
      </ReactRouterLink>
    </VStack>
  );
  return (
    <chakra.header
      ref={ref}
      shadow={y > height ? 'sm' : undefined}
      transition='box-shadow 0.2s'
      bg={bg}
      w='full'
      overflowY='hidden'
      borderBottomWidth={2}
      borderBottomColor={useColorModeValue('gray.200', 'gray.900')}
    >
      <chakra.div h='4.5rem' mx='auto' maxW='1200px'>
        <Flex
          w='full'
          h='full'
          px='6'
          alignItems='center'
          justifyContent='space-between'
        >
          {/* CAMISETAS BUTTON */}
          <Flex align='flex-start'>
            <ReactRouterLink to='/'>
              <HStack>
                <SiElastic size={35} color='teal' />

                <Button
                  bg={bg}
                  color=''
                  display='inline-flex'
                  alignItems='center'
                  fontSize='2xl'
                >
                  <Text
                    bgClip='text'
                    bgGradient='linear(to-r, teal.300, pink.400)'
                    style={{ letterSpacing: '5px' }}
                  >
                    CAMISETAS
                  </Text>
                </Button>
              </HStack>
            </ReactRouterLink>
          </Flex>

          {/* FEATURES, HOME, SHOP, CART BUTTON */}
          <Flex>
            <HStack spacing='5' display={{ base: 'none', md: 'flex' }}>
              {/* FEATURES */}
              <Popover>
                <PopoverTrigger>
                  <Button
                    bg={bg}
                    color='gray.500'
                    display='inline-flex'
                    alignItems='center'
                    fontSize='md'
                    _hover={{ color: cl }}
                    _focus={{ boxShadow: 'none' }}
                    rightIcon={<IoIosArrowDown />}
                  >
                    Features
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  w='100vw'
                  maxW='md'
                  _focus={{ boxShadow: 'md' }}
                >
                  <Features />
                </PopoverContent>
              </Popover>
              {/* HOME */}
              <ReactRouterLink to='/'>
                <Button
                  bg={bg}
                  color='gray.500'
                  display='inline-flex'
                  alignItems='center'
                  fontSize='md'
                  _hover={{ color: cl }}
                  _focus={{ boxShadow: 'none' }}
                  leftIcon={<TiHomeOutline />}
                >
                  Home
                </Button>
              </ReactRouterLink>
              {user.isAdmin === true ? (
                <>
                  <ReactRouterLink to='/dashboard'>
                    <Button
                      bg={bg}
                      color='gray.500'
                      display='inline-flex'
                      alignItems='center'
                      fontSize='md'
                      _hover={{ color: cl }}
                      _focus={{ boxShadow: 'none' }}
                      leftIcon={<AiOutlineDashboard />}
                    >
                      Dashboard
                    </Button>
                  </ReactRouterLink>
                </>
              ) : (
                <>
                  {/* SHOP */}
                  <ReactRouterLink to='/shop'>
                    <Button
                      bg={bg}
                      color='gray.500'
                      display='inline-flex'
                      alignItems='center'
                      fontSize='md'
                      _hover={{ color: cl }}
                      _focus={{ boxShadow: 'none' }}
                      leftIcon={<TiShoppingCart />}
                    >
                      Shop
                    </Button>
                  </ReactRouterLink>
                  {/* CART */}
                  <ReactRouterLink to='/cart'>
                    <Button
                      bg={bg}
                      color='gray.500'
                      display='inline-flex'
                      alignItems='center'
                      fontSize='md'
                      _hover={{ color: cl }}
                      _focus={{ boxShadow: 'none' }}
                      leftIcon={<TiShoppingBag rt />}
                    >
                      Cart
                    </Button>
                  </ReactRouterLink>{' '}
                </>
              )}
            </HStack>
          </Flex>

          {/* SIGN IN AND SIGN UP BUTTON */}
          <Flex justify='flex-end' align='center' color='gray.400'>
            <HStack spacing='5' display={{ base: 'none', md: 'flex' }}>
              {user.id !== null ? (
                <>
                  <ReactRouterLink to='/logout'>
                    <Button colorScheme='brand' variant='ghost' size='sm'>
                      Logout
                    </Button>
                  </ReactRouterLink>
                </>
              ) : (
                <>
                  <ReactRouterLink to='/login'>
                    <Button colorScheme='brand' variant='ghost' size='sm'>
                      Sign in
                    </Button>
                  </ReactRouterLink>
                  <ReactRouterLink to='/signup'>
                    <Button colorScheme='brand' variant='outline' size='sm'>
                      Sign up
                    </Button>
                  </ReactRouterLink>
                </>
              )}

              {/* <ReactRouterLink to='/login'>
                <Button colorScheme='brand' variant='ghost' size='sm'>
                  Sign in
                </Button>
              </ReactRouterLink>
              <ReactRouterLink to='/signup'>
                <Button colorScheme='brand' variant='outline' size='sm'>
                  Sign up
                </Button>
              </ReactRouterLink> */}
            </HStack>
            <IconButton
              size='md'
              fontSize='lg'
              aria-label={`Switch to ${text} mode`}
              variant='ghost'
              color='current'
              ml={{ base: '0', md: '3' }}
              onClick={toggleMode}
              icon={<SwitchIcon />}
            />
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              aria-label='Open menu'
              fontSize='20px'
              color={useColorModeValue('gray.800', 'inherit')}
              variant='ghost'
              icon={<AiOutlineMenu />}
              onClick={mobileNav.onOpen}
            />
          </Flex>
        </Flex>
        {MobileNavContent}
      </chakra.div>
    </chakra.header>
  );
}
