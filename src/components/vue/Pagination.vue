<script setup>
    import { color } from '../../stores/productsStore.js';
    import { useStore } from '@nanostores/vue';

    const props = defineProps({
        prev: {type: String, default: ''},
        next: {type: String, default: ''},
        current: {type: String, default: ''},
        last: {type: String, default: ''}
    })

    const numbers = [];

    for(let i = 1; i <= props.last; i++){
        numbers.push(i);
    }

    const numberOfPages = numbers.filter((v) => (v !== 1));

    numberOfPages.unshift('/')

    const $color = useStore(color);
</script>

<template>
	<div class="pagination">
		<a :href="`${prev}`"><b>Previous</b></a>
        <a v-for="number in numberOfPages" :href="`${number == '/' ? number : '/'+number}`">{{number == '/' ? 1 : number}}</a>
		<a :href="`${next}`"><b>Next</b></a>
	</div>
</template>

<style scoped>
    a{
        background-color: v-bind($color);
    }

    a:hover{
		filter: brightness(80%);
	}

    .pagination{
        @apply flex justify-around w-1/2 mx-auto my-8;
    }

    .pagination a{
        @apply pt-3 pb-3 px-5 block rounded-xl text-center text-white mb-10
    }

    @media (max-width: 1050px){
        .pagination a{
            @apply mx-1;
        }
    }
</style>