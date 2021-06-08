/* eslint-disable max-len */
export default class ApiClient {
  _host = 'https://api.themoviedb.org/3';

  requestOptions(type, data) {
    const obj = {
      method: type,
      headers: this.headers(),
      redirect: 'follow'
    }
    if (data) obj.body = data;

    return obj;
  }

  headers() {
    const myHeaders = new Headers();

    myHeaders.append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmVhYWQzNGZmYzg5M2VhYzUyYzNmNWFhYzkzNDEzZCIsInN1YiI6IjYwYTE5MjUwMDBiZmU4MDA0MTllY2UyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C9vtZbeC6hb6Q5bWwCk-Ct2xEI-Q_nyE819PaG0ZZlo'
    );

    return myHeaders;
  }

  async getResource(path) {
    const response = await fetch(`${this._host}${path}`, this.requestOptions('GET'));

    if (!response.ok) {
      throw new Error(`Something went wrong: ${response}`);
    }

    return await response.json();
  }

  async getListOfPopularMovies() {
    return await this.getResource('/movie/popular')
  }

  async getFilmById(id) {
    return await this.getResource(`/movie/${id}`);
  }

  async getFilmsByName(keyWord, page) {
    return await this.getResource(`/search/movie?language=en-US&query=${keyWord}&page=${page}&include_adult=false`)
  }

  async getGenresMap() {
     const {genres} = await this.getResource(`/genre/movie/list?language=en-US`);
     const genresMap = new Map();

     genres.forEach(({ id, name }) => {
         genresMap.set(id, name);
     });

     return genresMap;
  }

  async getGuestSessionId() {
    if (!this.getCookie('id')) {
      const { guest_session_id: guestSessionId } = await this.getResource('/authentication/guest_session/new');
      this.setDailyCookie('id', guestSessionId);
    }

    return this.getCookie('id')
  }

  async getRatedMovies() {
    const guestSessionId = this.getCookie('id');

    return await this.getResource(`/guest_session/${guestSessionId}/rated/movies?language=en-US&sort_by=created_at.asc`);
  }

  rateMovie(movieId, value) {
    const guestSessionId = this.getCookie('id');
    const formData = new FormData();
    formData.append("value", value);

    fetch(`${this._host}/movie/${movieId}/rating?guest_session_id=${guestSessionId}`, this.requestOptions('POST', formData));
  }

  setDailyCookie(key, value) {
    let date = new Date(Date.now() + 86400e3);
    date = date.toUTCString();
    document.cookie = `${key}=${value}; path=/; samesite=strict; expires=${date}`;
  }

  getCookie(name) {
    const matches = document.cookie.match(new RegExp(
      `(?:^|; )${  name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')  }=([^;]*)`
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
}
