namespace app.core {
  'use strict';

  const dataTypes = {
    0: 'solution',
    1: 'solution win'
  };

  let config = {
    dataTypes: dataTypes
  };

  angular
    .module('app')
    .value('config', config);
}