import React from 'react';
import { Layout, Pagination, Row, Col } from 'antd';

import SearchBar from './components/SearchBar';
import Filter from './components/Filter';

import 'antd/dist/antd.css';
import './App.scss';
import ItemList from './components/ItemList';

function App() {
  const { Header, Footer, Content } = Layout;

  return (
    <Row>
      <Col span={5} />
      <Col flex="auto">
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
            <Row justify="center">
              <ItemList />
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

export default App;
