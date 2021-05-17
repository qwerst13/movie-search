import React from 'react';
import { Row, Col } from 'antd';

import Item from './Item';

import './ItemList.scss';

function ItemList() {
  return (
    <div>
      <Row className="rowWrapper" gutter={24}>
        <Col span={12}>
          <Item />
        </Col>
        <Col span={12}>
          <Item />
        </Col>
      </Row>

      <Row className="rowWrapper" gutter={24}>
        <Col span={12}>
          <Item />
        </Col>
        <Col span={12}>
          <Item />
        </Col>
      </Row>
    </div>
  );
}

export default ItemList;
