<template>
  <b-container class="mt-5" v-if="roles">
    <b-jumbotron class="jumbo">
      <b-container class="mb-4 role-container">
        <b-button
          variant="outline-info"
          v-b-toggle="'create-role-col'"
          class="mb-4 role-btn"
        >
          <b-icon icon="plus"></b-icon> Create Role
        </b-button>
        <b-collapse accordion="role-update" id="create-role-col">
          <create-role></create-role>
        </b-collapse>
      </b-container>
      <b-table
        head-row-variant="info"
        table-variant="light"
        striped
        hover
        :items="roles"
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
              <b-col sm="3" class="text-sm-right"><b>Created At:</b></b-col>
              <b-col>{{ row.item.createdAt.split('T')[0] }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Users: </b></b-col>
              <b-col>{{ row.item.users.length }} active users</b-col>
            </b-row>
            <div class="d-flex con-btn d-md-block">
              <b-button
                variant="outline-info"
                size="sm"
                @click="row.toggleDetails"
                class="pass-btn my-2 mx-md-2 mx-lg-4 my-lg-4 px-5"
                >Hide Details</b-button
              >
              <b-button
                v-b-toggle="'edit-role-col'"
                @click="saveRole(row.item)"
                variant="outline-info"
                size="sm"
                class="pass-btn my-2 mx-md-2 mx-lg-4 my-lg-4 px-5"
              >
                <font-awesome-icon icon="edit" class="mr-2" />
                Edit</b-button
              >
              <b-button
                v-b-toggle="'delete-role'"
                variant="outline-danger"
                @click="saveRole(row.item)"
                size="sm"
                class="pass-btn my-2 mx-md-2 mx-lg-4 my-lg-4 px-5"
              >
                <font-awesome-icon icon="trash-alt" class="mr-2" />
                Delete</b-button
              >
            </div>
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
import CreateRole from '../../components/admin/createRoleForm'
export default {
  components: {
    'create-role': CreateRole,
    'delete-role': DeleteRole,
    'edit-role': EditRole
  },
  data() {
    return {
      fields: [
        {
          key: 'role',
          lable: 'Roles',
          sortable: true
        },
        {
          key: 'description',
          lable: 'Description',
          sortable: true
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

<style scoped>
.role-btn {
  float: right;
}
.role-container {
  display: flex;
  flex-direction: column;
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
