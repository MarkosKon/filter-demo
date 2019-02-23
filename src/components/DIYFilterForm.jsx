import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import styled from 'styled-components';

import { Button } from './Primitives';
import { operations, properties } from '../data';

const TextInput = styled.input`
  color: black;
  padding: 8px 14px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid rgb(204, 204, 204);
`;

const propertyOptions = properties.map(prop => ({
  label: prop,
  value: prop,
}));
const operationOptions = operations.map(op => ({
  label: op,
  value: op,
}));

const DIYFilterForm = ({ handleSubmit }) => {
  const [property, setProperty] = useState(propertyOptions[0]);
  const [operation, setOperation] = useState(operationOptions[0]);
  const [filterValue, setFilterValue] = useState('');

  return (
    <form onSubmit={e => e.preventDefault() || handleSubmit}>
      <ReactSelect
        placeholder="property"
        options={propertyOptions}
        value={property}
        onChange={e => setProperty(e)}
        required
      />
      <ReactSelect
        placeholder="operation"
        options={operationOptions}
        value={operation}
        onChange={e => setOperation(e)}
      />
      <TextInput
        type="text"
        placeholder="value"
        value={filterValue}
        onChange={e => setFilterValue(e.target.value)}
        required
      />
      <Button type="submit" bg="black" mt={3}>
        Add DYI filter
      </Button>
    </form>
  );
};

DIYFilterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default DIYFilterForm;
