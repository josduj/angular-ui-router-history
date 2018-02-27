;(function() {
'use strict';

var dependencies = ['ui.router'];

angular.module('ui.router.history', dependencies).run(historyRun);

historyRun.$inject = ['$history', '$transitions'];

function historyRun($history, $transitions) {

	var matchNonAbstractStates = {
		to: function to(state) {
			return !state.abstract;
		}
	};

	var matchHistoryStates = {
		to: function to(state) {
			return state.parent.name === 'history';
		}
	};

	$transitions.onStart(matchNonAbstractStates, function (trans) {
		$history.add(trans.to(), trans.params());
	});

	$transitions.onBefore(matchHistoryStates, function (trans) {

		var target = trans.to().name;
		var params = trans.params();

		if (target === 'history.back') {
			return $history.back();
		} else if (target === 'history.go') {
			return $history.go(params.step);
		}
	});
}
angular.module('ui.router.history').factory('$history', historyService);

historyService.$inject = ['$state'];

function historyService($state) {

	var history = [];

	return {
		add: add,
		all: all,
		back: back,
		clear: clear,
		go: go,
		previous: previous
	};

	function add(state, params) {
		history.push({
			state: state,
			params: params
		});
	}

	function all() {
		return history;
	}

	function back() {
		return go(-1);
	}

	function clear() {
		history.splice(0, history.length - 1);
	}

	function go() {
		var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;

		var prev = previous(step);
		return $state.target(prev.state, prev.params);
	}

	function previous() {
		var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

		// last one is always current state
		return history[history.length - Math.abs(step) - 1 || 0];
	}
}
angular.module('ui.router.history').config(historyStates);

historyStates.$inject = ['$stateProvider'];

function historyStates($stateProvider) {

	$stateProvider.state('history', {
		abstract: true
	});

	$stateProvider.state('history.back', {
		abstract: true
	});

	$stateProvider.state('history.go', {
		abstract: true,
		params: {
			step: null
		}
	});
}
}());
