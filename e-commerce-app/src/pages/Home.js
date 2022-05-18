import * as React from 'react';
import { Container, chakra, Stack, Text, Button, Box } from '@chakra-ui/react';

// Here we have used react-icons package for the icons
import { FaGithub } from 'react-icons/fa';
import HomeSection1 from '../components/HomeSection1';
import HomeSection2 from '../components/HomeSection2';

const HeroSection = () => {
  return (
    <>
      <HomeSection1 />

      <HomeSection2 />
    </>
  );
};

export default HeroSection;
