import '../assets/form.css';

export default ($timeout) => {
  return {
    template: `
    <div class="mdl-textfield full-width mdl-js-textfield mdl-textfield--file">
      <img class="img_in_text" ng-src="{{formPreviw || formFileUrl}}" />
      <input class="mdl-textfield__input"
        placeholder="{{formLabel}}" 
        type="text"
        name="{{formLabel}}"
        required
        ng-value="formFileUrl" 
        id="uploadFile" 
        readOnly />
      <div class="mdl-button mdl-button--primary mdl-button--icon mdl-button--file">
        <i class="material-icons">attach_file</i>
        <input type="file"
          onchange="angular.element(this).scope()._onChange(event)" 
          id="formId"} />
      </div>
    </div>
    `,
    restrict: 'A',
    scope: {
      'formPreviw': '=?',
      'formLabel': '@',
      'formValue': '=?',
      'formId': '@',
      'formOnload': '&',
      'formFileUrl': '@?'
    },
    link: (scope) => {

      scope._onChange = (event) => {
        let file = event.target.files[0];
        scope.showPreview(file);
        $timeout(() => {
          scope.formOnload(file);
        }, 1000, true);
      };
      
      scope.showPreview = (file) => {
        var reader = new FileReader();
        reader.onload = (e) => {
          scope.formPreviw = e.target.result;
          scope.formValue = file;
          scope.$apply();
        };

        reader.readAsDataURL(file);
      };
      
    }
  };
};