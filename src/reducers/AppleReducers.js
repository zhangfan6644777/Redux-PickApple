import Immutable from 'immutable';
const IninState = {
	ispacking: false,
	newAppleId: 3,
	apples: [{
		id: 1,
		weight: 233,
		isEaten: false
	}, {
		id: 2,
		weight: 220,
		isEaten: false
	}]
}
export default (state = IninState, action) => {
	let newState;
	switch (action.type) {
		case 'apple/BEGIN_PICK_APPLE':
			// state.ispacking = true;
			// newState = Object.assign({}, state)
			// console.log('开始摘苹果')
			//return newState
			return Immutable.fromJS(state).set('ispacking', true).toJS();
		case 'apple/DONE_PICK_APPLE':
			let newApple = {
					id: state.newAppleId,
					weight: action.payload,
					isEaten: false
				}
				// state.apples.push(newApple);
				// state.newAppleId++;
				// state.ispacking = false;
				// newState = Object.assign({}, state);
				// console.log('摘苹果完成')
				// return newState;
			return Immutable.fromJS(state).update('apples', list => list.push(newApple))
				.set('newAppleId', state.newAppleId + 1)
				.set('ispacking', false)
				.toJS()
		case 'apple/FAIL_PICK_APPLE':
			// state.ispacking = false;
			// newState = Object.assign({}, state);
			// console.log('摘苹果失败');
			//return newState;
			return Immutable.fromJS(state).set('ispacking', false).toJS();
		case 'apple/EAT_APPLE':
			// state.apples[action.payload - 1].isEaten = true;
			// newState = Object.assign({}, state);
			// console.log(newState);
			//return newState;
			return Immutable.fromJS(state).setIn(['apples', action.payload - 1, 'isEaten'], true).toJS();
		default:
			return state;
	}
}