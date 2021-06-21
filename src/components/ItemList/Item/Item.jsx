import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, Rate, Row, Tag, Typography } from 'antd';

import ThemoviedbService from '../../../services/themoviedb-service';
import GenreContext from '../../../context';

import './Item.scss';
import noImage from './no-image.png';

export default function Item(props) {
  const { Title, Text, Paragraph } = Typography;
  const { Grid } = Card;

  const apiClient = new ThemoviedbService();

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

  const genreContext = useContext(GenreContext);

  function createGenreTags() {
    return genreIds.map((item, i) =>
      i < 3 ? (
        <Tag key={item} className="tag">
          {genreContext.get(item)}
        </Tag>
      ) : null
    );
  }

  function setColor(value) {
    if (value <= 3) return '#E90000';
    if (value <= 5) return '#E97E00';
    if (value <= 7) return '#E9D100';
    return '#66E900';
  }

  return (
    <Card className="card">
      <Grid hoverable={false} className="card__poster">
        <img alt="poster" src={poster ? `https://image.tmdb.org/t/p/w200${poster}` : noImage} />
      </Grid>

      <Grid hoverable={false} className="card__content">
        <Row className="card__title title" justify="space-between">
          <Title className="title__text" level={4} ellipsis={{ rows: 2, expandable: false }}>
            {title}
          </Title>
          <div style={{ border: `2px solid ${setColor(rate)}` }} className="title__rate">
            {rate}
          </div>
        </Row>

        <Text className="release-date" type="secondary">
          {releaseDate}
        </Text>

        <Row className="tags">{createGenreTags()}</Row>

        <Paragraph
          className="overview"
          ellipsis={{
            rows: 5,
            expandable: false,
          }}
        >
          {overview}
        </Paragraph>

        <Rate
          className="rate"
          count={10}
          defaultValue={rating}
          allowHalf
          onChange={(value) => {
            apiClient.rateMovie(id, value);
          }}
        />
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
