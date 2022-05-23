import { Heading, Spacer, Wrap, Divider, Box, Flex } from '@chakra-ui/react';
import { useEffect, useState, useContext } from 'react';

// local component
import ShopsSection from '../components/ShopSection';
import ShopsSection2 from '../components/ShopSection2';

import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import NotSignIn from '../components/NotSignIn';

// USERCONTExt
import UserContext from '../UserContext';

export default function Shop() {
  const [products, setProducts] = useState();

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:4000/api/products/')
      .then((res) => res.json())
      .then((data) => {
        setProducts(
          data.map((products) => {
            return <ProductCard key={products._id} productProp={products} />;
          })
        );
      });
  }, []);

  return user.id !== null ? (
    <>
      <Flex direction={'column'} alignItems='center' justifyContent='center'>
        <ShopsSection />
        <Divider></Divider>
        <Pagination />
        <Wrap justify='center' mb={50}>
          {products}
        </Wrap>

        <ShopsSection2 />
      </Flex>
    </>
  ) : (
    <>
      <NotSignIn />
      <ShopsSection />
      <ShopsSection2 />
    </>
  );
}
