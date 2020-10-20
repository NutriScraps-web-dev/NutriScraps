<template>
  <div>
    <div v-if="isLoggedIn && isAdmin">
      <b-nav-item-dropdown>
        <template v-slot:button-content>
          <font-awesome-icon icon="users-cog" class="f-a-i-u" />
          <span class="account-text">Manage</span>
        </template>
        <b-dropdown-group id="manage-roles" header="Manage Roles">
          <b-dropdown-item>
            <b-link to="/admins/roles">
              <font-awesome-icon icon="tasks" class="mr-2 icon-clr" />
              <span class="dropdown-text">Manage Roles</span>
            </b-link>
          </b-dropdown-item>
        </b-dropdown-group>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-group id="manage-users" header="Manage Users">
          <b-dropdown-item>
            <b-link to="/admins/users">
              <font-awesome-icon icon="users" class="mr-2 icon-clr" />
              <span class="dropdown-text">Manage Users</span>
            </b-link>
          </b-dropdown-item>
        </b-dropdown-group>
      </b-nav-item-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isLoggedIn', 'isAdmin'])
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
}
.dropdown-text {
  color: rgba(0, 0, 0, 0.7) !important;
}
.f-a-i-u {
  font-size: 1.2rem;
  margin-left: 0.8rem;
}
.icon-clr {
  color: rgba(0, 0, 0, 0.7) !important;
}
</style>
