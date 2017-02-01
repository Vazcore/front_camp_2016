class ListController {
	constructor(articleService) {
    this.articleService = articleService;
    this.articles = [];
  }
	init() {
    if (!this.article) return;
  }

  $routerOnActivate(next) {
    this.articleId = next.params.id;
    this.articleService.findById(this.articleId)
    .then(res => {      
      if(res[0]) this.article = res[0];
    })
    .catch(err => {});
  }
  
	static get $inject() {
		return ['ArticleService'];
	}
}

export default {
	bindings: {
    article: '<',
    $router: '<'
  },
  template: require('./details.html'),
	controllerAs: 'vm',
	controller: ListController,
  bindToController: true
};


