const myHeaders = new Headers();
// eslint-disable-next-line max-len
myHeaders.append(
  'Authorization',
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmVhYWQzNGZmYzg5M2VhYzUyYzNmNWFhYzkzNDEzZCIsInN1YiI6IjYwYTE5MjUwMDBiZmU4MDA0MTllY2UyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C9vtZbeC6hb6Q5bWwCk-Ct2xEI-Q_nyE819PaG0ZZlo'
);

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
};

export default class ApiClient {
  _host = 'https://api.themoviedb.org';

  async getResource(path) {
    // todo отключить в настройках
    // eslint-disable-next-line no-underscore-dangle
    const response = await fetch(`${this._host}${path}`, requestOptions);

    if (!response.ok) {
      throw new Error(`Something went wrong: ${response}`);
    }
    // todo отключить в настройках
    // eslint-disable-next-line no-return-await
    return await response.json();
    // todo catch(error => console.log('error', error));?
  }

  getFilm(id) {
    return this.getResource(`/3/movie/${id}`);
  }
}
