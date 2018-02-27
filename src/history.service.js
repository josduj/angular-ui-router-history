angular
	.module('ui.router.history')
	.factory('$history', historyService)

historyService.$inject = ['$state']

function historyService($state) {

	const history = []

	return {
		add,
		all,
		back,
		clear,
		go,
		previous,
	}

	function add(state, params) {
		history.push({
			state: state,
			params: params
		})
	}

	function all() {
		return history
	}

	function back() {
		return go(-1)
	}

	function clear() {
		history.splice(0, history.length - 1)
	}

	function go(step = -1) {
		const prev = previous(step)
		return $state.target(prev.state, prev.params)
	}

	function previous(step = 1) {
		// last one is always current state
		return history[history.length - Math.abs(step) - 1 || 0]
	}

}