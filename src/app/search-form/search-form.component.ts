namespace app.form {
  'use strict';

  const searchForm = {
    templateUrl: 'app/search-form/search-form.component.html',
    controllerAs: 'vm',
    controller: 'SearchFormController'
  };

  angular
    .module('app')
    .component('searchForm', searchForm);
}