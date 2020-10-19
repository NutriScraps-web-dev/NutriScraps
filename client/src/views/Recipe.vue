<template>
  <b-container class="mt-3 form-container" v-if="recipes">
    <br />
    <h1>
      <b>{{ recipes.name }}</b>
    </h1>
    <br />
    <b-img
      src="https://st.depositphotos.com/1692343/5094/i/450/depositphotos_50945415-stock-photo-healthy-homemade-fried-rice.jpg"
      rounded
      fluid
      alt="Responsive image"
    >
    </b-img>
    <br />
    <br />
    <h3>
      <b>Cuisine: </b><i>{{ recipes.cuisine }}</i>
    </h3>
    <br />
    <h3>
      <b>Type: </b><i>{{ recipes.type }}</i>
    </h3>
    <br />
    <hr />
    <br />
    <h3><b>Preparation</b></h3>
    <br />
    <div class="preparation">
      <ol>
        <li v-for="preparation in recipes.preparation" :key="preparation">
          <h4>{{ preparation }}</h4>
        </li>
      </ol>
    </div>
    <br />
    <hr />
    <br />
    <h3><b>Cooking Steps</b></h3>
    <br />
    <div class="cooking">
      <ol>
        <li v-for="cooking in recipes.cookingProcess" :key="cooking">
          <h4>{{ cooking }}</h4>
        </li>
      </ol>
    </div>
    <br />
    <hr />
    <br />
    <h3><b>To Serve</b></h3>
    <br />
    <div class="serve">
      <ul>
        <li v-for="item in recipes.toServe" :key="item">
          <h4>{{ item }}</h4>
        </li>
      </ul>
    </div>
    <br />
    <hr />
    <br />
    <h3>Comments:</h3>
    <br />
    <comment :recipeId="recipes._id"></comment>
    <show-comments :comments="recipes.comments"></show-comments>
  </b-container>
</template>

<script>
import comment from '../components/comment/Comment'
import ShowComments from '../components/comment/ShowComments'

export default {
  computed: {
    recipes() {
      return !this.$store.getters.recipeState
        ? false
        : this.$store.getters.recipeState
    }
  },
  created() {
    this.$store.dispatch('getRecipe', this.$route.params.id)
  },
  components: {
    comment,
    ShowComments
  }
}
</script>

<style scoped>
.form-container {
  width: 50vw !important;
}
@media screen and (max-width: 600px) {
  .form-container {
    width: 65vw !important;
  }
}
@media screen and (max-width: 430px) {
  .form-container {
    width: 80vw !important;
  }
}
ol {
  font-family: sans-serif;
}
ul {
  font-family: sans-serif;
}
</style>
