class ListController {
	constructor(articleService) {
    this.articleService = articleService;
    this.article = {};
    this.done = false;
  }

  $routerOnActivate(next) {
    this.mode = next.params.mode;
    if (this.mode === 'add') this.handle = this.addNew.bind(this);
    else {
      this.articleService.findById(next.params.id)
      .then(resp => {
        this.article = resp[0];
      }); 
      this.handle = this.updateArticle.bind(this);
    }   
  }

  addNew() {
    console.log('add');
    this.articleService.addArticle(this.article)
    .then(resp => {      
      let id = resp.data.article._id;
      this.article._id = id;
      this.articleService.appendArticle(this.article);
      this.$router.navigate(['Articles']);
    })
    .catch(err => console.log(err));
    this.done = true;
  }

  updateArticle(article) {
    console.log('edit');
    console.log('add');
    this.articleService.updateArticle(this.article)
    .then(resp => {
      this.$router.navigate(['Articles']);
    })
    .catch(err => console.log(err));
    this.done = true;
  }
  
	static get $inject() {
		return ['ArticleService'];
	}
}

export default {
  bindings: {
    $router: '<'
  },
	template: require('./page.html'),
	controllerAs: 'vm',
	controller: ListController
};


