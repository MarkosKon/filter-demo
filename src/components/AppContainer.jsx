import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import liveFilterReducer, { LiveFilterContext } from '../ducks/live-filters';
import { initialLiveFilters } from '../data';

const AppContainer = ({ children }) => {
  const [liveFilters, dispatch] = useReducer(liveFilterReducer, initialLiveFilters);
  return (
    <LiveFilterContext.Provider value={{ liveFilters: { liveFilters, dispatch } }}>
      {children}
    </LiveFilterContext.Provider>
  );
};

AppContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

export default AppContainer;
