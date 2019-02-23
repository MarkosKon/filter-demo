import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { boxShadow } from 'styled-system';

import {
  Button, TopRight, Box, Heading, Text,
} from './Primitives';

import {
  FaPlus, FaTrash, FaCode, FaFilter,
} from './Icons';
import Filter from './Filter';
import { LiveFilterContext, toggleOperator, remove } from '../ducks/live-filters';
import { isGroup, hasAndOperator } from '../utils/compare';

const Container = styled(Box)`
  ${boxShadow}
  position: relative;
  background-color: #715e5b;
  color: white;
`;

const FilterGroup = ({ filterGroup, parent, openModal }) => {
  const [codeVisible, setCodeVisible] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(!parent);
  const {
    liveFilters: { dispatch },
  } = useContext(LiveFilterContext);
  return (
    <Container p={4} pb={3} mb={3} boxShadow="extreme">
      <Heading mb={3}>
        {parent ? 'Active Filter object - ' : 'FilterGroup - '}
        <Box as="span" style={{ textDecoration: 'underline' }}>
          {hasAndOperator(filterGroup) ? 'AND' : 'OR'}
        </Box>
      </Heading>
      <TopRight>
        <Button bg="black" onClick={() => dispatch(toggleOperator({ filterGroup }))}>
          Toggle
        </Button>
        {codeVisible ? (
          <Button mx={2} bg="black" onClick={() => setCodeVisible(false)}>
            Hide code
          </Button>
        ) : (
          <Button mx={2} bg="black" onClick={() => setCodeVisible(true)}>
            <FaCode />
          </Button>
        )}
        {!parent ? (
          <Button bg="black" onClick={() => dispatch(remove({ object: filterGroup }))}>
            <FaTrash />
          </Button>
        ) : (
          <Button bg="black" onClick={() => setFiltersVisible(!filtersVisible)}>
            <FaFilter />
          </Button>
        )}
      </TopRight>
      {codeVisible && (
        <Box my={3} p={2} bg="#715f5b" color="white">
          <Heading as="h4" fontSize={3}>
            Raw object:
          </Heading>
          <Text as="pre">{JSON.stringify(filterGroup, null, 2)}</Text>
        </Box>
      )}
      {filtersVisible && (
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
      )}
    </Container>
  );
};

FilterGroup.propTypes = {
  filterGroup: PropTypes.shape({
    type: PropTypes.string,
    operator: PropTypes.string,
    children: PropTypes.array,
  }).isRequired,
  parent: PropTypes.bool,
  openModal: PropTypes.func.isRequired,
};

FilterGroup.defaultProps = {
  parent: false,
};
export default FilterGroup;
