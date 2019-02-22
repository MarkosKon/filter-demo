import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '../components/Primitives';

const Layout = ({ children }) => (
  <>
    <Box m="auto">{children}</Box>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
