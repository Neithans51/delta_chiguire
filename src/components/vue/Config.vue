<script setup>
    /* Product Store */
    import { minStock } from '../../stores/productsStore.js';
    import { maxStock } from '../../stores/productsStore.js';
    import { color } from '../../stores/productsStore.js';
    import { oppenConfig } from '../../stores/productsStore.js';
    import { useStore, useVModel } from '@nanostores/vue';

    const $minModel = useVModel(minStock);
    const $maxStock = useStore(maxStock);
    const $maxModel = useVModel(maxStock);
    const $color = useStore(color);
    const $colorModel = useVModel(color);
    const $oppenConfig = useStore(oppenConfig);
</script>

<template>
    <div v-show="true" class="fixed left-0 flex justify-end h-full top-0 z-20" >
        <button @click="oppenConfig.set(!$oppenConfig)" class="`flex p-4 rounded-full w-16 h-16 border-white border-4 mt-4 mr-4`">
            <img src="../../../public/config.svg" alt="shopping cart" class="w-12">
        </button>
    </div>
    <div v-show="$oppenConfig" class="config-container">
        <div class="buttons-conf">
            <div class="color-input">
                <p class="text-black"><b>color</b></p>
                <input type="color" v-model="$colorModel">
            </div>
            <div class="min-input">
                <p class="text-black"><b>min stock</b></p>
                <input type="text" v-model="$minModel">
            </div>
            <div class="max-input">
                <p class="text-black"><b>max stock</b></p>
                <input type="text" v-model="$maxModel">
            </div>
        </div>
    </div>
</template>


<style scoped>
    button {
        background-color: v-bind($color); 
    }  

    button:hover{
		filter: brightness(80%);
	}

    .buttons-conf{
        @apply justify-center flex pl-12 
    }

    .cont-product{
        @apply p-4
    }
    .config-container{
        @apply bg-white m-0 h-24 left-0 fixed z-10 top-0 rounded-r-full;
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
    .color-input{
        @apply mt-2 w-28 ml-10 mr-0;
    }

    .min-input{
        @apply mt-2 w-28 mx-0;
    }

    .max-input{
        @apply mt-2 w-28 mx-8;
    }

    .color-input input{
        @apply w-20 border-2 border-black text-black;
    }

    .min-input input{
        @apply w-28 border-2 border-black text-black text-center;
    }

    .max-input input{
        @apply w-28 border-2 border-black text-black text-center;
    }

    .cont-product h2{
        @apply text-center;
    }

    @media (max-width: 600px){
        .config-container{
            @apply w-96;
        }

        .color-input{
            @apply w-28;
        }
        .min-input{
            @apply w-28;
        }

        .max-input{
            @apply w-28 ml-1;
        }

        .color-input input{
            @apply w-14;
        }
        .min-input input{
            @apply w-14;
        }

        .max-input input{
            @apply w-14;
        }
    }
</style>