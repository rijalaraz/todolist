
(function () {
	'use strict';

	angular.module('todoCtrl', [])

	/**
	 * The main controller for the app. The controller:
	 * - retrieves and persists the model via the todoStorage service
	 * - exposes the model to the template and provides event handlers
	 */
	.controller('TodoCtrl', function TodoCtrl($scope, $location, todoStorage, filterFilter) {
		
		var todos = $scope.todos = todoStorage.get();

		$scope.$watch('todos',function(){
			$scope.remaining = filterFilter(todos,{completed:false}).length;
			$scope.allchecked = !$scope.remaining;

			// Save any changes to localStorage
			todoStorage.put(todos);
		}, true);


		if( $location.path() === '' ) $location.path('/');
		$scope.location = $location;
		$scope.$watch('location.path()', function(path){
			$scope.statusFilter = 	(path === '/active') ? {completed: false} : 
									(path === '/done') ? {completed: true} : 
									'';
		});


		$scope.removeTodo = function(index){
			todos.splice(index,1);
		};

		$scope.addTodo = function(){
			todos.push({
				name: $scope.newtodo,
				completed: false
			});
			$scope.newtodo = '';
		};

		$scope.checkAllTodo = function(allchecked){
			todos.forEach(function(todo){
				todo.completed = allchecked;
			});
		};

		$scope.editTodo = function(todo){
			todo.editing = false;
		};

		$scope.clearCompletedTodos = function () {
			$scope.todos = todos = todos.filter(function (todo) {
				return !todo.completed;
			});
		};

	});

})();

