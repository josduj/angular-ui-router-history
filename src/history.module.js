const dependencies = [
	'ui.router',
]

angular
	.module('ui.router.history', dependencies)
	.run(historyRun)

historyRun.$inject = ['$history', '$transitions']

function historyRun($history, $transitions) {

	const matchNonAbstractStates = {
		to: state => {
			return !state.abstract
		},
	}

	const matchHistoryStates = {
		to: state => {
			return state.parent.name === 'history'
		}
	}

	$transitions.onStart(matchNonAbstractStates, trans => {
		$history.add(trans.to(), trans.params())
	})

	$transitions.onBefore(matchHistoryStates, trans => {

		const target = trans.to().name
		const params = trans.params()

		if (target === 'history.back') {
			return $history.back()
		} else if (target === 'history.go') {
			return $history.go(params.step)
		}

	})

}