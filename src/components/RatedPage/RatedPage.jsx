import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Alert, Spin } from 'antd';
import ItemList from '../ItemList';
import ThemoviedbServices from '../../services/themoviedb-service';

export default function RatedPage({ activeKey }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pages, setPages] = useState({ current: 1, total: 1 });
  const [data, setData] = useState([]);

  const apiClient = useMemo(() => new ThemoviedbServices(), []);

  function onError() {
    setError(true);
    setLoading(false);
  }

  const searchRated = useCallback(
    (page = 1) => {
      setLoading(true);
      setError(false);

      apiClient
        .getRatedMovies(page)
        .then(({ results, total_pages: totalPages }) => {
          setLoading(false);
          setError(false);
          setData(results);
          setPages({ current: page, total: totalPages });
        })
        .catch(() => onError());
    },
    [apiClient]
  );

  useEffect(() => {
    searchRated();
  }, [activeKey, searchRated]);

  const hasData = !(loading || error);

  const errorMessage = error ? (
    <Alert
      message="Error"
      description="Something went wrong. Try to search something or try later."
      type="error"
      showIcon
    />
  ) : null;
  const loader = loading ? <Spin className="spinner" size="large" tip="Searching..." /> : null;
  const content = hasData ? <ItemList data={data} pages={pages} onPaginationChange={searchRated} /> : null;

  return (
    <>
      {errorMessage}
      {loader}
      {content}
    </>
  );
}

RatedPage.propTypes = {
  activeKey: PropTypes.string.isRequired,
};
