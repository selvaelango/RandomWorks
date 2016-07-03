(function ($) {
    
    'use strict';
    
    var Initialize = function (employeeService, $scope, $filter) {
        var vm = this;
                
        vm.EmployeeInfoLists = [];
        
        vm.Name = "";
        vm.Department = "";
        vm.EmployeeNumber = "";
        vm.showEditButton = false;
        vm.selected = employeeWrapper.jsonStructure;
        vm.isAddButtonEnabled = false;
       
        var getEmployeeSuccess = function (response) {
            //Your success code
           vm.EmployeeInfoLists  = response.data;
        };
        var getEmployeeFailure = function (response) {
            //Your failure code
           console.log(response);
        };
        var getEmployeeCatch = function (response) {
           //Your catch code
           console.log(response);
        };
        
        employeeService.getLists().then(getEmployeeSuccess, getEmployeeFailure).catch(getEmployeeCatch);
        
        var RemoveEmptyItemFromEmployee = function () {
            //Remove empty array
            angular.forEach(vm.EmployeeInfoLists, function(value, key) {
                if ((vm.EmployeeInfoLists[key].Name == null || vm.EmployeeInfoLists[key].Name == "") &&
                    (vm.EmployeeInfoLists[key].Department == null || vm.EmployeeInfoLists[key].Department == "") &&
                    (vm.EmployeeInfoLists[key].EmployeeNumber == null || vm.EmployeeInfoLists[key].EmployeeNumber == "")) {
                    var index = vm.EmployeeInfoLists.indexOf(key);
                    vm.EmployeeInfoLists.splice(index, 1);
                }
            });
        };
        
        vm.editEmployeeelection = function(k1){
           
           //Code block that restore previously edited array data to its corresponsing array index
           //if user not clicked the save button of previous array element
            
           var previousSelectedArray = $filter('filter')(vm.EmployeeInfoLists , { showEditButton: true });
           
           if(previousSelectedArray.length > 0){
                previousSelectedArray[0].showEditButton = false;
                vm.EmployeeInfoLists[previousSelectedArray[0].Id - 1] = previousSelectedArray[0];
                
                if(!previousSelectedArray[0].savedButtonClicked){
                     previousSelectedArray[0].Name = vm.Name;
                     previousSelectedArray[0].Department = vm.Department;
                     previousSelectedArray[0].EmployeeNumber = vm.EmployeeNumber;                   
                }
           }
           
           RemoveEmptyItemFromEmployee();//Remove empty array
           
           vm.selected  = k1;
           
           k1.showEditButton = true;
           k1.savedButtonClicked = false;
           
           vm.Name = k1.Name;
           vm.Department = k1.Department;
           vm.EmployeeNumber = k1.EmployeeNumber;
           vm.isAddButtonEnabled = true;
        };
        
        vm.saveEmployeeelection = function(id){
            
            
            vm.selected.Id = (angular.isUndefined(vm.selected.Id) || vm.selected.Id == null) ? id : vm.selected.Id;
            vm.EmployeeInfoLists[id] = angular.copy(vm.selected);
            vm.EmployeeInfoLists[id].showEditButton  = false;
            vm.EmployeeInfoLists[id].savedButtonClicked = true;
            vm.selected = employeeWrapper.jsonStructure;
            vm.isAddButtonEnabled = false; 
        };
        
         vm.cancelEmployeeelection = function(id){
             vm.EmployeeInfoLists[id].showEditButton  = false;
             vm.selected = employeeWrapper.jsonStructure;
             vm.isAddButtonEnabled = false; 
             RemoveEmptyItemFromEmployee();
        };
       
         vm.addKid = function(k1, id){
             vm.EmployeeInfoLists.push(k1);
             k1.Id = id; 
             k1.showEditButton = true;
             vm.isAddButtonEnabled = true; 
        };
        
    };
    
    Initialize.$inject = ["employeeService", "$scope", "$filter"]
    
    var onRenderDropdown = function () {
        var linkFunc = function (scope, element, attrs) {
            
            $(".btnEdit").on("click", function(){
                console.log("clicked")
                $(".selectpicker").selectpicker('refresh');
            });
            
            
            $(".selectpicker").selectpicker('refresh');
        };
        
        var directive = {
            restrict: 'EA',
            scope: {},
            link: linkFunc
        };
        return directive;
    };
    
    myModule
            .controller("employeeListController", Initialize)
            .directive('renderDropdown', onRenderDropdown);

    onRenderDropdown.$inject = [];
                
})($);