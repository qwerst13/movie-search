import React from 'react';
import PropTypes from 'prop-types';

import { Card, Rate, Row, Space, Tag, Typography } from 'antd';

import './Item.scss';
import noImage from './no-image.png';

function Item(props) {
  const { Title, Text, Paragraph } = Typography;
  const { Grid } = Card;
  const {
    data: {
      poster_path: poster = '',
      original_title: title = '',
      vote_average: rate = 0,
      genre_ids: genreIds = [],
      release_date: releaseDate = '',
      overview = '',
    },
    genres,
  } = props;

  const genreTags = genreIds.map((item, i) =>
    i < 3 ? (
      <Tag key={item} className="tag">
        {genres.get(item)}
      </Tag>
    ) : null
  );

  return (
    <Card className="item">
      <Grid hoverable={false} className="poster">
        <img alt="poster" src={poster ? `https://image.tmdb.org/t/p/w200${poster}` : noImage} />
      </Grid>

      <Grid hoverable={false} className="cardContent">
        <Row className="cardTitle" justify="space-between">
          <Title className="titleText" level={4} ellipsis={{ rows: 2, expandable: false }}>
            {title}
          </Title>
          <div className="titleRate">{rate}</div>
        </Row>
        <Space direction="vertical">
          <Text type="secondary">{releaseDate}</Text>

          <Row>{genreTags}</Row>
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

Item.defaultProps = {
  data: {},
  genres: new Map(),
};

Item.propTypes = {
  data: PropTypes.instanceOf(Object),
  genres: PropTypes.instanceOf(Map),
};

export default Item;
