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
      You Are About To <strong>Delete</strong> A Role. This Action will Result In Deleting <strong> All Users </strong> All Users That Have This Role. This Action Is
      <strong>Irreversible</strong>
    </b-card-text>
    <b-button
      variant="outline-danger"
      class="ml-5 my-4"
      @click="deleteRole"
      >YES! I Am Sure</b-button
    >
    <b-button
      variant="outline-success"
      class="ml-5 my-4"
      v-b-toggle="'delete-role'"
      >NO! My Bad</b-button
    >
  </b-card>
</template>

<script>
export default {
  methods: {
    deleteUser() {
      this.$store.dispatch('deleteRole')
    }
  }
}
</script>
