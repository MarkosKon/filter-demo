import React, { useState, useEffect, useContext } from 'react';
import {
  initializeOperationsG, equals, lessThan, greaterThan,
} from 'compare-object-field';

import AddModal from '../components/AddModal';
import FilterGroup from '../components/FilterGroup';
import Products from '../components/Products';
import Layout from '../layouts/Layout';
import SEO from '../components/SEO';

import { LiveFilterContext } from '../ducks/live-filters';
import { products } from '../data';

const operations = {
  EQUALS: equals,
  LESS_THAN: lessThan,
  MORE_THAN: greaterThan,
};
const addFilterGroup = initializeOperationsG(operations);

const IndexPage = () => {
  const {
    liveFilters: { liveFilters },
  } = useContext(LiveFilterContext);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [modalInitiator, setModalInitiator] = useState({});

  const showProducts = () => {
    const satisfiesFilterGroup = addFilterGroup(liveFilters);
    const result = products.filter(satisfiesFilterGroup);
    setFilteredProducts(result);
  };

  const ONCE = [];
  useEffect(() => showProducts(), ONCE);

  return (
    <Layout>
      <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
      <FilterGroup
        filterGroup={liveFilters}
        parent
        openModal={(initiator) => {
          setModalInitiator(initiator);
          setAddModalOpen(true);
        }}
      />
      <Products products={filteredProducts} showProducts={showProducts} />
      <AddModal
        isOpen={addModalOpen}
        modalInitiator={modalInitiator}
        onRequestClose={() => setAddModalOpen(false)}
      />
    </Layout>
  );
};

export default IndexPage;
