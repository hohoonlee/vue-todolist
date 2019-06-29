import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	todoItems:[]
};

const mutations = {
	addTodo(state, todoItem) {
		localStorage.setItem(todoItem.key, todoItem.val);
		state.todoItems.push(todoItem);
	},
	removeAll(state) {
		localStorage.clear();
		state.todoItems = [];
	},
	removeTodo(state, {key, index}) {
		localStorage.removeItem(key);
		state.todoItems.splice(index, 1);
	}
};

const actions = {
	addTodo({commit}, todoItem) {
		commit('addTodo', todoItem);
	},
	removeAll({commit}) {
		commit('removeAll');
	},
	removeTodo({commit}, {key, index}) {
		commit('removeTodo', {key, index});
	}
};

const getters = {
	getTodoItems(state) {
		if(state.todoItems.length == 0) {
			for(let i = 0; i < localStorage.length; i++) {
				const key = localStorage.key(i);
				if (key == 'loglevel:webpack-dev-server') continue;
				state.todoItems.push({key, val:localStorage.getItem(key)});
			}
		}
		return state.todoItems;
	},
	getTodoItem(state, key) {
		return state.todoItems.find(v=>v.key == key);
	}
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
});