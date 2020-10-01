<template>
<div>
    <b-button v-b-modal.commentsAndRating>Comments</b-button>
    <b-modal id="commentsAndRating" hide-footer centered title="Comments and rating">
    <div class="d-block text-center">
        <h3>This is comments and rating modal</h3>
    </div>
    <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
    <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">Toggle Me</b-button>
    </b-modal>
</div>
</template>

<script>
export default {
  methods: {
    showModal() {
      this.$refs.commentsAndRating.show()
    },
    hideModal() {
      this.$refs.commentsAndRating.hide()
    },
    toggleModal() {
      this.$refs.commentsAndRating.toggle('#toggle-btn')
    }
  }
}
</script>

<style>

</style>>
