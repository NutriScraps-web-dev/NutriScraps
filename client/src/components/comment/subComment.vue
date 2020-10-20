<template>
  <div>
    <b-card class="mb-3" v-if="isLoggedIn">
      <FormulateForm @submit="onSubmit">
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
          Reply
        </b-button>
      </FormulateForm>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    parentId: {
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
      this.$store
        .dispatch('createSubComment', {
          comment: { content: this.content },
          parentId: this.parentId
        }).then(() => {
          this.content = ''
        })
    }
  }
}
</script>

<style scoped>
.pass-btn {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
</style>
