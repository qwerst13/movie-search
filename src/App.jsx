import React from 'react';

import { Layout, Pagination, Row, Col, Spin, Alert } from 'antd';

import 'antd/dist/antd.css';
import './App.scss';
// important to place components after css
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import ItemList from './components/ItemList';
import ApiClient from './services/ApiClient';

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
    this.setState({ isLoading: true, error: false, searchPhrase: value, currentPage: page });

    this.apiClient
      .getFilmsByName(value, page)
      .then(({ results, total_pages: totalPages }) => {
        this.setState({ data: results, isLoading: false, pages: totalPages });
      })
      .catch(this.onError);
  };

  onPaginationChange = (page) => {
    const { searchPhrase } = this.state;

    this.onSearch(searchPhrase, page);
  };

  render() {
    const { data, isLoading, error, genres, pages, currentPage } = this.state;
    const { Header, Footer, Content } = Layout;

    const hasData = !(isLoading || error);

    const errorMessage = error ? (
      <Alert
        message="Error"
        description="Something went wrong. Check your Internet connection or try later."
        type="error"
        showIcon
      />
    ) : null;
    const loader = isLoading ? <Spin size="large" tip="Searching..." /> : null;
    const content = hasData ? <ItemList data={data} genres={genres} /> : null;

    return (
      <Row>
        <Col span={5} />
        <Col span={14}>
          <Layout className="wrapper">
            <Header className="header">
              <Row justify="center">
                <Filter />
              </Row>
              <Row justify="center">
                <SearchBar onSearch={this.onSearch} />
              </Row>
            </Header>

            <Content className="content">
              <Row justify="center">
                {errorMessage}
                {loader}
                {content}
              </Row>
            </Content>

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
