class ListController {
	constructor(articleService, $timeout) {
    this.articleService = articleService;
    this.articles = [];
    this.errors = [];
    this.timeout = $timeout;
    this.navigationInfo = { current: 1, totalPages: 0, shownPages: 2, perPage: 2, clicks:0 };
  }
  $onInit() {
    this.init();
  }
	init() {
    this.articleService.getArticles()
    .then(res => {
      this.articles = res;
    }).catch(err => console.log(err));

    this.articleService.getCount()
    .then(res => {
      if (res.data.success === true) this.navigationInfo.totalPages = Math.ceil(res.data.count / this.navigationInfo.perPage);
    })
    .catch(err => console.log(err));
  }

  onNavigate() {
    this.timeout(() => {
      this.handleNavigate();
    }, true);
    
  }

  handleNavigate() {
    let current = this.navigationInfo.current;
    let offset = (current - 1) * this.navigationInfo.perPage;
    this.articleService.getOffsetArticles(offset, this.navigationInfo.perPage)
    .then(res => {
      this.articles = res.data.articles;
      this.articleService.refreshArticles(this.articles);
      this.navigationInfo.clicks = this.navigationInfo.clicks + 1; 
    })
    .catch(err => this.errors = [err]);
  }
  
	static get $inject() {
		return ['ArticleService', '$timeout'];
	}
}

export default {
	template: require('./list.html'),
	controllerAs: 'vm',
	controller: ListController
};


