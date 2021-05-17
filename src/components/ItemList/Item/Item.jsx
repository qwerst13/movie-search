import React from 'react';
import { Card, Rate, Row, Space, Tag, Typography } from 'antd';

import ApiClient from '../../../services/ApiClient';

import './Item.scss';

export default class Item extends React.Component {
  apiClient = new ApiClient();

  state = {
    title: null,
    rate: null,
    genres: ['', '', ''],
    releaseDate: null,
    overview: null,
  };

  constructor() {
    super();
    this.updateItem();
  }

  updateItem() {
    this.apiClient.getFilm(101).then((film) => {
      this.setState({
        poster: film.poster_path,
        title: film.title,
        rate: film.vote_average,
        genres: film.genres,
        releaseDate: film.release_date,
        overview: film.overview,
      });
    });
  }

  render() {
    const { poster, title, rate, genres, releaseDate, overview } = this.state;
    const { Title, Text, Paragraph } = Typography;

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
              <Tag className="tag">{genres[0].name || ''}</Tag>
              <Tag className="tag">{genres[1].name || ''}</Tag>
              <Tag className="tag">{genres[1].name || ''}</Tag>
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
          <Rate
            className="rate"
            count={10}
            // todo не работает если передавать rate(
            defaultValue={rate}
            allowHalf
            disabled
          />
        </Card.Grid>
      </Card>
    );
  }
}
