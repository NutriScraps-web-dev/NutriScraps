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
              class="mx-2 mt-2 mb-4 pass-btn px-4"
              >Hide Details</b-button
            >
            <b-button
              v-b-toggle="'edit-role-col'"
              @click="saveRole(row.item)"
              variant="outline-info"
              size="sm"
              class="mx-2 mt-2 mb-4 pass-btn px-5"
              >Edit</b-button
            >
            <b-button
              v-b-toggle="'delete-role'"
              variant="outline-danger"
              @click="saveRole(row.item)"
              size="sm"
              class="mx-2 mt-2 mb-4 pass-btn px-5"
              >Delete</b-button
            >
            <b-collapse accordion="role-update" id="edit-role-col">
              <edit-role></edit-role>
            </b-collapse>
            <b-collapse accordion="role-update" id="delete-role">
              <delete-role></delete-role>
            </b-collapse>
          </b-card>
        </template>
      </b-table>
    </b-jumbotron>
  </b-container>
</template>

<script>
import EditRole from '../../components/admin/EditRole'
import DeleteRole from '../../components/admin/DeleteRole'
export default {
  components: {
    'delete-role': DeleteRole,
    'edit-role': EditRole
  },
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
  },
  methods: {
    saveRole(role) {
      this.$store.commit('storeRole', role)
    }
  }
}
</script>
