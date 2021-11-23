<template>
    <div class="container">
        <div class="row d-flex align-items-center vh-100">

            <div class="col-md-6 my-auto">
                <h2 class="text-primary">
                    Sobre nosotros
                </h2>

                <p>
                    <span class="text-primary">Agua Emperador</span>
                    Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.
                </p>

                <p>
                    Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.
                </p>

                <p>
                    Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.
                </p>
            </div>

            <div class="col-md-6 h-75">
                <div class="h-100 d-flex align-items-center">
                    <carousel-3d width="400" autoplay>
                        <slide
                            v-for="(image, index) in gallery_images"
                            :key="index"
                            :index="index"
                        >
                            <img height="100%" :src="image" :alt="`Image ${ index }`">
                        </slide>
                    </carousel-3d>

                </div>
            </div>

        </div>

        <div class="row d-flex align-items-center vh-100">

            <div class="col-md-5 align-self-end">
                <img :src="water_bottle" alt="Water bottle" width="100%">
            </div>

            <div class="col-md-7 h-75 align-items-center">

                <h2 class="text-center mb-4">Conoce un poco sobre nuestro proceso</h2>

                <div class="h-75 w-100">
                    <iframe
                        width="100%"
                        height="100%"
                        :src="video"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
import water_bottle from '@/assets/water-bottle.png'
import { mapState } from 'vuex'

export default {
    data(){
        return {
            water_bottle: water_bottle,
        }
    },
    computed: {
        ...mapState('guestModule', ['gallery_images', 'video'])
    }
}
</script>

<style>
    
</style>