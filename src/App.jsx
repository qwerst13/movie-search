import React from 'react';

import { Layout, Pagination, Row, Col, Spin, Alert } from 'antd';

import 'antd/dist/antd.css';
import './App.scss';
// important to place components after styles
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import ItemList from './components/ItemList';
import ApiClient from './services/ApiClient';
import GenreContext from './context';

export default class App extends React.Component {
  apiClient = new ApiClient();

  state = {
    data: [],
    isLoading: true,
    error: false,
    genres: new Map(),
    searchPhrase: '',
    pages: 1,
    currentPage: 1,
    currentTab: 'Search'
  };

  componentDidMount() {
    Promise.all([
      this.apiClient.getListOfPopularMovies(),
      this.apiClient.getGenresMap(),
      this.apiClient.getGuestSessionId()
    ])
      .then(([popularFilms, genres]) => {
        this.setState({
          data: popularFilms.results,
          genres,
          isLoading: false,
        });
      })
      .catch(() => this.setState({
        error: true,
        isLoading: false
      }));
  }

  onError = () => {
    this.setState({ error: true, isLoading: false });
  };

  onSearch = (value, page = 1) => {
    if (!value) {
      this.setState({isLoading: false, error: false, searchPhrase: '', data: [], pages: 1, currentPage: 1 });
      return;
    }

    this.setState({ isLoading: true, error: false, searchPhrase: value, currentPage: page });

    this.apiClient
      .getFilmsByName(value, page)
      .then(({ results, total_pages: totalPages }) => {
        this.setState({ data: results, isLoading: false, pages: totalPages });
      })
      .catch(this.onError);
  };

  onRated = (page = 1) => {
    this.setState({ isLoading: true, error: false, currentPage: page });

    this.apiClient
      .getRatedMovies(page)
      .then(({ results, total_pages: totalPages }) => {
        this.setState({ data: results, isLoading: false, pages: totalPages });
      })
      .catch(this.onError);
  }

  onPaginationChange = (page) => {
    const { searchPhrase, currentTab } = this.state;

    if (currentTab === 'Rated') this.onRated(page);
    if (currentTab === 'Search') this.onSearch(searchPhrase, page );
  };

  onTabSelect = (event) => {
    const {key: currentTab} = event;
    const {searchPhrase, currentPage} = this.state;
    this.setState({currentTab});

    if (currentTab === 'Rated') this.onRated();
    if (currentTab === 'Search') this.onSearch(searchPhrase, currentPage);
  }

  render() {

    const { data, isLoading, error, genres, pages, currentPage, currentTab } = this.state;
    const { Header, Footer, Content } = Layout;
    console.log(data)
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
    const content = hasData ? <ItemList data={data} /> : null;
    const searchBar = currentTab === 'Search' ? <SearchBar onSearch={this.onSearch} /> : null;

    return (
      <Row>
        <Col span={5} />
        <Col span={14}>
          <Layout className="wrapper">
            <Header className="header">
              <Row justify="center">
                <Filter onTabSelect={this.onTabSelect} selected={currentTab} />
              </Row>
              <Row justify="center">
                {searchBar}
              </Row>
            </Header>

            <GenreContext.Provider value={genres}>
              <Content className="content">
                <Row justify="center">
                  {errorMessage}
                  {loader}
                  {content}
                </Row>
              </Content>
            </GenreContext.Provider>

            <Footer className="footer">
              <Row justify="center">
                <Pagination
                  size="small"
                  hideOnSinglePage
                  current={currentPage}
                  defaultPageSize={20}
                  pageSizeOptions={[]}
                  total={pages * 20}
                  onChange={this.onPaginationChange}
                />
              </Row>
            </Footer>
          </Layout>
        </Col>
        <Col span={5} />
      </Row>
    );
  }
}
