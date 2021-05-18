export default class ApiClient {
  _host = 'https://api.themoviedb.org';

  _requestOptions = {
    method: 'GET',
    headers: this.headers(),
    redirect: 'follow',
  };

  headers() {
    const myHeaders = new Headers();

    myHeaders.append(
      'Authorization',
      // eslint-disable-next-line max-len
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmVhYWQzNGZmYzg5M2VhYzUyYzNmNWFhYzkzNDEzZCIsInN1YiI6IjYwYTE5MjUwMDBiZmU4MDA0MTllY2UyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C9vtZbeC6hb6Q5bWwCk-Ct2xEI-Q_nyE819PaG0ZZlo'
    );

    return myHeaders;
  }

  async getResource(path) {
    const response = await fetch(`${this._host}${path}`, this._requestOptions);

    if (!response.ok) {
      throw new Error(`Something went wrong: ${response}`);
    }
    return await response.json();
    // todo catch(error => console.log('error', error));?
  }

  getFilmById(id) {
    return this.getResource(`/3/movie/${id}`);
  }

  async getFilmsByName(keyWord) {
    // eslint-disable-next-line max-len
    const request = await this.getResource(`/3/search/movie?language=en-US&query=${keyWord}&page=1&include_adult=false`)
    return request.results;
  }
}
