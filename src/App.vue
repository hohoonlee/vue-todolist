<template>
  	<div id="app">
		<TodoHeader></TodoHeader>
		<TodoInput @addTodo='addTodo'></TodoInput>
		<TodoList @removeItem='removeItem' @setItem='setTodo'></TodoList>
		<TodoFooter @clearTodo='clearTodo'></TodoFooter>
	</div>
</template>

<script>
import TodoHeader 	from './components/TodoHeader';
import TodoFooter 	from './components/TodoFooter';
import TodoInput 	from './components/TodoInput';
import TodoList 	from './components/TodoList';

export default {
	components: {
		TodoHeader,
		TodoFooter,
		TodoInput,
		TodoList
	},
	methods: {
		addTodo(val) {
			if(this.$store.state.todoItems.includes(val)) return;
			// this.todoItems.push({key:val, val:'N'});
			localStorage.setItem(val, 'N');
			this.$store.state.todoItems.push({key:val, val:'N'});
		},
		setTodo(key, val) {
			localStorage.setItem(key, val);
			// this.todoItems.find(item=>item.key == key).val = val;
			this.$store.state.todoItems.find(item=>item.key == key).val = val;
		},
		removeItem(val, index) {
			localStorage.removeItem(val);
			// this.todoItems.splice(index, 1);
			this.$store.state.todoItems.splice(index, 1);
		},
		clearTodo() {
			localStorage.clear();
			// this.todoItems.splice(0, this.todoItems.length);
			this.$store.state.todoItems.splice(0, this.$store.state.todoItems.length);
		},
		readItem() {
			if(!localStorage.length) return;
			// this.todoItems.splice(0, this.todoItems.length-1);
			this.$store.state.todoItems.splice(0, this.$store.state.todoItems.length-1);
			for(let i = 0; i < localStorage.length; i++) {
				const key = localStorage.key(i);
				if (key == 'loglevel:webpack-dev-server') continue;
				// this.todoItems.push({key, val:localStorage.getItem(key)});
				this.$store.state.todoItems.push({key, val:localStorage.getItem(key)});
			}
		}
	},
	created() {
		this.readItem();
	},
};
</script>

<style>
	body {
		text-align: center;
		background-color: #f6f6f8;
	}
	input {
		border-style: groove;
		width: 200px;
	}
	button {
		border-style: groove;
	}
	.shadow {
		box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
	}
</style>