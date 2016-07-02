(function(){
    
    'use strict';
    
    
    var getEmployeeDetails = function ($http) {
        var vm = this;
        vm.getLists = function () {
            return  $http.get('app/data/employeeJsonList.json');
        };
    };
    
    myModule
            .service("employeeService", getEmployeeDetails);
            
    getEmployeeDetails.injector = ["$http"];
    
})();