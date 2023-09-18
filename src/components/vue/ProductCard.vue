<script setup>
    import { ref, onUpdated } from 'vue';

    const props = defineProps({
        id: {type: Number, default: 0},
        images: {type: Array, defaul: []},
        description: {type: String, defaul: ''},
        price: {type: Number, defaul: 0},
        title: {type: String, default: ''},
        category: {type: String, default: ''},
        stock: {type: Number, default: 0}
    });

    /* Product Store */
    import { minStock, maxStock, color } from '../../stores/productsStore';
    import { useStore } from '@nanostores/vue';

    let productMarked = ref('');
    const $minStock = useStore(minStock);
    const $maxStock = useStore(maxStock);
    const $color = useStore(color);
    /* Product Store */

    /*if( props.stock >= $minStock.value  && props.stock <= $maxStock.value){
        productMarked = 'prevent';
    }

    if(props.stock < $minStock.value){
        productMarked = 'warning';
    }*/
</script>

<template>
    <div class="cont-product">
        <div v-if="props.stock >= $minStock  && props.stock <= $maxStock" class="prevent mark" />
        <di v-else-if="props.stock < $minStock" class="warning mark" />
        <img :src="`${images[0]}`">
        <h2>
            {{title}}
        </h2>
        <p>{{description}}</p>
        <h2 class="price"><b>US$ {{price}}</b></h2>
        <a :href="`products/${category}-${id}`" v-bind:class="`bg-[${$color}]`">
            Details
        </a>
    </div>
</template>

<style scoped>

    h2{
        @apply text-black mt-4
    }

    img{
        @apply h-1/2 w-full;
        border-radius: 10px;
    }

    p{
        @apply mt-4 text-black;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    a{
        @apply pt-2 pb-2 px-5 my-12 block rounded-xl text-center;
        background-color: v-bind($color);
    }

    a:hover{
		filter: brightness(80%);
	}

    .cont-product{
        margin-top: 3rem;
        padding: 1rem;
        border: 1px solid;
        border-color: v-bind($color);
        height: 35rem;
        border-radius: 10px;
    }
    .cont-product:hover{
        box-shadow: 5px 10px v-bind($color);
    }
    .price{
        @apply mt-4
    }

    .cont-product .prevent{
        position: absolute;
        width: 0;
        height: 0;
        border-right: 20px solid transparent;
        border-top: 20px solid darkorange;
        border-left: 20px solid darkorange;
        border-bottom: 20px solid transparent;
    }

    .cont-product .warning{
        position: absolute;
        width: 0;
        height: 0;
        border-right: 20px solid transparent;
        border-top: 20px solid red;
        border-left: 20px solid red;
        border-bottom: 20px solid transparent;
    }

    .mark{
        border-radius: inherit;
    }
</style>    