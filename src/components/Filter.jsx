import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Flex, Box, Text, Button,
} from './Primitives';
import { FaTrash } from './Icons';
import { LiveFilterContext, remove } from '../ducks/live-filters';

const TextContainer = styled(Text)`
  box-sizing: border-box;
  font-size: 24px;
  color: #fff;
  font-family: Open Sans, sans-serif;
  font-weight: 700;
`;

const TextSpan = styled(Text)`
  padding: 8px 16px;
  border-radius: 5px;
`;

const Filter = ({ filter }) => {
  const {
    liveFilters: { dispatch },
  } = useContext(LiveFilterContext);

  return (
    <Flex alignItems="center" flexWrap="wrap" bg="pink" color="black" p={4} mb={3}>
      <TextContainer width={3 / 4}>
        <TextSpan as="span" bg="#984f5c">
          {filter.field}
        </TextSpan>
        <TextSpan as="span" bg="#2F0C13" mx={2}>
          {filter.operation}
        </TextSpan>
        <TextSpan as="span" bg="#5a202a">
          {filter.value}
        </TextSpan>
      </TextContainer>
      <Box width={1 / 4} style={{ textAlign: 'right' }}>
        <Button bg="black" onClick={() => dispatch(remove({ object: filter }))}>
          <FaTrash />
        </Button>
      </Box>
    </Flex>
  );
};

Filter.propTypes = {
  filter: PropTypes.shape({
    type: PropTypes.string,
    field: PropTypes.string,
    operation: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default Filter;
