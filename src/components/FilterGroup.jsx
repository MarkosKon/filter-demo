import React, { useState, useContext, Fragment } from 'react';
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
  color: white;
  min-height: 80px;
`;

const Operator = ({ filterGroup }) => (
  <Text fontSize={5} mb={2} fontWeight="bold">
    <Box
      as="span"
      py={2}
      px={3}
      mb={2}
      bg="black"
      style={{ display: 'inline-block', minWidth: '45px', borderRadius: '5px' }}
    >
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
    <Container bg="wood" p={4} mb={3} boxShadow="extreme">
      <Flex flexWrap="wrap" justifyContent="flex-end" alignItems="center">
        {parent ? (
          <Button order={1} bg="amaranth" onClick={() => setFiltersVisible(!filtersVisible)}>
            <FaFilter />
          </Button>
        ) : (
          <Button order={1} bg="amaranth" onClick={() => dispatch(remove({ object: filterGroup }))}>
            <FaTrash />
          </Button>
        )}
        {filtersVisible && (
          <>
            <Button bg="amaranth" onClick={() => openModal(filterGroup)}>
              <FaPlus />
            </Button>
            <Button bg="amaranth" mx={2} onClick={() => dispatch(toggleOperator({ filterGroup }))}>
              <FaSync />
            </Button>
          </>
        )}
      </Flex>
      {filtersVisible && (
        <Box bg="wood" color="white" p={3}>
          {filterGroup.children.map((thing, index, array) => {
            if (isGroup(thing)) {
              return (
                <Fragment key={thing.id}>
                  <FilterGroup filterGroup={thing} openModal={openModal} />
                  {isLastInArray({ index, array }) && <Operator filterGroup={filterGroup} />}
                </Fragment>
              );
            }
            return (
              <Fragment key={thing.id}>
                <Filter filter={thing} />
                {isLastInArray({ index, array }) && <Operator filterGroup={filterGroup} />}
              </Fragment>
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
