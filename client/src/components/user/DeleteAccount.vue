<template>
  <b-card
    border-variant="danger"
    header="Are You Sure?"
    header-border-variant="danger"
    header-text-variant="danger"
    align="center"
    class="mx-2 my-1"
  >
    <b-card-text>
      You Are About To <strong>Delete</strong> Your Account. This Action Is
      <strong>Irreversible</strong>
    </b-card-text>
    <div class="d-flex d-md-block del-btn-con flex-column">
    <b-button
      variant="outline-danger"
      class="my-2 mx-md-4 my-lg-4 px-3"
      @click="deleteUser"
      >YES! Leave Me Alone</b-button
    >
    <b-button
      variant="outline-success"
      class="my-2 mx-md-4 my-lg-4 px-3"
      v-b-toggle="'delete-col'"
      >NO! I'd Rather Stick Around</b-button
    >
    </div>
  </b-card>
</template>

<script>
export default {
  methods: {
    deleteUser() {
      this.$store.dispatch('deleteUser')
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .del-btn-con {
    display: flex;
    /* flex-wrap: wrap !important; */
    /* justify-content: space-between; */
    /* margin: 1rem !important; */
  }
}
</style>
