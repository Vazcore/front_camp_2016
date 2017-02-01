
const prefix = '';

export default {
  template: require('./layout.html'),
  controller: function ($router) {
    $router.config([
      { path: prefix + '/', name: 'Home', component: 'articleList' },
      { path: prefix + '/articles', name: 'Articles', component: 'articleList' },
      { path: prefix + '/articles/:id', name: 'ArticlesDetails', component: 'articleDetails' },
      { path: prefix + '/articles/article/:mode/:id', name: 'ArticleFormPage', component: 'articleFormPage' }
      
    ]);


  }
};