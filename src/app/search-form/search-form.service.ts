namespace app.form {
  'use strict';

  angular
    .module('app')
    .service('searchFormService', searchFormService);

  function searchFormService() {
    let service = {
      removeDuplicates: removeDuplicates,
      buildSelections: buildSelections
    };
    return service;

    function buildSelections(solutions: any, defaultSelection: string, filter: string): Array<string> {
      let arr: Array<string> = [defaultSelection];
      for (let i = 0; i < solutions.length; i++) {
        arr.push(solutions[i][filter]);
      }
      return arr;
    }

    function removeDuplicates(a: any): Array<any> {
      return Array.from(new Set(a));
    }
  }
}