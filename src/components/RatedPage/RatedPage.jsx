import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Alert, Spin } from 'antd';
import ItemList from '../ItemList';
import ThemoviedbServices from '../../services/themoviedb-service';

export default function RatedPage({ activeKey }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [moviesData, setMoviesData] = useState([]);

  const apiClient = new ThemoviedbServices();

  function onError() {
    setError(true);
    setLoading(false);
  }

  function searchRated(page = 1) {
    setLoading(true);
    setError(false);

    apiClient
      .getRatedMovies(page)
      .then(({ results, total_pages: totalPagesData }) => {
        setLoading(false);
        setError(false);
        setMoviesData(results);
        setCurrentPage(page);
        setTotalPages(totalPagesData);
      })
      .catch(() => onError());
  }

  useEffect(() => {
    searchRated(currentPage);
  }, [activeKey, currentPage]);

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
  const content = hasData ? (
    <ItemList
      data={moviesData}
      currentPage={currentPage}
      totalPages={totalPages}
      onPaginationChange={(page) => setCurrentPage(page)}
    />
  ) : null;

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
