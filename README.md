# angular-ui-router-history

Angular.js module for adding history support to UI-Router 1.x

## Usage

Add `ui.router.history` as dependency.
```javascript
const app = angular.module('exampleApp', ['ui.router', 'ui.router.history'])

```

Usage in controller:
```javascript
app.controller('exampleCtrl', function($state, $history) {

	this.onGoBack = () => {
		// use $history service
		$history.go(-1)
		$history.back()

		// or use $state service
		$state.go('history.back')
		$state.go('history.go', { step: -3 })
	}

	// get n-th entry
	const previous = $history.previous(1)
	console.log(previous)
	-> { state: { name: 'foo', ... }, params: { foo: 'bar' } }


	// get entire history
	const history = $history.all()
	console.log(history)
	-> [{ state: {...}, params: {...} }, ...]

	// manually add to history
	$history.add($state.current, $state.params)

	// clear history
	$history.clear()

})
```

Usage in template:
```html
<a ui-sref="history.back">go back</a>
<a ui-sref="history.go({ step: -3 })">go back 3 states</a>
```