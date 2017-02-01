import config from '../app.config';

export default class ArticleService {
	constructor($http, $q) {
		this.http = $http;
		this.q = $q;
    this.articles = [];
	}

  getArticleApi() {
    return this.http.get(config.host + 'news');
  }

  getOffsetArticles(offset, limit) {
    return this.http.get(config.host + 'news/' + offset + '/' + limit);
  }

  getCount() {
    return this.http.get(config.host + 'news/count');
  }

  getArticleByIdApi(id) {
    return this.http.get(config.host + 'news/' + id);
  }

  uploadFile(file) {
    var fd = new FormData();
    fd.append('file', file);
    return this.http({
      method: 'POST',
      url: config.host + 'files/savefile',
      data: fd,
      headers: { 'content-type': undefined }
    });
  }

  refreshArticles(articles) {
    this.articles = articles;
  }

  appendArticle(article) {
    this.articles.push(article);
  }

  updateArticle(article) {
    return this.http({
      method: 'POST',
      url: config.host + 'news/' + article._id,
      data: fullfillFormData(article),
      headers: { 'content-type': undefined }
    });
  }

  addArticle(article) {
    return this.http({
      method: 'POST',
      url: config.host + 'news',
      data: fullfillFormData(article),
      headers: { 'content-type': undefined }
    });
  }

  findById(id) {
    var pr = this.q.defer();
    
    if (!this.articles.length) {
      this.getArticleByIdApi(id)
      .then(resp => {
        this.articles = resp.data.articles;
        pr.resolve(this.articles);
      })
      .catch(err => pr.reject(err));
    } else {
      let article = this.articles.filter(el => el._id === id);
      pr.resolve(article);
    }

    return pr.promise;
  }

	getArticles() {
    var pr = this.q.defer();
    
    if (!this.articles.length) {
      this.getArticleApi()
      .then(resp => {
        this.articles = resp.data.articles;
        pr.resolve(this.articles);
      })
      .catch(err => pr.reject(err));
    } else {
      pr.resolve(this.articles);
    }

    return pr.promise;    
    
	}
}

function fullfillFormData(obj) {
  let fd = new FormData();
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      fd.append(prop, obj[prop]);
    }
  }
  return fd;
}

ArticleService.$inject = ['$http', '$q'];