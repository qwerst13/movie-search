import React from 'react';
import PropTypes from 'prop-types';
import { Card, Rate, Row, Space, Tag, Typography } from 'antd';

import ApiClient from '../../../services/ApiClient';
import GenreContext from '../../../context';

import './Item.scss';
import noImage from './no-image.png';

const apiClient = new ApiClient();

function Item(props) {
  const { Title, Text, Paragraph } = Typography;
  const { Grid } = Card;
  const {
    data: {
      poster_path: poster,
      original_title: title,
      vote_average: rate,
      genre_ids: genreIds,
      release_date: releaseDate,
      rating = 0,
      overview,
      id,
    },
  } = props;

  function createGenreTags() {

    return (
      <GenreContext.Consumer>
        {(genres) => genreIds.map((item, i) =>
          (i < 3) ? (
            <Tag key={item} className="tag">
              {genres.get(item)}
            </Tag>
          ) : null
        )}
      </GenreContext.Consumer>
    );
  }


  function setColor(value) {
    if (value <=3) return '#E90000'
    if (value <=5) return '#E97E00'
    if (value <=7) return '#E9D100'
    return '#66E900'
  }

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
          <div style={{ 'border': `2px solid ${setColor(rate)}` }} className="titleRate">{rate}</div>
        </Row>
        <Space direction="vertical">
          <Text type="secondary">{releaseDate}</Text>

          <Row>{createGenreTags()}</Row>
          <Paragraph
            ellipsis={{
              rows: 6,
              expandable: false,
            }}
          >
            {overview}
          </Paragraph>
        </Space>
        <Rate
          className="rate"
          count={10}
          defaultValue={rating}
          allowHalf
          onChange={(value) => {apiClient.rateMovie(id, value)}}/>
      </Grid>
    </Card>
  );
}

Item.defaultProps = {
  data: {},
};

Item.propTypes = {
  data: PropTypes.instanceOf(Object),
};

export default Item;
