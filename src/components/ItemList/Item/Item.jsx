/* eslint-disable */
import React from 'react';
import { Card, Rate, Row, Space, Tag, Typography } from 'antd';

import './Item.scss';
import noImage from './no-image.png';

export default class Item extends React.Component {
  render() {
    const { Title, Text, Paragraph } = Typography;
    const { Grid } = Card;
    const { data, genres } = this.props;

    const {
      poster_path: poster = 'null',
      original_title: title = 'null',
      vote_average: rate = 'null',
      genre_ids: genreIds = [],
      release_date: releaseDate = 'null',
      overview = 'null',
    } = data;

    const genreTags = genreIds.map((item, i) => {
      return (i<3) ? <Tag key={item} className="tag">{genres.get(item)}</Tag> : null;
    });

    return (
      <Card className="item">
        <Grid hoverable={false} className="poster">
          <img alt="poster" src={poster ? `https://image.tmdb.org/t/p/w200${poster}` : noImage} />
        </Grid>

        <Grid hoverable={false} className="cardContent">
          <Row className='cardTitle' justify="space-between">
            <Title className='titleText' level={4}>{title}</Title>
            <div className="titleRate">{rate}</div>
          </Row>
          <Space direction="vertical">
            <Text type="secondary">{releaseDate}</Text>

            <Row>
              {genreTags}
            </Row>
            <Paragraph
              ellipsis={{
                rows: 6,
                expandable: false,
              }}
            >
              {overview}
            </Paragraph>
          </Space>
          <Rate className="rate" count={10} defaultValue={rate} allowHalf disabled />
        </Grid>
      </Card>
    );
  }
}
