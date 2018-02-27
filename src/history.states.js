angular
	.module('ui.router.history')
	.config(historyStates)

historyStates.$inject = ['$stateProvider']

function historyStates($stateProvider) {

	$stateProvider.state('history', {
		abstract: true,
	})

	$stateProvider.state('history.back', {
		abstract: true,
	})

	$stateProvider.state('history.go', {
		abstract: true,
		params: {
			step: null,
		},
	})

}