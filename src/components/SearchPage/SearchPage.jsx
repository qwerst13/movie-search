/* eslint-disable */
import React, { useState, useEffect, useMemo } from 'react';

import { Spin, Alert } from 'antd';

import SearchBar from '../SearchBar';
import ItemList from '../ItemList';
import ThemoviedbServices from '../../services/themoviedb-service';

export default function SearchPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [moviesData, setMoviesData] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState('');

  const apiClient = new ThemoviedbServices();

  function onError() {
    setError(true);
    setLoading(false);
  }

  function updateMovies(value, page = 1) {
    setLoading(true);
    setError(false);

    apiClient
      .getFilmsByName(value, page)
      .then(({ results, total_pages: totalPagesData }) => {
        setMoviesData(results);
        setLoading(false);
        setCurrentPage(page);
        setTotalPages(totalPagesData)
        setSearchPhrase(value);
      })
      .catch(() => onError());
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
  const content = hasData ? <ItemList
    data={moviesData}
    currentPage={currentPage}
    totalPages={totalPages}
    onPaginationChange={(page) => setCurrentPage(page)} /> : null;

  useEffect(() => {
    apiClient
      .getListOfPopularMovies()
      .then(({ results }) => {
        setLoading(false);
        setMoviesData(results);
      })
      .catch(() => onError());
  }, [])

  useEffect(() => {
    if (searchPhrase) updateMovies(searchPhrase, 1);
  }, [searchPhrase]);

  useEffect(() => {
    if (searchPhrase) updateMovies(searchPhrase, currentPage);
  }, [currentPage]);

  return (
    <>
      <SearchBar onSearch={(phrase) => setSearchPhrase(phrase)} />

      {errorMessage}
      {loader}
      {content}
    </>
  );
}
