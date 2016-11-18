namespace app.form {
  'use strict';

  var searchForm = {
    templateUrl: 'app/search-form/search-form.component.html',
    controllerAs: 'vm',
    controller: 'SearchFormController'
  };

  angular
    .module('app')
    .component('searchForm', searchForm);
}