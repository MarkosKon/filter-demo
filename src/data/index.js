export const initialLiveFilters = {
  type: 'GROUP',
  id: 'e8f29319-d719-4d91-82ed-9c1d51526815',
  operator: 'AND',
  children: [
    {
      type: 'FILTER',
      id: '66775fc3-efa2-401a-abeb-b0ad1695120e',
      field: 'cost',
      operation: 'LESS_THAN',
      value: 200,
    },
    {
      type: 'GROUP',
      id: '5064281a-b758-420b-b6eb-9febb4f588b2',
      operator: 'OR',
      children: [
        {
          type: 'FILTER',
          id: '9e54910e-566a-4195-8572-18dd61a1710a',
          field: 'brand',
          operation: 'EQUALS',
          value: 'Samsung',
        },
        {
          type: 'FILTER',
          id: '54cd0014-1de2-4e2e-ab0c-c1c62eebe387',
          field: 'brand',
          operation: 'EQUALS',
          value: 'Xiaomi',
        },
      ],
    },
  ],
};

export const predefinedFilters = [
  {
    type: 'FILTER',
    id: '66775fc3-efa2-401a-abeb-b0ad1695120e',
    field: 'cost',
    operation: 'LESS_THAN',
    value: 200,
  },
  {
    type: 'FILTER',
    id: '66775fc3-efa2-401a-abeb-adad1695120e',
    field: 'cost',
    operation: 'MORE_THAN',
    value: 400,
  },
  {
    type: 'FILTER',
    id: '9e54910e-566a-4195-8572-18dd61a1710a',
    field: 'brand',
    operation: 'EQUALS',
    value: 'Samsung',
  },
  {
    type: 'FILTER',
    id: '54cd0014-1de2-4e2e-ab0c-c1c62eebe387',
    field: 'brand',
    operation: 'EQUALS',
    value: 'Xiaomi',
  },
  {
    type: 'FILTER',
    id: '54cd0014-1ce2-4e2e-ab0c-c1c62eebe387',
    field: 'brand',
    operation: 'EQUALS',
    value: 'Apple',
  },
];

export const products = [
  {
    name: 'Xiaomi Redmi Note 5',
    brand: 'Xiaomi',
    cost: 180,
    year: 2018,
  },
  {
    name: 'Samsung Galaxy S8',
    brand: 'Samsung',
    cost: 450,
    year: 2017,
  },
  {
    name: 'Apple iPhone 7',
    brand: 'Apple',
    cost: 513,
    year: 2016,
  },
];
