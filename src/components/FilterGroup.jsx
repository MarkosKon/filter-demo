import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { boxShadow } from 'styled-system';

import {
  Button, Flex, Box, Text,
} from './Primitives';

import {
  FaPlus, FaTrash, FaFilter, FaSync,
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
  const [filtersVisible, setFiltersVisible] = useState(!parent);
  const {
    liveFilters: { dispatch },
  } = useContext(LiveFilterContext);
  return (
    <Container p={4} mb={3} boxShadow="extreme">
      <Flex flexWrap="wrap" justifyContent="flex-end" alignItems="center">
        {parent ? (
          <Button order={1} bg="orangered" onClick={() => setFiltersVisible(!filtersVisible)}>
            <FaFilter />
          </Button>
        ) : (
          <Button
            order={1}
            bg="orangered"
            onClick={() => dispatch(remove({ object: filterGroup }))}
          >
            <FaTrash />
          </Button>
        )}
        {filtersVisible && (
          <>
            <Button bg="orangered" onClick={() => openModal(filterGroup)}>
              <FaPlus />
            </Button>
            <Button bg="orangered" mx={2} onClick={() => dispatch(toggleOperator({ filterGroup }))}>
              <FaSync />
            </Button>
          </>
        )}
      </Flex>
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
