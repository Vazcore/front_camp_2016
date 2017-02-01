export default () => {
  return {
    template: `
    <div class="mdl-textfield full-width mdl-js-textfield"
      ng-class="{'is-invalid': formInvalid}">
      <textarea class="mdl-textfield__input"
        name="{{formLabel}}"
        type="text"
        ng-model="formValue"
        rows="{{formRows}}"
        custom-min-length="20"
        id="{{formId}}" required>        
      </textarea>
      <label class="mdl-textfield__label" for="{{formId}}">{{formLabel}}</label>
    </div>
    `,
    restrict: 'A',
    scope: {
      'formInvalid': '=',
      'formLabel': '@',
      'formValue': '=?',
      'formId': '@',
      'formRows': '@'
    }
  };
};