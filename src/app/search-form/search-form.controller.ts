namespace app.form {
  'use strict';

  angular
    .module('app')
    .controller('SearchFormController', SearchFormController);

  SearchFormController.$inject = ['config', 'dataService', 'searchFormService'];

  function SearchFormController(config: {dataTypes: Object}, dataService: any, searchFormService: any): void {
    var vm = this;
    vm.selectDataType = selectDataType;
    vm.selectIndustryType = selectIndustryType;
    vm.selectProduct = selectProduct;

    activate();

    function activate(): void {
      vm.dataTypes = config.dataTypes;
      vm.dataTypeSelection = vm.dataTypes[0];
      getIndustryTypes();
      getProducts();
    }

    function getDataSet(): any {
      vm.solutions = vm.dataTypeSelection === vm.dataTypes[0] ? dataService.getSolutions() : dataService.getSolutionWins();
      return vm.solutions;
    }

    function getIndustryTypes(): Array<string> {
      var solutions = getDataSet();
      vm.industryTypes = searchFormService.removeDuplicates(searchFormService.buildSelections(solutions, 'any industry', 'industry'));
      vm.industryTypeSelection = vm.industryTypes[0];
      return vm.industryTypes;
    }

    function getProducts(): Array<string> {
      var solutions = getDataSet();
      vm.products = searchFormService.removeDuplicates(searchFormService.buildSelections(solutions, 'any product', 'product'));
      vm.productSelection = vm.products[0];
      return vm.products;
    }

    function selectDataType(key: number): void {
      if (key) {
        vm.dataTypeSelection = vm.dataTypes[key];
      }
      vm.toggleDataList = !vm.toggleDataList;
      vm.showSearch = false;
      getIndustryTypes();
      getProducts();
    }

    function selectIndustryType(industry: string): void {
      if (industry) {
        vm.industryTypeSelection = industry;
      }
      vm.toggleIndustryList = !vm.toggleIndustryList;
      vm.showSearch = false;
    }

    function selectProduct(product: string): void {
      if (product) {
        vm.productSelection = product;
      }
      vm.toggleProductList = !vm.toggleProductList;
      vm.showSearch = false;
    }
  }
}