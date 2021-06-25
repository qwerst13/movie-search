import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Layout, Row, Col, Tabs } from 'antd';

import 'antd/dist/antd.css';
import './App.scss';
// important to place components after styles
import ErrorBoundary from './ErrorBoundary';
import ThemoviedbServices from '../services/themoviedb-service';
import GenreContext from '../context';
import SearchPage from './SearchPage';
import RatedPage from './RatedPage';

export default function App() {
  const [genres, setGenres] = useState(new Map());
  const [activeKey, setActiveKey] = useState('1');
  const apiClient = new ThemoviedbServices();

  useEffect(() => {
    Promise.all([apiClient.getGenresMap(), apiClient.getGuestSessionId()]).then(([data]) => {
      setGenres(data);
    });
  }, []);

  const { TabPane } = Tabs;

  return (
    <GenreContext.Provider value={genres}>
      <AppLayout>
        <Tabs defaultActiveKey="1" centered onChange={(key) => setActiveKey(key)}>
          <TabPane tab="Search" key="1">
            <SearchPage />
          </TabPane>

          <TabPane tab="Rated" key="2">
            <RatedPage activeKey={activeKey} />
          </TabPane>
        </Tabs>
      </AppLayout>
    </GenreContext.Provider>
  );
}

function AppLayout({ children }) {
  const { Content } = Layout;

  return (
    <Row>
      <Col lg={5} span={0} />
      <Col className="col-wrapper" lg={14} span={24}>
        <Layout className="wrapper">
          <Content className="content">
            <ErrorBoundary>{children}</ErrorBoundary>
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
