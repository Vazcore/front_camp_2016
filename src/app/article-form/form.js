class ListController {
	constructor(articleService) {
    this.articleService = articleService;
    this.article = {};
    this.onUploadFile = this.uploadFile.bind(this);
  }

  submit() {
    this.handle(this.article);
  }

  uploadFile() {
    this.articleService.uploadFile(this.article.file)
    .then(resp => {
      this.article.urlToImage = resp.data.url;
    })
    .catch(err => console.log(err));
  }
  
	static get $inject() {
		return ['ArticleService'];
	}
}

export default {
  bindings: {
    article: '=',
    handle: '&',
    mode: '<'
  },
	template: require('./form.html'),
	controllerAs: 'vm',
	controller: ListController
};


