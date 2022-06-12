import * as React from 'react';
import { Box, Divider } from '@chakra-ui/react';

// Here we have used react-icons package for the icons
import HomeSection1 from '../components/sectionComponents/HomeSection1';
import HomeSection2 from '../components/sectionComponents/HomeSection2';

const HeroSection = () => {
  return (
    <>
      <Box>
        <HomeSection1 />
        <Divider my='10' />
        <HomeSection2 />
      </Box>
    </>
  );
};

export default HeroSection;
