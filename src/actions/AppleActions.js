let actions = {
	//注意这里是actionCreator,返回的是一个函数而不是对象,所以我们要引用中间件thunk
	pickApple: () => (dispatch, getState) => {
		//如果正在摘苹果，则结束这个thunk, 不执行摘苹果
		if (getState().isPicking)
			return;
		//通知开始摘苹果
		dispatch(actions.beginPickApple());
		//发送摘苹果请求
		let url = 'https://hacker-news.firebaseio.com/v0/jobstories.json'
		fetch(url) //这里是模拟请求数据 本demo没有用到后台的数据
			.then(res => {
				//console.log(res);
				let weight = Math.floor(200 + Math.random() * 100);
				dispatch(actions.donePickApple(weight))
			})
			.catch(e => console.log(e))
	},

	beginPickApple: () => ({
		type: 'apple/BEGIN_PICK_APPLE'
	}),

	donePickApple: appleWeight => ({
		type: 'apple/DONE_PICK_APPLE',
		payload: appleWeight
	}),

	failPickApple: errMsg => ({
		type: 'apple/FAIL_PICK_APPLE',
		payload: new Error(errMsg),
		error: true
	}),

	eatApple: appleId => ({
		type: 'apple/EAT_APPLE',
		payload: appleId
	})

};

export default actions;