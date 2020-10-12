<template>
  <div>
    <div v-if="isLoggedIn && isAdmin">
      <b-dropdown variant="outline-info" class="drapdown">
        <template v-slot:button-content>
        <font-awesome-icon icon="users-cog" class="mr-2 icon-size" />
          <span class="account-text">Manage</span>
        </template>
        <b-dropdown-group id="manage-roles" header="Manage Roles">
            <b-link to="/admins/roles">
            <b-dropdown-item-button>
              <font-awesome-icon icon="tasks" class="mr-2 icon-size" />
              <span class="dropdown-text">Manage Roles</span>
            </b-dropdown-item-button>
          </b-link>
        </b-dropdown-group>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-group id="manage-users" header="Manage Users">
          <b-link to="/admins/users">
            <b-dropdown-item-button>
              <font-awesome-icon icon="users" class="mr-2 icon-size" />
              <span class="dropdown-text">Manage Users</span>
            </b-dropdown-item-button>
          </b-link>
        </b-dropdown-group>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isLoggedIn', 'isAdmin'])
  },
  methods: {
    ...mapActions(['logOut'])
  },
  created() {
    this.$store.dispatch('isAdmin')
  }
}
</script>

<style scoped>
.user-btn:hover {
  background: none !important;
}
.signUp-btns {
  display: flex;
}
.account-icon {
  margin-left: 0.85rem;
  margin-right: 0.1rem;
}
.account-text {
  margin-left: 0.7rem;
  margin-right: 1rem;
}
.dropdown-text {
  color: rgba(0, 0, 0, 0.7) !important;
}
.dropdown {
  margin-right: 2rem;
}
.icon-size {
  font-size: 1.2rem;
}
</style>
