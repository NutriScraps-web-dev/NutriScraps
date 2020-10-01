<template>
  <b-container class="mt-5" v-if="roles">
    <b-jumbotron class="jumbo">
      <b-table
        head-row-variant="info"
        table-variant="light"
        striped
        hover
        :items="roles"
        :fields="fields"
        borderless
      >
        <template v-slot:cell(show_details)="row">
          <b-button
            size="sm"
            @click="row.toggleDetails"
            variant="outline-info"
            class="mr-2"
          >
            {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
          </b-button>
        </template>

        <template v-slot:row-details="row">
          <b-card>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Created At:</b></b-col>
              <b-col>{{ row.item.createdAt.split('T')[0] }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Users: </b></b-col>
              <b-col>{{ row.item.users.length }} active users</b-col>
            </b-row>

            <b-button
              variant="outline-info"
              size="sm"
              @click="row.toggleDetails"
              class="mx-2"
              >Hide Details</b-button
            >
            <b-button
              v-b-toggle="'edit-role'"
              variant="outline-info"
              size="sm"
              class="mx-2"
              >Edit</b-button
            >
            <b-button
              v-b-toggle="'delete-role'"
              variant="outline-info"
              size="sm"
              class="mx-2"
              >Delete</b-button
            >
            <b-collapse accordion="role-update" id="edit-role">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga illo minima eum, veniam voluptatem perferendis quaerat voluptatum quis quidem sit blanditiis consectetur. Tempore inventore, reprehenderit tenetur soluta odio harum quae.</p>
            </b-collapse>
            <b-collapse accordion="role-update" id="delete-role">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga illo minima eum, veniam voluptatem perferendis quaerat voluptatum quis quidem sit blanditiis consectetur. Tempore inventore, reprehenderit tenetur soluta odio harum quae.</p>
            </b-collapse>
          </b-card>
        </template>
      </b-table>
    </b-jumbotron>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          key: 'role',
          lable: 'Roles'
        },
        {
          key: 'description',
          lable: 'Description'
        },
        {
          key: 'show_details'
        }
      ]
    }
  },
  computed: {
    roles() {
      return !this.$store.getters.roleItems
        ? false
        : this.$store.getters.roleItems
    }
  },
  created() {
    this.$store.dispatch('getAllRoles')
  }
}
</script>
