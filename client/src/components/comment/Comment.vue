<template>
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
        variant="primary"
        class="pass-btn my-2 my-lg-0 px-3 px-md-5 float-right"
        type="submit"
      >
        Post
      </b-button>
    </FormulateForm>
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
