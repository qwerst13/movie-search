/* eslint-disable */
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Card, Rate, Row, Space, Tag, Typography, Alert, Spin } from 'antd';

import './Item.scss';

// eslint-disable-next-line react/prefer-stateless-function
export default class Item extends React.Component {
  render() {
    const { Title, Text, Paragraph } = Typography;
    const { data } = this.props;

    const {
      poster_path: poster = 'null',
      original_title: title = 'null',
      vote_average: rate = 'null',
      genre_ids: genres = 'null',
      release_date: releaseDate = 'null',
      overview = 'null',
    } = data;

    // eslint-disable-next-line no-unreachable
    return (
      <Card className="item" hoverable>
        <Card.Grid hoverable={false} className="poster">
          <img alt="poster" src={`https://image.tmdb.org/t/p/w200${poster}`} />
        </Card.Grid>

        <Card.Grid hoverable={false} className="cardContent">
          <Row justify="space-between">
            <Title level={4}>{title}</Title>
            <div className="titleRate">{rate}</div>
          </Row>
          <Space direction="vertical">
            <Text type="secondary">{releaseDate}</Text>

            <Row>
              <Tag className="tag">{genres[0]}</Tag>
              <Tag className="tag">{genres[0]}</Tag>
              <Tag className="tag">{genres[0]}</Tag>
            </Row>
            <Paragraph
              ellipsis={{
                rows: 7,
                expandable: false,
              }}
            >
              {overview}
            </Paragraph>
          </Space>
          <Rate className="rate" count={10} defaultValue={rate} allowHalf disabled />
        </Card.Grid>
      </Card>
    );
  }
}
