<template>
	<section>
		<transition-group name="list" tag="ul">
			<li v-for='(item, index) in this.$store.getters.getTodoItems' :key='"list-key-" + index' class='shadow'>
				<i class='checkBtn fa fa-square' aria-hidden="true" @click='toggle(item)' v-show='item.val == "N"'></i>
				<i class='checkBtn fa fa-check'  aria-hidden="true" @click='toggle(item)' v-show='item.val == "Y"'></i>
				{{item.key}}
				<span class="removeBtn" type='button' @click='removeItem(item.key, index)'>
					<i class="fa fa-trash-o" aria-hidden="true"></i>
				</span>
			</li>
		</transition-group>
	</section>
</template>

<script>
	export default {
		methods: {
			removeItem(key, index) {
				this.$store.dispatch('removeTodo', {key, index});
			},
			toggle(item) {
				this.$emit('setItem', item.key, (item.val == 'N')?'Y':'N')
			}
		}
    }
</script>

<style scoped>
	ul {
        list-style-type: none;
        padding-left: 0;
        margin-top: 0;
        text-align: left;
    }
    li {
        display: flex;
        min-height: 50px;
        height: 50px;
        line-height: 50px;
        margin: 0.5rem 0;
        padding: 0 0.9rem;
        background: white;
        border-radius: 5px;
    }
    .checkBtn {
        line-height: 45px;
        color: #62acde;
        margin-right: 5px;
    }
    .removeBtn {
        margin-left: auto;
        color: #de4343;
    }

	.list-item {
        display: inline-block;
        margin-right: 10px;
    }
    .list-move {
        transition: transform 1s;
    }
    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }
    .list-enter, .list-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }

</style>