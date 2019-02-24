import React, { useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import ReactSelect from 'react-select';
import createId from 'uuid/v4';

import {
  Button, Flex, Box, Heading,
} from './Primitives';
import { LiveFilterContext, add } from '../ducks/live-filters';
import { predefinedFilters } from '../data';
import DIYFilterForm from './DIYFilterForm';

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
          <Heading textAlign="center" pb={4}>
            Add Group or Filter
          </Heading>
          <Box py={3}>
            <Heading as="h3" mb={3}>
              - Group
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
          <Box py={3}>
            <Heading as="h3" mb={3}>
              - Predefined Filter
            </Heading>
            <ReactSelect
              placeholder="Predefined filters"
              options={predefinedFilterOptions.current}
              onChange={({ object }) => {
                dispatch(add({ filterGroup: modalInitiator, thingToAdd: object }));
                onRequestClose();
              }}
            />
          </Box>
          <Box py={3}>
            <Heading as="h3" mb={3}>
              - DIY Filter
            </Heading>
            <DIYFilterForm
              handleSubmit={({ property, operation, filterValue }) => {
                const thingToAdd = {
                  type: 'FILTER',
                  id: createId(),
                  field: property,
                  operation,
                  value: filterValue,
                };
                dispatch(add({ filterGroup: modalInitiator, thingToAdd }));
                onRequestClose();
              }}
            />
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
