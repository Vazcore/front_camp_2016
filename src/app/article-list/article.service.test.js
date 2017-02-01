import appModule from '../app';

describe('List of Articles', () => {
  let suite;

  beforeEach(() => {
  	suite = {};
    angular.mock.module(appModule, ($provide) => {
    	
    });

    angular.mock.inject(($compile, $rootScope, $q, $injector, ArticleService) => {
    	suite.q = $q;
    	suite.httpBackend = $injector.get('$httpBackend');
      suite.service = ArticleService;	
      

    });
  });

  afterEach(() => {
  	suite = null;
  });

  it('should call getArticles on init', () => {  	
    suite.httpBackend.whenGET(/news/).respond(200, 'news1', {});    
    
    suite.service.getArticleApi().then(d => {
      expect(d.data).toBe('news1');
    });    

    suite.httpBackend.expectGET(/news/);
    suite.httpBackend.flush();
  });

  it('shoud fetch offset', () => {
    suite.httpBackend.whenGET(/news\/3\/3/).respond(200, 'news2', {});    

    suite.service.getOffsetArticles(3,3).then(d => {
      expect(d.data).toBe('news2');
    });    

    suite.httpBackend.expectGET(/news\/3\/3/);
    suite.httpBackend.flush();
  });

  it('shoud fetch getCount', () => {
    suite.httpBackend.whenGET(/news\/count/).respond(200, 'news3', {});    

    suite.service.getCount().then(d => {
      expect(d.data).toBe('news3');
    });    

    suite.httpBackend.expectGET(/news\/count/);
    suite.httpBackend.flush();
  });

  it('shoud fetch ArticleById', () => {
    suite.httpBackend.whenGET(/news\/1/).respond(200, 'news4', {});    

    suite.service.getArticleByIdApi(1).then(d => {
      expect(d.data).toBe('news4');
    });    

    suite.httpBackend.expectGET(/news\/1/);
    suite.httpBackend.flush();
  });

  it('shoud fetch ArticleById', () => {
    suite.httpBackend.whenPOST(/files\/savefile/).respond(200, 'saved', {});    

    suite.service.uploadFile({type:'image'}).then(d => {
      expect(d.data).toBe('saved');
    });    

    suite.httpBackend.expectPOST(/files\/savefile/);
    suite.httpBackend.flush();
  });

  it('shoud call and find by id', () => {    
    suite.httpBackend.whenGET(/news\/1/).respond(200, {articles:'news1'}, {});    
    suite.httpBackend.whenGET(/news\/2/).respond(200, {articles:'news2'}, {});    

    suite.service.findById(1).then(d => {
      expect(d).toBe('news1');
    });    

    suite.httpBackend.expectGET(/news\/1/);
    
    suite.service.articles = [{_id: 2, title:'news1'}];
    suite.service.findById(2).then(d => {
      expect(d[0]._id).toBe(2);
    });

    suite.httpBackend.flush();
  });

  it('shoud call getArticles', () => {    
    suite.httpBackend.whenGET(/news/).respond(200, {articles:'news1'}, {});    

    suite.service.getArticles().then(d => {
      expect(d).toBe('news1');
    });    

    suite.httpBackend.flush();
  });

  it('should update article', () => {
    let article = {_id: 5, title: 'news5'};
    suite.httpBackend.whenPOST(/news\/5/).respond(200, {articles:'news1'}, {});    

    suite.service.updateArticle(article);

    suite.httpBackend.expectPOST(/news\/5/);    

    suite.httpBackend.flush();
  });  

  function mockPromise(q=false, data=[]) {
  	if (q) suite.q = q;
  	return () => suite.q.when(data);
  }

});
