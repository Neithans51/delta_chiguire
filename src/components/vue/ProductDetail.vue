<script setup>
    import { ref } from  'vue'; 
    import { useStore } from '@nanostores/vue'; 

    const props = defineProps({
        id: {type: Number, default: 0},
        images: {type: Array, default: []},
        title: {type: String, default: ''}, 
        description: {type: String, default: ''}, 
        price: {type: Number, default: 0}, 
        rating: {type: Number, default: 0}, 
        discountPercentage: {type: Number, default: 0}, 
        stock: {type: Number, default: 0}
    });

    /* Product Store */
    import { minStock, maxStock, addProductCart, color } from '../../stores/productsStore.js';

    const $color = useStore(color);

    let messageProduct = ref('');
    let newDiscount = ref(0);
    let totalDiscount = ref(0);
    let newPrice = ref(0);
    let integer = ref('');
    let decimal = ref('');

    if(props.stock >= minStock.value && props.stock <= maxStock.value){
        messageProduct = 'prevent';
        totalDiscount = props.discountPercentage * props.price / 100;
        newPrice = props.price - totalDiscount;
        integer = newPrice.toFixed(2);
        const parts = integer.split('.');
        integer = parts[0];
        decimal = parts[1];
    }
    
    if(props.stock < minStock.value){
        messageProduct = 'warning';
        newDiscount = props.discountPercentage + 5;
        totalDiscount = newDiscount * props.price / 100;
        newPrice = props.price - totalDiscount;
        integer = newPrice.toFixed(2);
        const parts = integer.split('.');
        integer = parts[0];
        decimal = parts[1];
    }

    if(props.stock > maxStock.value){
        newPrice = props.price;
    }

    let roundedRating = ref(0); 
    roundedRating = Math.round(props.rating);

    const mapRating = {
        1: () => ('★☆☆☆☆'),
        2: () => ('★★☆☆☆'),
        3: () => ('★★★☆☆'),
        4: () => ('★★★★☆'),
        5: () => ('★★★★★')
    }
    
    const changeImage = (img) =>{
        const image = document.querySelector(`#${img}`);
        const main_image = document.querySelector('#main-image');
        main_image.src = image.src;
    }

    let numberImage = 0;

    const changeCarrousel = (side) =>{
        const totalImages = document.querySelectorAll('.img-carrousel');
        const quantityImages = totalImages.length - 1;
        const main_image = document.querySelector('#main-image');

        if(side == 'next'){
            if(numberImage + 1 <= quantityImages){
                numberImage++;
                const nextImage = document.querySelector(`#image_${numberImage}`)
                main_image.src = nextImage.src;
            }
        }else if(side == 'prev'){
            if(numberImage - 1 >= 0){
                numberImage--;
                const nextImage = document.querySelector(`#image_${numberImage}`);
                main_image.src = nextImage.src;
            }
        }
    }

    const addProduct = (e) =>{
        e.preventDefault();
        
        const newProduct = {
            $id: props.id,
            $price: newPrice,
            imageSrc: props.images[0],
            $stock: props.stock
        }

        addProductCart(newProduct);
    }

</script>

<template>
    <a href="/" class="return">Volver</a>
    <div class="product-images">
        <div id="main_image">
            <button @click="changeCarrousel('prev')"><b class="text-white">&lt;</b></button>
            <img :src="images[0]" id="main-image" class="image_0">
            <button @click="changeCarrousel('next')"><b class="text-white">></b></button>
        </div>
        <div class="carrousel-cont">
            <div v-for="(image, index) in images" :class="`div_${index}`">
                <img @click="changeImage(`image_${index}`)" :id="`image_${index}`" :src="`${image}`" class="img-carrousel">
            </div>
        </div>
    </div>
    <div class="data-product">
        <h2><b>{{title}}</b></h2>
        
        <p class="mt-4">{{description}}</p>
        
        <div v-if="messageProduct === 'prevent'">
            <h2 class="price"><b>US$ {{integer}}<span class="text-sm">{{decimal}}</span></b></h2>
            <p class="line-through text-slate-400">Original Price: US$ {{price}}</p>
        </div>

        <div v-else-if="messageProduct === 'warning'">
            <h2 class="price"><b>US$ {{integer}}<span class="text-sm">{{decimal}}</span></b></h2>
            <p class="line-through text-slate-400">Original Price: US$ {{price}}</p>
            <p class="line-through text-slate-400">You save {{newDiscount}}%</p>
        </div>

        <h2 v-else class="price"><b>US$ {{newPrice}}</b></h2>
        
        <p><b class="text-2xl text-amber-400">{{mapRating[roundedRating]()}}</b><span class="text-sm">{{rating}}</span></p>

        <div v-if="messageProduct === 'prevent'">
            <p class="text-amber-400 mt-4 flex"><img src="../../../public/warning-null.svg" alt="alert image" class="flex w-6 bg-amber-400 shadow-sm shadow-black mr-1"><b> Low Stock</b></p>
            <p class="text-amber-400">Only {{stock}} are avaliable</p>
        </div>

        <div v-else-if="messageProduct === 'warning'">
            <p class="text-red-500 mt-4 flex"><img src="../../../public/warning-null.svg" alt="warning image" class="flex w-6 bg-red-500 shadow-sm shadow-black mr-1"><b> Very Low Stock</b></p>
            <p class="text-red-500">Hurry Up! Only {{stock}} units left</p>
        </div>

        <p v-else class="text-emerald-500"><b>In Stock</b></p>
        
        <button @click="addProduct" class="addProduct">Add to Cart</button>
    </div>
</template>


<style scoped>
    button {
        background-color: v-bind($color); 
    }  

    a {
        @apply absolute p-4 h-12 text-white rounded-xl;
        background-color: v-bind($color); 
    }  

    a:hover{
        filter: brightness(80%);
    }

    button:hover{
        filter: brightness(80%);
    }

    .data-product{
        @apply w-1/2 ml-5
    }

    .price{
        @apply text-2xl    
    }

    .cont-main-image{
        @apply w-full mb-5;

    }

    .product-images{
        @apply w-1/2 mt-16;
    }

    .carrousel-cont{
        @apply mt-4 gap-3;
        display: grid;
        grid-template-columns: repeat(4, 4rem);
    }

    .product-images .carrousel-cont .img-carrousel{
        width: 80px;
        height: 80px;
        object-fit: cover;
        @apply hover:border-emerald-500 hover:border-4;
    }

    .data-product h2{
        @apply mt-4 text-left;
    }

    .data-product p{
        @apply text-left;
    }

    .data-product .addProduct{
        @apply mt-12 pt-2 pb-2 px-5 block rounded-xl text-center text-white
    }

    #main_image{
        @apply flex justify-center;
    }

    #main_image img{
        max-width: 200px;
        border-radius: 10px;
    }

    #main_image button{
        @apply p-0 h-8 rounded-xl w-8;
        margin-top: 25%;
    }

    #image_0{
        width: 100%;
    }

    @media (max-width: 600px){
        .carrousel-cont{
            grid-template-columns: repeat(1, 4rem);
        }
        .product-images{
            @apply flex justify-end my-0 mx-auto;
        }

        .data-product{
            @apply block my-0 mx-auto;
        }

        .data-product h2{
            @apply text-right;
        }

        .data-product p{
            @apply text-right justify-end;
        }

        .data-product .addProduct{
            @apply mt-12 ml-[50%];
        }

        .return{
            position: relative;
            display: block;
            width: 15%;
            margin: 2rem 3rem;
        }
    }
</style>