<script setup>
    import { ref } from 'vue';

    /* Product Store */
    import { showCart, oppenCart, totalAmount, cartProducts, addProductCart, discardProductCart, accumulateProduct, restProduct, minStock, maxStock, color } from '../../stores/productsStore';
    import { useStore, useVModel } from '@nanostores/vue';
    /* Product Store*/

    const $minStock = useStore(minStock);
    const $maxStock = useStore(maxStock);
    const $color = useStore(color);
    const $showCart = useStore(showCart);
    const $oppenCart = useStore(oppenCart);
    const $cartProducts = useStore(cartProducts);
    const $totalAmount = useStore(totalAmount);

    

</script>

<template>
    <div v-show="$showCart" class="fixed right-0 flex justify-end h-full top-0 z-10 shoppingCart" > <!-- v-if con localStorage-->
        <button @click="oppenCart.set(!$oppenCart)" class="flex p-4 rounded-full border-white border-4 h-20 mt-4 mr-4">
            <img src="../../../public/shopping-cart.svg" alt="shopping cart" class="w-12">
        </button>
        <div v-if="$oppenCart" class="shopping-cart-container">
            <div v-for="product in Object.values($cartProducts)">
                <div v-if="product.$stock >= $minStock && product.$stock <= $maxStock" class="cont-product">
                    <div class="prevent mark"></div>
                    <img :src="`${product.imageSrc}`">
                    <h2 class="price"><b>US$ {{product.$price.toFixed(2)}}</b></h2>
                    
                    <div class="buttons-cart">
                        <div class="flex">
                            <button @click="restProduct(product.$id)"><span class="button-rest">-</span></button><div class="border-2 border-black p-2">{{product.$minStock}}</div><button @click="accumulateProduct(product.$id)"><span class="button-rest">+</span></button>
                        </div>

                        <button @click="discardProductCart(product.$id)" class="p-2 rounded-xl text-white">Discard</button>
                    </div>
                </div>
                <div v-else-if="product.$stock < $minStock" class="cont-product">
                    <div class="warning mark"></div>
                    <img :src="`${product.imageSrc}`">
                    <h2 class="price"><b>US$ {{product.$price.toFixed(2)}}</b></h2>
                    
                    <div class="buttons-cart">
                        <div class="flex">
                            <button @click="restProduct(product.$id)"><span class="button-rest">-</span></button><div class="border-2 border-black p-2">{{product.$minStock}}</div><button @click="accumulateProduct(product.$id)"><span class="button-rest">+</span></button>
                        </div>
                
                        <button @click="discardProductCart(product.$id)" class="p-2 rounded-xl text-white">Discard</button>
                    </div>
                </div>
                <div v-else class="cont-product">
                    <img :src="`${product.imageSrc}`">
                    <h2 class="price"><b>US$ {{product.$price}}</b></h2>
    
                    <div class="buttons-cart">
                        <div class="flex">
                            <button @click="restProduct(product.$id)"><span class="button-rest">-</span></button><div class="border-2 border-black p-2">{{product.$minStock}}</div><button @click="accumulateProduct(product.$id)"><span class="button-rest">+</span></button>
                        </div>

                        <button @click="discardProductCart(product.$id)" class="p-2 rounded-xl text-white">Discard</button>
                    </div>
                </div>
            </div>
            <div class="totalAmount">
                <h2 class="text-center">Cart Total: <span class="font-bold text-xl">US$ {{$totalAmount.toFixed(2)}}</span></h2>
            </div>
        </div>
    </div>
</template>

<style scoped>
    button{
        background-color: v-bind($color);
    }

    button:hover{
		filter: brightness(80%);
	}

    img{
        border-radius: 10px
    }
    .cont-product{
        @apply p-4 relative
    }
    .shopping-cart-container{
        @apply bg-white w-96 overflow-auto;
    }

    .shopping-cart-container::-webkit-scrollbar:vertical{
        direction: rtl;
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

    .buttons-cart{
        @apply flex justify-around;
    }

    .button-rest{
        @apply rounded-lg px-2 mx-1 text-white;
    }

    .cont-product h2{
        @apply text-center;
    }

    .mark{
        border-radius: 10px;
    }

    @media (max-width: 600px){
        .shopping-cart-container{
            @apply w-60;
        }
    }
</style>