<template>
  <div>
  <b-card
    :img-src="recipe.image"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text class=text-body>
      <h4 class="recipe-name"><b>{{recipe.name}}</b></h4>
      <h6><i>Cuisine: {{recipe.cuisine}}</i></h6>
      <h6><i>Type: {{recipe.type}}</i></h6>
    </b-card-text>
    <b-card-body class="text-center">
      <b-button block class="mb-3"  variant="primary" style="margin:auto" @click="goToRecipe(recipe._id)">
        View Recipe
      </b-button>
      <b-button block variant="outline-primary" style="margin:auto" @click="editRecipe(recipe._id)">
        Edit Recipe
      </b-button>
    </b-card-body>
  </b-card>
  <br>
</div>
</template>

<script>

export default {
  name: 'recipe-item',
  props: ['recipe'],
  methods: {
    goToRecipe() {
      this.$router.push({ name: 'recipe', params: { id: this.recipe._id } })
    },
    editRecipe() {
      this.$router.push({ name: 'editRecipe', params: { id: this.recipe._id } })
    }
  }

}

</script>

<style scoped>
.text-body{
  width: 100%;
  height: fit-content;
  text-overflow: ellipsis;
}
.recipe-name {
  text-overflow: ellipsis;
  max-width: 20ch;
}
</style>
