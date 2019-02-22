import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Box, Heading, Text, TopRight, Button,
} from './Primitives';
import { LiveFilterContext, remove } from '../ducks/live-filters';

const Container = styled(Box)`
  position: relative;
`;

const Filter = ({ filter }) => {
  const {
    liveFilters: { dispatch },
  } = useContext(LiveFilterContext);

  return (
    <Container bg="pink" color="black" p={4} mb={3}>
      <Heading>Filter</Heading>
      <TopRight>
        <Button
          bg="black"
          onClick={() => {
            // remove(filter);
            dispatch(remove({ object: filter }));
          }}
        >
          Remove
        </Button>
      </TopRight>
      <Text as="pre">{JSON.stringify(filter, null, 2)}</Text>
    </Container>
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
