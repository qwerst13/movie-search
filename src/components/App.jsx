/* eslint-disable */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import { Layout, Row, Col, Spin, Alert, Tabs } from 'antd';

import 'antd/dist/antd.css';
import './App.scss';
// important to place components after styles
import ErrorBoundary from './ErrorBoundary';
import ThemoviedbServices from '../services/themoviedb-service';
import GenreContext from '../context';
import SearchPage from '../components/SearchPage';
import RatedPage from '../components/RatedPage';

export default function App() {
  const [genres, setGenres] = useState(new Map());
  const [activeKey, setActiveKey] = useState(1);
  const apiClient = new ThemoviedbServices();

  useEffect(() => {
    Promise.all([
      apiClient.getGenresMap(),
      apiClient.getGuestSessionId(),
    ])
      .then(([genres]) => {
        setGenres(genres);
      })
  },[]);

  const {TabPane} = Tabs;

  return (
      <GenreContext.Provider value={genres}>
        <AppLayout>
          <Tabs defaultActiveKey="1" centered onChange={(key) => setActiveKey(key)}>
            <TabPane tab="Search" key="1">
              <SearchPage />
            </TabPane>

            <TabPane tab="Rated" key="2">
              <RatedPage activeKey={activeKey}/>
            </TabPane>
          </Tabs>
        </AppLayout>
      </GenreContext.Provider>
  )
}

function AppLayout({ children }) {
  const { Content } = Layout;

  return (
    <Row>
      <Col lg={5} span={0} />
      <Col className="col-wrapper" lg={14} span={24}>
        <Layout className="wrapper">
          <Content className="content">
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </Content>
        </Layout>
      </Col>
      <Col lg={5} span={0} />
    </Row>
  );
}

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
};


/*
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


*/
