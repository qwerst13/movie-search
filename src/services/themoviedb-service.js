export default class ThemoviedbServices {
  _host = 'https://api.themoviedb.org/3';

  _key = process.env.REACT_APP_API_KEY;

  requestOptions(type, data) {
    const obj = {
      method: type,
      redirect: 'follow'
    }
    if (data) obj.body = data;

    return obj;
  }

  async request(path, queryString, options) {
    const response = await fetch(`${this._host}${path}?api_key=${this._key}${queryString}`, options);

    if (!response.ok) {
      throw new Error(`Something went wrong: ${response}`);
    }

    return await response.json();
  }

  async getListOfPopularMovies() {
    return await this.request('/movie/popular',
      '',
      this.requestOptions('GET'))
  }

  async getFilmById(id) {
    return await this.request(
      `/movie/${id}`,
      '',
      this.requestOptions('GET')
      );
  }

  async getFilmsByName(keyWord, page) {
    return await this.request(
      `/search/movie`,
      `&language=en-US&query=${keyWord}&page=${page}&include_adult=false`,
      this.requestOptions('GET')
    )
  }

  async getGenresMap() {
     const {genres} = await this.request(
       `/genre/movie/list`,
       `&language=en-US`,
       this.requestOptions('GET')
       );
     const genresMap = new Map();

     genres.forEach(({ id, name }) => {
         genresMap.set(id, name);
     });

     return genresMap;
  }

  async getGuestSessionId() {
    if (!this.getCookie('id')) {
      const { guest_session_id: guestSessionId } = await this.request(
        '/authentication/guest_session/new',
        '',
        this.requestOptions('GET')
      );
      this.setDailyCookie('id', guestSessionId);
    }

    return this.getCookie('id')
  }

  async getRatedMovies(page) {
    const guestSessionId = this.getCookie('id');

    return await this.request(
      `/guest_session/${guestSessionId}/rated/movies`,
      `&page=${page}&language=en-US&sort_by=created_at.asc`,
      this.requestOptions('GET')
    );
  }

  rateMovie(movieId, value) {
    const guestSessionId = this.getCookie('id');
    const formData = new FormData();
    formData.append("value", value);

    this.request(
      `/movie/${movieId}/rating`,
      `&guest_session_id=${guestSessionId}`,
      this.requestOptions('POST', formData)
    )
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
