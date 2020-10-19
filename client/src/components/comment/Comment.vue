<template>
  <div>
    <b-card class="mb-3">
      <FormulateForm @submit="onSubmit" v-if="isLoggedIn">
        <FormulateInput
          element-class=""
          v-model="content"
          type="textarea"
          placeholder="Your Comment Here"
          validation="max:200,length"
          error-behavior="live"
          :help="`Keep it under 200 characters. ${200 - content.length} left.`"
        />
        <b-button
          size="sm"
          variant="primary"
          class="pass-btn px-3 px-md-2 float-right"
          type="submit"
        >
          Post Comment
        </b-button>
      </FormulateForm>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    recipeId: {
      required: true
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  data() {
    return {
      content: ''
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('createComment', {
        comment: { content: this.content },
        recipeId: this.recipeId
      })
    }
  }
}
</script>

<style scoped>
.pass-btn{
  margin-top: 0 !important;
}
</style>
