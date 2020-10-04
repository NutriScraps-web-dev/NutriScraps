<template>
  <b-container class="mt-5" v-if="users.lenght !== 0">
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
              <b-col sm="3" class="text-sm-right"><b>country: </b></b-col>
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
              v-b-toggle="'edit-user-col'"
              @click="saveUser(row.item)"
              variant="outline-info"
              size="sm"
              class="mx-2 mt-2 mb-4 pass-btn px-5"
              ><font-awesome-icon icon="user-edit" class="mr-2" />
              Edit</b-button
            >
            <b-button
              v-b-toggle="'delete-user'"
              variant="outline-danger"
              @click="saveUser(row.item)"
              size="sm"
              class="mx-2 mt-2 mb-4 pass-btn px-5"
            >
              <font-awesome-icon icon="trash-alt" class="mr-2" />
              Delete</b-button
            >
            <b-collapse accordion="user-update" id="edit-user-col">
              <edit-user></edit-user>
            </b-collapse>
            <b-collapse accordion="user-update" id="delete-user">
              <delete-user></delete-user>
            </b-collapse>
          </b-card>
        </template>
      </b-table>
      <div class="pagination-container d-lg-flex">
        <b-button
          variant="outline-info"
          @click="moreUsers()"
          class="mx-2 mt-2 mb-4 more-btn px-5"
        >
          Show More</b-button
        >
        <FormulateInput
          @ValueChange="usersPagination.limit = $event.target.value"
          :options="[
            { value: '5', label: '5' },
            { value: '10', label: '10' },
            { value: '15', label: '15' },
            { value: '20', label: '20' },
            { value: '25', label: '25' }
          ]"
          type="select"
          placeholder="How Many More: "
        />
        <b-button
          variant="outline-info"
          @click="lessUsers()"
          class="mx-2 mt-2 mb-4 more-btn px-5"
        >
          Show Less</b-button
        >
      </div>
    </b-jumbotron>
  </b-container>
</template>

<script>
import EditUser from '../../components/admin/EditUser'
import DeleteUser from '../../components/admin/DeleteUser'
import { mapActions } from 'vuex'

export default {
  components: {
    'delete-user': DeleteUser,
    'edit-user': EditUser
  },
  data() {
    return {
      usersPagination: { page: 1, limit: 5 },
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
      return !this.$store.getters.allUsers
        ? false
        : this.$store.getters.allUsers
    }
  },
  created() {
    this.getAllUsers(this.usersPagination)
    this.getAllRoles()
  },
  methods: {
    ...mapActions(['getAllUsers', 'getMoreUsers', 'getAllRoles']),
    saveUser(user) {
      this.$store.commit('storeSelectedUser', user)
    },
    moreUsers() {
      this.usersPagination.page++
      this.getAllUsers(this.usersPagination)
    },
    lessUsers() {
      this.usersPagination.page = 1
      this.$store.commit('lessUsers')
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
.more-btn {
  align-self: center;
}
.pagination-container {
  align-items: baseline;
  justify-content: space-between;
}
</style>
