import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Box, Heading, Text, TopRight, Button,
} from './Primitives';
import { FaTrash, FaCode } from './Icons';
import { LiveFilterContext, remove } from '../ducks/live-filters';

const Container = styled(Box)`
  position: relative;
`;

const Filter = ({ filter }) => {
  const [codeVisible, setCodeVisible] = useState(false);
  const {
    liveFilters: { dispatch },
  } = useContext(LiveFilterContext);

  return (
    <Container bg="pink" color="black" p={4} mb={3}>
      <Heading fontFamily="opensans">
        {`${filter.field} ${filter.operation} ${filter.value} `}
      </Heading>
      <TopRight>
        {codeVisible ? (
          <Button bg="black" mr={2} color="white" onClick={() => setCodeVisible(false)}>
            Hide code
          </Button>
        ) : (
          <Button bg="black" mr={2} color="white" onClick={() => setCodeVisible(true)}>
            <FaCode />
          </Button>
        )}
        <Button bg="black" onClick={() => dispatch(remove({ object: filter }))}>
          <FaTrash />
        </Button>
      </TopRight>
      {codeVisible && <Text as="pre">{JSON.stringify(filter, null, 2)}</Text>}
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
