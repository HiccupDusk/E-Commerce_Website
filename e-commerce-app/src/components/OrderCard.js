import React from 'react';

// CHAKRA COMPONENT
import {
  Heading,
  HStack,
  VStack,
  Wrap,
  Button,
  Text,
  Flex,
  Spacer,
} from '@chakra-ui/react';

const OrderCard = ({ OrderCardProp }) => {
  const { name, price, _id, description } = OrderCardProp;

  return (
    <>
      <Flex direction='column'>
        <HStack>
          <Text>{name}</Text>
          <Spacer></Spacer>
          <Text>${price}</Text>
        </HStack>
      </Flex>
    </>
  );
};

export default OrderCard;
