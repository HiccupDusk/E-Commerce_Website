import { Wrap, Stack, Flex } from '@chakra-ui/react';
import { Fragment, useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
//import coursesData from '../data/coursesData';

export default function Shop() {
  const [products, setProducts] = useState([]);
  //console.log(coursesData[0])

  // const courses = coursesData.map(course => {

  // 	return(
  // 		<CourseCard key={course.id} courseProp={course} />
  // 		)
  // })

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

  return (
    <>
      <Wrap justify='center' mb={50}>
        {products}
      </Wrap>
    </>
  );
}
