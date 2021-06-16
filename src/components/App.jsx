import React from 'react';
import PropTypes from 'prop-types';

import { Layout, Row, Col, Spin, Alert } from 'antd';

import 'antd/dist/antd.css';
import './App.scss';
// important to place components after styles
import SearchBar from './SearchBar';
import Filter from './Filter';
import ItemList from './ItemList';
import ErrorBoundary from './ErrorBoundary';
import ThemoviedbService from '../services/themoviedb-service';
import GenreContext from '../context';

export default class App extends React.Component {
  apiClient = new ThemoviedbService();

  state = {
    data: [],
    isLoading: true,
    error: false,
    genres: new Map(),
    searchPhrase: '',
    pages: 1,
    currentPage: 1,
    currentTab: 'Search',
  };

  componentDidMount() {
    Promise.all([
      this.apiClient.getListOfPopularMovies(),
      this.apiClient.getGenresMap(),
      this.apiClient.getGuestSessionId(),
    ])
      .then(([popularFilms, genres]) => {
        this.setState({
          data: popularFilms.results,
          genres,
          isLoading: false,
        });
      })
      .catch(() =>
        this.setState({
          error: true,
          isLoading: false,
        })
      );
  }

  onError = () => {
    this.setState({ error: true, isLoading: false });
  };

  onSearch = (value, page = 1) => {
    if (!value) {
      this.setState({
        isLoading: false,
        error: false,
        searchPhrase: '',
        data: [],
        pages: 1,
        currentPage: 1,
        currentTab: 'Search',
      });
      return;
    }

    this.setState({
      isLoading: true,
      error: false,
      searchPhrase: value,
      currentPage: page,
      currentTab: 'Search',
    });

    this.apiClient
      .getFilmsByName(value, page)
      .then(({ results, total_pages: totalPages }) => {
        this.setState({ data: results, isLoading: false, pages: totalPages });
      })
      .catch(this.onError);
  };

  onRated = (page = 1) => {
    this.setState({ isLoading: true, error: false, currentPage: page, currentTab: 'Rated' });

    this.apiClient
      .getRatedMovies(page)
      .then(({ results, total_pages: totalPages }) => {
        this.setState({ data: results, isLoading: false, pages: totalPages });
      })
      .catch(this.onError);
  };

  render() {
    const { data, isLoading, error, genres, pages, currentPage, currentTab, searchPhrase } = this.state;

    const hasData = !(isLoading || error);

    const errorMessage = error ? (
      <Alert
        message="Error"
        description="Something went wrong. Try to search something or try later."
        type="error"
        showIcon
      />
    ) : null;
    const loader = isLoading ? <Spin className="spinner" size="large" tip="Searching..." /> : null;
    const content = hasData ? (
      <ItemList
        data={data}
        pages={pages}
        currentPage={currentPage}
        searchPhrase={searchPhrase}
        currentTab={currentTab}
        onSearch={this.onSearch}
        onRated={this.onRated}
      />
    ) : null;
    const searchBar = currentTab === 'Search' ? <SearchBar onSearch={this.onSearch} /> : null;

    return (
      <AppLayout>
        <>
          <Filter
            onSearch={this.onSearch}
            onRated={this.onRated}
            selected={currentTab}
            searchPhrase={searchPhrase}
            currentPage={currentPage}
          />
          {searchBar}
        </>

        <GenreContext.Provider value={genres}>
          {errorMessage}
          {loader}
          {content}
        </GenreContext.Provider>
      </AppLayout>
    );
  }
}

function AppLayout({ children }) {
  const { Header, Content } = Layout;

  const [header, main] = children;

  return (
    <ErrorBoundary>
      <Row>
        <Col lg={5} span={0} />
        <Col className="col-wrapper" lg={14} span={24}>
          <Layout className="wrapper">
            <Header className="header">{header}</Header>

            <Content className="content">
              <Row justify="center">{main}</Row>
            </Content>
          </Layout>
        </Col>
        <Col lg={5} span={0} />
      </Row>
    </ErrorBoundary>
  );
}

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
