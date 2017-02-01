import '../assets/article.css';

class PreviewController {
	constructor(articleService) {
    this.articleService = articleService;
    this.articles = [];
  }
	init() {
    this.articleService.getArticles()
    .then(res => {
      this.articles = res;
      //this.scope.$apply();
    }).catch(err => {
      this.errors = err;
    });
  }
  
	static get $inject() {
		return ['ArticleService'];
	}
}

export default {
  bindings:{
    article: '<'
  },
	template: require('./preview.html'),
	controllerAs: 'vm',
	controller: PreviewController,
  bindToController: true
};


