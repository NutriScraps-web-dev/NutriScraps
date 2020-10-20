<template>
  <div>
    <b-button v-b-modal.commentsDialog>Comments</b-button>
    <b-modal id="commentsDialog" size="lg" scrollable centered title="Comments">
      <b-container>
        <b-list-group-item>
          <b-row>
            <h5 class="mt-2 ml-1">This dish is spicy!!</h5>
            <div class="ml-auto">
              <b-button
                class="mr-1"
                pill
                variant="outline-primary"
                @click="likeComment"
              >
                <b-icon icon="hand-thumbs-up" aria-hidden="true"></b-icon>Likes
              </b-button>
              <b-button
                class="mr-1"
                pill
                variant="outline-success"
                v-b-toggle.reply-form
              >
                <b-icon icon="reply" aria-hidden="true"></b-icon>Reply
              </b-button>
            </div>
          </b-row>
          <b-collapse id="reply-form">
              <b-container class="mt-3 mb-5 form-container ">
                <FormulateForm @submit="onSubmit">
                  <FormulateInput
                    element-class=""
                    type="text"
                    name="comment"
                    placeholder="comment"
                    v-model="comment"
                    label="comment"
                    validation="bail|max:100"
                  />
                  <b-button
                    class="btn btn-info mx-1 px-5 pass-btn"
                    type="submit"
                    >Submit</b-button
                  >
                </FormulateForm>
              </b-container>
            </b-collapse>
        </b-list-group-item>
      </b-container>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="danger"
            pill
            size="sm"
            class="float-right"
            @click="hideModal"
          >
            Close
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comment: ''
    }
  },
  methods: {
    showModal() {
      this.$bvModal.show('commentsDialog')
    },
    hideModal() {
      this.$bvModal.hide('commentsDialog')
    },
    toggleModal() {
      this.$bvModal.toggle('#toggle-btn')
    },
    likeComment() {
    },
    dislikeComment() {
    },
    replyComment() {},
    onSubmit() {
      const formData = {
        content: this.comment
      }
      console.log(formData)
      this.$store.dispatch('createComment', formData)
    }
  }
}
</script>

<style></style>
