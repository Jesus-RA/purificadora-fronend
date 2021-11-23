export const setOrders = ( state, orders ) => {
    state.orders = [ ...orders ]
}

export const setProductPrice = ( state, productPrice ) => {
    state.product_price = productPrice
}

export const setCompanyData = ( state, data ) => {

    state.product_price = data.product_price
    state.main_image = data.main_image
    state.gallery_images = data.gallery_images
    state.video = data.video
    state.phone = data.phone_number

}