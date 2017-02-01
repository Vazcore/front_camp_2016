import appModule from '../app';

const articles = [
	{id: 1, title: 'Article1'},
	{id: 2, title: 'Article2'}
];

const articlesOffset = [...articles,
	{id: 3, title: 'Article3'}
];

let countMock = {
	data: {
		success: true
	}
};

let offsetMock = {
	data: {
		articles: articlesOffset
	}
};

describe('List of Articles', () => {
  let suite;

  beforeEach(() => {
  	suite = {};
    angular.mock.module(appModule, ($provide) => {
    	
    });

    angular.mock.inject(($compile, $rootScope, $q, $injector) => {
    	suite.q = $q;
    	
    	suite.componentController = $injector.get('$componentController');
    	suite.parentScope = $rootScope.$new();
    	

    	suite.listCtrl = suite.componentController('articleList', suite.parentScope, {
    		articleService: {
    			getArticles: mockPromise($q, articles),
    			getCount: mockPromise($q, countMock),
    			getOffsetArticles: mockPromise($q, offsetMock),
    			refreshArticles: mockPromise($q)
    		}
    	});

    	//suite.element = $compile('<article-list></article-list>')(suite.parentScope);
    	suite.parentScope.$apply();    	

    });
  });

  afterEach(() => {
  	suite.parentScope.$destroy();
  	//suite.element.remove();
  	suite = null;
  });

  it('should call getArticles on init', () => {  	
  	suite.listCtrl.$onInit();
  	suite.parentScope.$apply();
  	expect(suite.listCtrl.articles).toBe(articles);
  });

  it('shoudl navigate and get offset', () => {
  	suite.listCtrl.$onInit();
  	suite.listCtrl.handleNavigate();
  	suite.parentScope.$apply();
  	expect(suite.listCtrl.navigationInfo.clicks).toBe(1);
  	expect(suite.listCtrl.articles).toBe(articlesOffset);

  })

  it('should handle reject on offset', () => {
  	suite.listCtrl.articleService.getOffsetArticles = () => suite.q.reject({code:'error1'});
		suite.listCtrl.handleNavigate();
  	suite.parentScope.$apply();
  	expect(suite.listCtrl.errors[0].code).toBe('error1');
  });


  function mockPromise(q=false, data=[]) {
  	if (q) suite.q = q;
  	return () => suite.q.when(data);
  }

});
