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
      You Are About To <strong>Delete</strong> A Role. This Action will Result
      In Deleting <strong> All Users </strong> That Have This Role. This Action
      Is
      <strong>Irreversible</strong>
    </b-card-text>
    <div class="d-flex con-btn d-md-block">
      <b-button
        variant="outline-danger"
        class="pass-btn my-2 mx-md-2 mx-lg-4 my-lg-4 px-5"
        @click="deleteRole"
        >YES! I Am Sure</b-button
      >
      <b-button
        variant="outline-success"
        class="pass-btn my-2 mx-md-2 mx-lg-4 my-lg-4 px-5"
        v-b-toggle="'delete-role'"
        >NO! My Bad</b-button
      >
    </div>
  </b-card>
</template>

<script>
export default {
  methods: {
    deleteRole() {
      this.$store.dispatch('deleteRole')
    }
  }
}
</script>

<style scoped>
.pass-btn {
  float: right;
}
 .con-btn {
  justify-content: start;
  flex-wrap: wrap;
}
@media screen and (max-width: 768px) {
  .con-btn {
    flex-direction: column;
    justify-content: space-between;
    margin: 1rem !important;
  }
}
</style>
