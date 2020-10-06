<template>
    <div>
        <b-button v-b-modal.commentsDialog>Comments</b-button>
        <b-modal id="commentsDialog" size="lg" scrollable centered title="Comments">
            <b-container>
                <b-list-group-item>
                    <b-row>
                        <h5 class="mt-2 ml-1">This dish is spicy!!</h5>
                        <div class="ml-auto">
                            <b-button class="mr-1" pill variant="outline-primary" @click="likeComments">
                                <b-icon icon="hand-thumbs-up" aria-hidden="true"></b-icon>Likes
                            </b-button>
                            <b-button class="mr-1" pill variant="outline-success" @click="replyComments">
                                <b-icon icon="reply" aria-hidden="true"></b-icon>Reply
                            </b-button>
                        </div>
                    </b-row>
                </b-list-group-item>
            </b-container>
            <template v-slot:modal-footer>
                <div class="w-100">
                    <b-button variant="danger" pill size="sm" class="float-right" @click="hideModal"> Close </b-button>
                </div>
            </template>
        </b-modal>
    </div>
</template>

<script>
export default {
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
    likeComments() {
    },
    replyComments() {
    }
  }
}
</script>

<style>

</style>
