import React, { useState, useEffect, useMemo } from 'react';

import { Spin, Alert } from 'antd';

import SearchBar from '../SearchBar';
import ItemList from '../ItemList';
import ThemoviedbServices from '../../services/themoviedb-service';

export default function SearchPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pages, setPages] = useState({ current: 1, total: 1 });
  const [data, setData] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState('');

  const apiClient = useMemo(() => new ThemoviedbServices(), []);

  function onError() {
    setError(true);
    setLoading(false);
  }

  function onSearch(value, page = 1) {
    if (!value) {
      setLoading(false);
      setError(false);
      setPages({ current: 1, total: 1 });
      setData([]);
      setSearchPhrase('');

      return;
    }

    setLoading(true);
    setError(false);

    apiClient
      .getFilmsByName(value, page)
      .then(({ results, total_pages: totalPages }) => {
        setData(results);
        setLoading(false);
        setPages({ current: page, total: totalPages });
        setSearchPhrase(value);
      })
      .catch(() => onError());
  }

  function onPaginationChange(page) {
    onSearch(searchPhrase, page);
  }

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
  const content = hasData ? <ItemList data={data} pages={pages} onPaginationChange={onPaginationChange} /> : null;

  useEffect(() => {
    apiClient
      .getListOfPopularMovies()
      .then(({ results }) => {
        setLoading(false);
        setData(results);
      })
      .catch(() => onError());
  }, [apiClient]);

  return (
    <>
      <SearchBar onSearch={onSearch} />

      {errorMessage}
      {loader}
      {content}
    </>
  );
}
