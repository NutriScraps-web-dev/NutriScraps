<template>
  <b-container class="mt-5" v-if="users">
    <b-jumbotron class="jumbo">
      <b-table
        head-row-variant="info"
        table-variant="light"
        striped
        hover
        :items="users"
        :fields="fields"
        borderless
        sort-icon-left
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
              <b-col sm="3" class="text-sm-right"><b>Full Name:</b></b-col>
              <b-col
                >{{ row.item.name.firstName }}
                {{ row.item.name.lastName }}</b-col
              >
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Email: </b></b-col>
              <b-col>{{ row.item.email }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>User Id: </b></b-col>
              <b-col>{{ row.item._id }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>User Id: </b></b-col>
              <b-col>{{ row.item.country }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Bio:</b></b-col>
              <b-col>{{ row.item.bio }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Signed Up At:</b></b-col>
              <b-col>{{ row.item.createdAt.split('T')[0] }}</b-col>
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
// import EditRole from '../../components/admin/EditRole'
// import DeleteRole from '../../components/admin/DeleteRole'
// import CreateRole from '../../components/admin/createRoleForm'
export default {
  components: {
    // 'create-role': CreateRole,
    // 'delete-role': DeleteRole,
    // 'edit-role': EditRole
  },
  data() {
    return {
      fields: [
        {
          key: 'username',
          label: 'Username',
          sortable: true
        },
        {
          key: 'name.firstName',
          label: 'Name'
        },
        {
          key: 'roleType',
          label: 'Role',
          sortable: true
        },
        {
          key: 'show_details'
        }
      ]
    }
  },
  computed: {
    users() {
      console.log(this.$store.state.users)
      return !this.$store.getters.allUsers
        ? false
        : this.$store.getters.allUsers
    }
  },
  created() {
    this.$store.dispatch('getAllUsers')
  }
  //   methods: {
  //     // saveRole(role) {
  //     //   // this.$store.commit('storeRole', role)
  //     // }
  //   }
}
</script>

<style scoped>
.role-btn {
  float: right;
}
.role-container {
  display: flex;
  flex-direction: column;
}
</style>
