import angular from 'angular';
import routes from './routes';
import List from './article-list/list';
import ArticleService from './article-list/articles.service';
import ArticleDetails from './article-details/details';
import ArticlePreview from './article-preview/preview';
import ArticleFormPage from './article-form-page/page';
import ArticleForm from './article-form/form';

import InputElement  from './form-elements/input.directive';
import TextElement  from './form-elements/textarea.directive';
import FileElement  from './form-elements/file.directive';

import Pagination  from './ag-pagination/pagination';

import VMinLength from './form-elements/vmin.validator';

import 'angular-route';
import './ng-router';
import './assets/material.css';
import './assets/icons.css';
require('./assets/scripts/material.js');
import './assets/style.css';
import './assets/materialize.css';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['ngRoute', 'ngComponentRouter'])
  .component('agApp', routes)
  .service('ArticleService', ArticleService)
  .component('articleList', List)
  .component('articlePreview', ArticlePreview)
  .component('articleDetails', ArticleDetails)
  .component('articleFormPage', ArticleFormPage)
  .component('articleForm', ArticleForm)

  .directive('inputElement', InputElement)
  .directive('textElement', TextElement)
  .directive('fileElement', FileElement)

  .component('agPagination', Pagination)

  // validator
  .directive('customMinLength', VMinLength);

export default MODULE_NAME;