export const setLandingContent = ( state, { gallery_images, phone_number, video } ) => {
    state.gallery_images = gallery_images
    state.video = video
    state.phone_number = phone_number
}