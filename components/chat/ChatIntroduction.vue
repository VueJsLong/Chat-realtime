<template>
  <b-carousel
    id="carousel-1"
    v-model="slide"
    :interval="4000"
    controls
    indicators
    img-width="480"
    img-height="480"
    style="width: 100%"
    @sliding-start="onSlideStart"
    @sliding-end="onSlideEnd"
  >
    <!-- Slides with custom text -->
    <b-carousel-slide img-src="/img/carousel/Awards.png">
      <h2 style="color: #333">Tốt nhất!</h2>
    </b-carousel-slide>

    <!-- Slides with custom text -->
    <b-carousel-slide img-src="/img/carousel/Data.png">
      <h2 style="color: #333">Tiện ích!</h2>
    </b-carousel-slide>

    <!-- Slides with image only -->
    <b-carousel-slide img-src="/img/carousel/Product Launch.png">
      <h2 style="color: #333">Nhanh chóng!</h2>
    </b-carousel-slide>

    <!-- Slides with image only -->
    <b-carousel-slide img-src="/img/carousel/Location.png">
      <h2 style="color: #333">Đa ngôn ngữ!</h2>
    </b-carousel-slide>
  </b-carousel>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
    }
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
  },
}
</script>
