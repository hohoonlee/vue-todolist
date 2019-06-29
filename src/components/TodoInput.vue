<template>
	<div class="inputBox shadow">
		<input type="input" v-model='newTodoItem' @keyup.enter='addTodo' placeholder="Type what you have to do"/>
		<span class="addContainer" @click='addTodo'>
			<i class="addBtn fa fa-plus" aria-hidden="true"></i>
		</span>

		<modal v-if='showModal' @close='showModal=false'>
			<h3 slot='header'>경고</h3>
			<span slot='footer' @click='showModal=false'>
				{{modalMsg}}
				<i class='closeModalBtn fa fa-times' aria-hidden="true"></i>
			</span>
 		</modal>
	</div>
</template>

<script>
	import Modal from './common/Modal';
	export default {
		components: {
			Modal
		},
		data() {
			return {
				newTodoItem:'',
				showModal:false,
				modalMsg: ''
			}
		},
		methods: {
			addTodo() {
				if(!this.newTodoItem) return this.showModalMessage('할 일을 입력하세요.');
				const val = this.newTodoItem.trim();
				if(!val) return this.showModalMessage('할 일을 입력하세요.');
				this.$store.dispatch('addTodo', {key:val, val:'N'});
				this.clearInput();
			},
			clearInput() {
				this.newTodoItem = '';
			},
			showModalMessage(msg) {
				this.showModal = true;
				this.modalMsg = msg;
			}
		}
    }
</script>

<style scoped>
	input:focus {
        outline: none;
    }
    .inputBox {
        background: white;
        height: 50px;
        line-height: 50px;
        border-radius: 5px;
    }
    .inputBox input {
        border-style: none;
        font-size: 0.9rem;
    }
    .addContainer {
        float: right;
        background: linear-gradient(to right, #6478FB, #8763FB);
        display: inline-block;
        width: 3rem;
        border-radius: 0 5px 5px 0;
    }
    .addBtn {
        color: white;
        vertical-align: middle;
    }
</style>