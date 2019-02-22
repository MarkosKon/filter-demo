import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Button, TopRight, Box, Heading, Text,
} from './Primitives';

import { FaPlus, FaTrash, FaCode } from './Icons';
import Filter from './Filter';
import { LiveFilterContext, toggleOperator, remove } from '../ducks/live-filters';
import { isGroup, hasAndOperator } from '../utils/compare';

const Container = styled(Box)`
  position: relative;
`;

const FilterGroup = ({
  filterGroup, bg, parent, openModal,
}) => {
  const [codeVisible, setCodeVisible] = useState(false);
  const {
    liveFilters: { dispatch },
  } = useContext(LiveFilterContext);
  return (
    <Container bg={bg} color="white" p={4} mb={3}>
      <Heading>
        {parent ? 'Active Filter object - ' : 'FilterGroup - '}
        <Box as="span" style={{ textDecoration: 'underline' }}>
          {hasAndOperator(filterGroup) ? 'AND' : 'OR'}
        </Box>
      </Heading>
      <Box my={3}>
        <Button ml={3} bg="orangered" onClick={() => dispatch(toggleOperator({ filterGroup }))}>
          Toggle
        </Button>
        {codeVisible ? (
          <Button bg="pink" ml={2} color="black" onClick={() => setCodeVisible(false)}>
            Hide code
          </Button>
        ) : (
          <Button bg="pink" ml={2} color="black" onClick={() => setCodeVisible(true)}>
            <FaCode />
          </Button>
        )}
      </Box>
      {!parent && (
        <TopRight>
          <Button bg="black" onClick={() => dispatch(remove({ object: filterGroup }))}>
            <FaTrash />
          </Button>
        </TopRight>
      )}
      {codeVisible && (
        <Box my={3} p={2} bg="#715f5b" color="white">
          <Heading as="h4" fontSize={3}>
            Raw object:
          </Heading>
          <Text as="pre">{JSON.stringify(filterGroup, null, 2)}</Text>
        </Box>
      )}
      <Box bg="#715f5b" color="white" p={3}>
        <Heading as="h4" fontSize={3} p={3}>
          Children
          <Button bg="orangered" ml={2} onClick={() => openModal(filterGroup)}>
            <FaPlus />
          </Button>
        </Heading>
        {filterGroup.children.map((thing) => {
          if (isGroup(thing)) {
            return <FilterGroup key={thing.id} filterGroup={thing} openModal={openModal} />;
          }
          return <Filter key={thing.id} filter={thing} />;
        })}
      </Box>
    </Container>
  );
};

FilterGroup.propTypes = {
  filterGroup: PropTypes.shape({
    type: PropTypes.string,
    operator: PropTypes.string,
    children: PropTypes.array,
  }).isRequired,
  bg: PropTypes.string,
  parent: PropTypes.bool,
  openModal: PropTypes.func.isRequired,
};

FilterGroup.defaultProps = {
  bg: '#433633',
  parent: false,
};
export default FilterGroup;
