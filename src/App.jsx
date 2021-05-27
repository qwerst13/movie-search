/* eslint-disable */
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
    genres: new Map()
  };

  componentDidMount() {
    this.apiClient.getFilmById(101).then((data) => {
      this.setState({ data: [data], isLoading: false })
    })

    this.apiClient.getGenresMap().then((data) => {
      this.setState({genres: data})
    });
  }

  onError = (error) => {
    this.setState({error: true, isLoading: false})
  }

  onSearch = (value) => {
    this.setState({isLoading: true, error: false});

    this.apiClient.getFilmsByName(value).then((data) => {
      this.setState({ data, isLoading: false });
      console.log(data);
    }).catch(this.onError);
  }

  render() {
    const { data, isLoading, error, genres } = this.state;
    const { Header, Footer, Content } = Layout;

    const hasData = !(isLoading || error);

    const errorMessage = error ? <Alert
      message="Error"
      description="Something went wrong. Check your Internet connection or try later."
      type="error"
      showIcon
    /> : null;
    const loader = isLoading ? <Spin size="large" tip="Searching..." /> : null;
    const content = hasData ? <ItemList data={data} genres={genres} /> : null;

    return (
      // todo раздеслить логику -> AppLayout и рендеринг -> App
      <Row>
        <Col span={5} />
        <Col span={14}>
          <Layout className="wrapper">
            <Header className="header">
              <Row justify="center">
                <Filter />
              </Row>
              <Row justify="center">
                <SearchBar onSearch={this.onSearch}/>
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
                <Pagination size="small" total={50} />
              </Row>
            </Footer>
          </Layout>
        </Col>
        <Col span={5} />
      </Row>
    );
  }
}

const AppLayout = () => {};
