import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { boxShadow } from 'styled-system';

import {
  Button, TopRight, Box, Heading, Text,
} from './Primitives';

import {
  FaPlus, FaTrash, FaCode, FaFilter, FaSync,
} from './Icons';
import Filter from './Filter';
import { LiveFilterContext, toggleOperator, remove } from '../ducks/live-filters';
import { isGroup, hasAndOperator } from '../utils/compare';

const Container = styled(Box)`
  ${boxShadow}
  position: relative;
  background-color: #715e5b;
  color: white;
  min-height: 80px;
`;

const Operator = ({ filterGroup }) => (
  <Text variant="wide" p={1} mb={2}>
    <Box as="span" style={{ display: 'inline-block', minWidth: '45px' }}>
      {hasAndOperator(filterGroup) ? 'AND' : 'OR'}
    </Box>
  </Text>
);

Operator.propTypes = {
  filterGroup: PropTypes.shape({
    type: PropTypes.string,
    operator: PropTypes.string,
    children: PropTypes.array,
  }).isRequired,
};

const isLastInArray = ({ index, array }) => index !== array.length - 1;

const FilterGroup = ({ filterGroup, parent, openModal }) => {
  const [codeVisible, setCodeVisible] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(!parent);
  const {
    liveFilters: { dispatch },
  } = useContext(LiveFilterContext);
  return (
    <Container px={4} pt={5} pb={3} mb={3} boxShadow="extreme">
      <TopRight>
        <Button bg="orangered" onClick={() => openModal(filterGroup)}>
          <FaPlus />
        </Button>
        <Button bg="orangered" mx={2} onClick={() => dispatch(toggleOperator({ filterGroup }))}>
          <FaSync />
        </Button>
        {codeVisible ? (
          <Button mr={2} bg="orangered" onClick={() => setCodeVisible(false)}>
            Hide code
          </Button>
        ) : (
          <Button mr={2} bg="orangered" onClick={() => setCodeVisible(true)}>
            <FaCode />
          </Button>
        )}
        {!parent ? (
          <Button bg="orangered" onClick={() => dispatch(remove({ object: filterGroup }))}>
            <FaTrash />
          </Button>
        ) : (
          <Button bg="orangered" onClick={() => setFiltersVisible(!filtersVisible)}>
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
          {filterGroup.children.map((thing, index, array) => {
            if (isGroup(thing)) {
              return (
                <>
                  <FilterGroup key={thing.id} filterGroup={thing} openModal={openModal} />
                  {isLastInArray({ index, array }) && <Operator filterGroup={filterGroup} />}
                </>
              );
            }
            return (
              <>
                <Filter key={thing.id} filter={thing} />
                {isLastInArray({ index, array }) && <Operator filterGroup={filterGroup} />}
              </>
            );
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
