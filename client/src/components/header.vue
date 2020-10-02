<template>
  <b-navbar toggleable="lg" class="navbar navbar-light nav" style="">
    <b-navbar-brand>
      <b-link to="/">
        <img class="navbar-logo" src="../assets/foodlogo.png" alt="NutriScraps">
      </b-link>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <li class="nav-item">
              <b-link class="nav-item nav-link mx-2 px-2" to="/recipes">Recipe</b-link>
            </li>
            <li class="nav-item">
              <b-link class="nav-item nav-link mx-2 px-2" to="/about">About</b-link>
            </li>
            <li class="nav-item">
              <b-link class="nav-item nav-link mx-2 px-2" to="/contact-us">Contact</b-link>
            </li>
            <admin-ctrl-btns></admin-ctrl-btns>
            <control-btns></control-btns>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import controlBtns from './user/ControlButtons.vue'
import AdminControlBtns from './admin/AdminControlbtn.vue'

export default {
  components: {
    'admin-ctrl-btns': AdminControlBtns,
    'control-btns': controlBtns
  }
}
</script>

<style scoped>
.nav {
  background-color: #e3f2fd;
}
.navbar-logo {
  width: 35px;
}
</style>
