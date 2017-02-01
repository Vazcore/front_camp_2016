export default () => {
  return {
    template: `
    <div ng-class="{'is-invalid': formInvalid}"
      class="mdl-textfield full-width mdl-js-textfield mdl-textfield--floating-label">
      <input ng-model="formValue"
        type="{{formType}}" 
        id="{{formId}}" 
        name="{{formLabel}}" 
        class="mdl-textfield__input" required />
      <label for="{{formId}}" class="mdl-textfield__label">{{formLabel}}</label>
    </div>
    `,
    restrict: 'A',
    scope: {
      'formInvalid': '=',
      'formType': '@',
      'formLabel': '@',
      'formValue': '=?',
      'formId': '@'
    }
  };
};