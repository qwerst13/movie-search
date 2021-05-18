/* eslint-disable */
import React from 'react';
import { Layout, Pagination, Row, Col, Spin } from 'antd';

import SearchBar from './components/SearchBar';
import Filter from './components/Filter';

import 'antd/dist/antd.css';
import './App.scss';
import ItemList from './components/ItemList';
import ApiClient from './services/ApiClient';

export default class App extends React.Component {
  apiClient = new ApiClient();

  state = {
    data: [],
    isLoading: true,
  };

  constructor() {
    super();
    this.apiClient.getFilmsByName('return').then((data) => {
      this.setState({ data, isLoading: false });
      console.log(data);
    });
  }

  render() {
    const { data, isLoading } = this.state;
    const { Header, Footer, Content } = Layout;

    const loader = <Spin size="large" tip="Loading..." />;
    const content = <ItemList data={data} />;

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
                <SearchBar />
              </Row>
            </Header>

            <Content className="content">
              <Row justify="center">{isLoading ? loader : content}</Row>
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
