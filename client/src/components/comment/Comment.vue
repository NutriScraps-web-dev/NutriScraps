<template>
  <FormulateForm @submit="onSubmit">
    <FormulateInput
      element-class=""
      v-model="content"
      type="textarea"
      label="Comment:"
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
export default {
  data() {
    return {
      content: ''
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('createComment', { content: this.content })
    }
  }
}
</script>
