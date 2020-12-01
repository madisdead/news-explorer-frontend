const apiOptions = {
  baseUrl: 'https://newsapi.org/v2/everything?',
}

class NewsApi {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _dateToRequestFormat(date) {
    let dateFormat = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    return dateFormat;
  }

  renderLoading(isLoading) {
    if(isLoading) {
      document.querySelector('.preloader').classList.add('preloader_visiable');
    } else {
      document.querySelector('.preloader').classList.remove('preloader_visiable');  
    }
  }

  getNews(keyword) {
    const prevDate = new Date();
    const date = new Date();
    prevDate.setDate(prevDate.getDate() - 7);
    let dateFormat = this._dateToRequestFormat(date);
    let prevDateFormat = this._dateToRequestFormat(prevDate);

    this.renderLoading(true);
    return fetch(`${this._url}q=${keyword}&from=${prevDateFormat}&to=${dateFormat}&language=ru&pageSize=100&apiKey=8e16fed5da314c2086196fbd9bce74fd`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .finally(() => {
        this.renderLoading(false);
      });
  }
}

const newApi = new NewsApi(apiOptions);

export default newApi;