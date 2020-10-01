<template>
  <b-jumbotron class="jumbo">
    <template v-slot:header>
      <h4>{{recipe.name}}</h4>
    </template>
    <br>
    <template v-slot:lead>
      <b-row>
        <h5>Cuisine: </h5><h5>{{recipe.cuisine}}</h5>
      </b-row>
          <!--<h4>Preparation:</h4>
          <div class=preparation>
                <ol>
                    <li v-for="preparation in recipe.preparation" :key="preparation">
                        <h4>{{preparation}}</h4>
                    </li>
                </ol>
            </div>
          <h4>Cooking Process:</h4>
          <div class=cooking>
                <ol>
                    <li v-for="cooking in recipe.cookingProcess" :key="cooking">
                        <h4>{{cooking}}</h4>
                    </li>
                </ol>
            </div>
          <h4>To Serve:</h4>
          <div class=serve>
                <ol>
                    <li v-for="item in recipe.toServe" :key="item">
                        <h4>{{item}}</h4>
                    </li>
                </ol>
            </div>-->
      <b-row>
        <h5>Type:</h5><h5>{{ recipe.type }}</h5>
      </b-row>
    </template>
    <b-form-row>
      <b-button
        variant="outline-primary"
        v-b-toggle="'edit-recipe-col'"
        >Edit Recipe</b-button
      >
      <b-button
        variant="outline-primary"
        v-b-toggle="'view-comments-col'"
        >View Comments</b-button
      >
      <b-button
        variant="outline-danger"
        v-b-toggle="'delete-col'"
        v-on:click="deleteRecipe()"
        >Delete Recipe</b-button
      >
    </b-form-row>
    <b-row>
      <b-col>
        <b-collapse accordion="recipe-update" id="delete-col">
          <delete-account></delete-account>
        </b-collapse>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-collapse accordion="recipe-update" id="view-comments-col">
          <b-card>
            <comments-form></comments-form>
          </b-card>
        </b-collapse>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-collapse accordion="recipe-update" id="edit-recipe-col">
          <b-card>
            <update-profile></update-profile>
          </b-card>
        </b-collapse>
      </b-col>
    </b-row>
  </b-jumbotron>
</template>

<script>

export default {
  name: 'recipe-item',
  props: ['recipe'],
  methods: {
    deleteRecipe() {
      this.$emit('del-recipe', this.recipe._id)
      console.log('del-recipe with id:' + this.recipe._id)
    }
  }

}

</script>

<style scoped>

.jumbo {
  text-align: left;

}

</style>
