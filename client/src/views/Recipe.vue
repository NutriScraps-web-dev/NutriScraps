<template>
  <b-container class="mt-3 form-container">
    <br />
    <h1>
      <b>{{ this.recipes.name }}</b>
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
      <b>Cuisine: </b><i>{{ this.recipes.cuisine }}</i>
    </h3>
    <br />
    <h3>
      <b>Type: </b><i>{{ this.recipes.type }}</i>
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
    <comment :recipeId="recipes._id" v-on:addComment="updateComments($event)"></comment>
    <show-comments :comments="recipeComments"></show-comments>
  </b-container>
</template>

<script>
import { Api } from '@/Api'
import comment from '../components/comment/Comment'
import ShowComments from '../components/comment/ShowComments'
export default {
  name: 'recipe',
  data() {
    return {
      recipes: [],
      message: '',
      text: '',
      recipeComments: []
    }
  },
  mounted() {
    Api.get(`/recipes/${this.$route.params.id}`)
      .then(response => {
        console.log('response.data', response.data.comments)
        this.recipes = response.data
        this.recipeComments = response.data.comments
      })
      .catch(error => {
        this.message = error.message
        console.error(error)
        this.recipes = []
        // TODO: display error message
      })
      .then(() => {
        //   This code is always executed at the end. After success or failure.
      })
  },
  components: {
    comment,
    ShowComments
  },
  methods: {
    updateComments(event) {
      this.recipeComments.push(event)
      console.log('updateCommentsafter', this.recipeComments)
    }
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
