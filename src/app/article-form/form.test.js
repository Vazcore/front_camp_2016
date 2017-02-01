import appModule from '../app';

let article = {_id:1, title: 'Super'};


describe('Form to add Article', () => {
  let suite;

  beforeEach(() => {
  	suite = {};
    angular.mock.module(appModule, ($provide) => {
    	
    });

    angular.mock.inject(($compile, $rootScope, $q, $injector) => {
    	suite.q = $q;
    	
    	suite.componentController = $injector.get('$componentController');
    	suite.parentScope = $rootScope.$new();

      suite.handleSpy = jasmine.createSpy('handle');
    	suite.form = suite.componentController('articleForm', suite.parentScope, {
    		articleService: {
    			uploadFile: mockPromise($q, {data: {url: 'url1'}})    			
    		},
        'handle': suite.handleSpy
    	});

    	suite.parentScope.$apply();    	

    });
  });

  afterEach(() => {
  	suite.parentScope.$destroy();
  	//suite.element.remove();
  	suite = null;
  });

  it('should call getArticles on init', () => {  	
    suite.form.article = article;  
    suite.form.uploadFile();
    suite.parentScope.$apply();     
    expect(suite.form.article.urlToImage).toBe('url1');

    suite.form.submit();
    expect(suite.handleSpy).toHaveBeenCalledWith(suite.form.article);    
  });



  function mockPromise(q=false, data=[]) {
  	if (q) suite.q = q;
  	return () => suite.q.when(data);
  }

});
