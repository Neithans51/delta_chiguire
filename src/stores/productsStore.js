import { atom, map } from "nanostores";

/**
 * Config Store
 */
export const oppenConfig = atom(false);
export const color = atom('#10b981');
export const minStock = atom(40);
export const maxStock = atom(80);


/**
 * Shopping Cart
 */

export const showCart = atom(false);
export const oppenCart = atom(false);
export const cartProducts = map({});
export const totalAmount = atom(0);

export const addProductCart = ({ $id, $price, imageSrc, $stock }) =>{
    showCart.set(true);

    cartProducts.setKey(
        $id,
        { $id, $price, imageSrc, $stock, $minStock: 1 }
    );

    const newTotal = totalAmount.get() + $price;
        
    totalAmount.set(newTotal);
}

export const discardProductCart = ($id) =>{
    const existingEntry = cartProducts.get()[$id];
    const newTotal = totalAmount.get() - existingEntry.$price * existingEntry.$minStock;
    totalAmount.set(newTotal);
    
    cartProducts.setKey(
        $id,
        undefined
    )

    const quantity = Object.keys(cartProducts.value).length;

    if(quantity === 0) {
        oppenCart.set(false);
        showCart.set(false);
        totalAmount.set(0)
    }
}

/**Para agregar mas o menos de product en especifico, ademas de setear el nuevo monto de compra*/
export const accumulateProduct = ($id) =>{
    const existingEntry = cartProducts.get()[$id];

    if(!(existingEntry.$minStock + 1 > existingEntry.$stock)) {
        cartProducts.setKey($id, {
            ...existingEntry,
            $minStock: existingEntry.$minStock + 1,
        })

        const newTotal = totalAmount.get() + existingEntry.$price;
        totalAmount.set(newTotal);
    }
}

export const restProduct = ($id) =>{
    const existingEntry = cartProducts.get()[$id];

    if(!(existingEntry.$minStock - 1 < 1)){
        cartProducts.setKey($id, {
            ...existingEntry,
            $minStock: existingEntry.$minStock - 1,
        })

        const newTotal = totalAmount.get() - existingEntry.$price;
        totalAmount.set(newTotal);
    }
}

