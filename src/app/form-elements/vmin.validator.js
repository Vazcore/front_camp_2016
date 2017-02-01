export default () => {
  return {
    require: 'ngModel',
    link: (scope, elem, attr, ngModel) => {
      var min = parseInt(attr.customMinLength);

      ngModel.$parsers.unshift(val => {
        var length = val ? val.length : 0;
        var valid = length >= min;
        ngModel.$setValidity('customMinLength', valid);
        return valid ? val : undefined;
      });

      ngModel.$formatters.unshift(val => {
        var length = val ? val.length : 0;
        ngModel.$setValidity('customMinLength', length >= min);
        return val;
      });

    }
  };
};