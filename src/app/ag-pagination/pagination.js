class ListController {
	constructor(articleService) {
    this.articleService = articleService;
    this.pages = [];
  }
  init() {
    this.pages = this.calcPages();
  }
  calcPages() {
    let pages = [];
    let current = (this.current > 1) ? this.current - 1 : this.current;
    let range = this.current + this.shownPages;
    range = range > this.totalPages ? this.totalPages : range;
    for (let i = current; i <= range; i++) {
      pages.push({id: i});
    }
    return pages;
  }

  $onChanges() {
    this.pages = this.calcPages();
  }

  navigate(id){
    if (this.current === id) return false;
    this.current = id;
    this.onNavigate();
  }
	
	static get $inject() {
		return ['ArticleService'];
	}
}

export default {
  bindings: {
    'totalPages': '<',
    'shownPages': '<',
    'current': '=',
    'onNavigate': '&',
    'clicks': '<'
  },
	template: require('./pagination.html'),
	controllerAs: 'vm',
	controller: ListController
};


