import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Box, Heading, Text, Button, TopRight,
} from './Primitives';

const Container = styled(Box)`
  position: relative;
`;

const Products = ({ products, showProducts }) => (
  <Container p={4}>
    <Heading>Products</Heading>
    <TopRight>
      <Button bg="black" color="white" onClick={showProducts}>
        Show products
      </Button>
    </TopRight>
    <Text as="pre">{products.length > 0 ? JSON.stringify(products, null, 2) : 'No products'}</Text>
  </Container>
);

Products.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  showProducts: PropTypes.func.isRequired,
};

export default Products;
