import React, { useRef, useEffect, useContext } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from 'react-modal';
import ReactSelect from 'react-select';
import createId from 'uuid/v4';

import {
  Button, Flex, Box, Heading,
} from './Primitives';
import { LiveFilterContext, add } from '../ducks/live-filters';
import { predefinedFilters } from '../data';

const modalStyles = {
  content: { backgroundColor: 'pink' },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.58)',
  },
};

const Centered = styled(Flex)`
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

Modal.setAppElement('#___gatsby');

const AddModal = (props) => {
  const { modalInitiator, onRequestClose } = props;
  const {
    liveFilters: { dispatch },
  } = useContext(LiveFilterContext);

  const predefinedFilterOptions = useRef();
  const ONCE = [];
  useEffect(() => {
    predefinedFilterOptions.current = predefinedFilters.map((object) => {
      const { field, operation, value } = object;
      return {
        label: `${field} ${operation} ${value}`,
        value,
        object,
      };
    });
  }, ONCE);

  return (
    <Modal {...props} style={modalStyles} contentLabel="Add filter or filtergroups">
      <Centered>
        <Box>
          <Heading textAlign="center">Add Filter or FilterGroup</Heading>
          <Box p={4}>
            <Heading as="h3" mb={3}>
              - Filter
            </Heading>
            <ReactSelect
              placeholder="Predefined filters"
              options={predefinedFilterOptions.current}
              onChange={({ object }) => {
                // add({ filterGroup: modalInitiator, thingToAdd: object });
                dispatch(add({ filterGroup: modalInitiator, thingToAdd: object }));
                onRequestClose();
              }}
            />
          </Box>
          <Box p={4}>
            <Heading as="h3" mb={3}>
              - Filter group
            </Heading>
            <Button
              bg="black"
              onClick={() => {
                const toAdd = {
                  id: createId(),
                  type: 'GROUP',
                  operator: 'AND',
                  children: [],
                };
                // add({
                //   filterGroup: modalInitiator,
                //   thingToAdd: toAdd,
                // });
                dispatch(
                  add({
                    filterGroup: modalInitiator,
                    thingToAdd: toAdd,
                  }),
                );
                onRequestClose();
              }}
            >
              Add empty group
            </Button>
          </Box>
        </Box>
      </Centered>
    </Modal>
  );
};

AddModal.propTypes = {
  ...AddModal.propTypes,
};

export default AddModal;
