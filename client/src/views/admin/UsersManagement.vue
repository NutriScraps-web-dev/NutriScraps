<template>
  <b-container class="mt-5 " v-if="users.lenght !== 0">
    <b-jumbotron class="jumbo ">
      <div>
        <b-table
          head-row-variant="info"
          table-variant="light"
          striped
          hover
          :items="users"
          :fields="fields"
          borderless
          sort-icon-left
          responsive="sm"
          class="user-b-tbl"
        >
          <template v-slot:cell(username)="row">
            <div class="username-col" style="min-width: 0.5rem;">
              {{ row.item.username }}
            </div>
          </template>
          <template v-slot:cell(show_details)="row">
            <b-button
              size="sm"
              @click="row.toggleDetails"
              variant="outline-info"
              class="mr-2 d-none d-md-block"
            >
              {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
            </b-button>
            <b-button
              size="sm"
              @click="row.toggleDetails"
              variant="outline-info"
              class="d-md-none"
            >
              <font-awesome-icon icon="caret-square-down" />
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
              <div class="d-flex con-btn d-md-block">
                <b-button
                  variant="outline-info"
                  size="sm"
                  @click="row.toggleDetails"
                  class="pass-btn my-2 mx-md-2 mx-lg-4 my-lg-4 px-5"
                  >Hide Details</b-button
                >
                <b-button
                  v-b-toggle="'edit-user-col'"
                  @click="saveUser(row.item)"
                  variant="outline-info"
                  size="sm"
                  class="pass-btn my-2 mx-md-2 mx-lg-4 my-lg-4 px-5"
                  ><font-awesome-icon icon="user-edit" class="mr-2" />
                  Edit</b-button
                >
                <b-button
                  v-b-toggle="'delete-user'"
                  variant="outline-danger"
                  @click="saveUser(row.item)"
                  size="sm"
                  class="pass-btn my-2 mx-md-2 mx-lg-4 my-lg-4 px-5"
                >
                  <font-awesome-icon icon="trash-alt" class="mr-2" />
                  Delete</b-button
                >
              </div>
              <b-collapse accordion="user-update" id="edit-user-col">
                <edit-user></edit-user>
              </b-collapse>
              <b-collapse accordion="user-update" id="delete-user">
                <delete-user></delete-user>
              </b-collapse>
            </b-card>
          </template>
        </b-table>
      </div>
      <div class="pagination-container d-flex">
        <b-button
          variant="outline-info"
          @click="moreUsers()"
          class="more-btn pass-btn my-2 mx-md-2 mx-lg-4 my-lg-4 px-5"
        >
          Show More</b-button
        >
        <div class="d-none d-md-block">
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
        </div>
        <b-button
          variant="outline-info"
          @click="lessUsers()"
          class="more-btn pass-btn my-2 mx-md-2 mx-lg-4 my-lg-4 px-5"
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
          key: 'show_details',
          label: 'detail'
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
.pagination-container {
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

@media screen and (max-width: 768px) {
  .pagination-container {
    flex-direction: column;
    justify-content: space-between;
    margin: 1rem !important;
    align-items: stretch !important;
  }
  .username-col{
    min-width: 10rem;
  }
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
  .user-b-tbl{
    overflow-x: hidden;
  }
}
</style>
