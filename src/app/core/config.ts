namespace app.core {
  'use strict';

  const dataTypes = {
    0: 'solution',
    1: 'solution win'
  };

  const config = {
    dataTypes: dataTypes
  };

  angular
    .module('app')
    .value('config', config);
}