import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import {
  Flex, Box, Heading, Button,
} from './Primitives';
import { FaTrash } from './Icons';
import { LiveFilterContext, remove } from '../ducks/live-filters';

const Filter = ({ filter }) => {
  const {
    liveFilters: { dispatch },
  } = useContext(LiveFilterContext);

  return (
    <Flex alignItems="center" flexWrap="wrap" bg="pink" color="black" p={4} mb={3}>
      <Box width={3 / 4}>
        <Heading fontFamily="opensans">
          {`${filter.field} ${filter.operation} ${filter.value} `}
        </Heading>
      </Box>
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
