<template>
  <b-container class="mt-5" v-if="comments.length !== 0">
    <b-jumbotron class="jumbo">
      <h2>Your Comments:</h2>
      <b-table
        sticky-header="400px"
        head-row-variant="info"
        table-variant="light"
        striped
        hover
        :items="comments"
        :fields="fields"
        borderless
        sort-icon-left
      >
        <template v-slot:cell(show_details)="row">
          <b-button
            style="min-width: 120px"
            size="sm"
            @click="row.toggleDetails"
            variant="outline-info"
            class="mr-2"
          >
            {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
          </b-button>
        </template>

        <template v-slot:row-details="row">
          <b-card>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>ID :</b></b-col>
              <b-col>{{ row.item._id }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Commented At :</b></b-col>
              <b-col>{{ row.item.createdAt.split('T')[0] }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Likes :</b></b-col>
              <b-col>amont of likes</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Commented At :</b></b-col>
              <b-col>recipe Title</b-col>
            </b-row>
            <b-row>
              <b-col class="d-flex profile-btn">
                <b-button
                  variant="outline-info"
                  size="sm"
                  @click="row.toggleDetails"
                  class="my-2 mx-md-4 my-lg-4 px-3"
                  >Hide Details</b-button
                >

                <b-button
                  @click="deleteComment(row)"
                  v-b-toggle="'delete-comment'"
                  variant="outline-danger"
                  size="sm"
                  class="my-2 mx-md-3 my-lg-4 px-4"
                >
                  <font-awesome-icon icon="trash-alt" class="mr-3" />
                  Delete</b-button
                >
              </b-col>
            </b-row>
          </b-card>
        </template>
      </b-table>
      <b-row>
        <b-button
          variant="outline-danger"
          class="mr-5 mt-4"
          @click="deleteAllComments"
          >Delete All My comments</b-button
        >
      </b-row>
    </b-jumbotron>
  </b-container>
</template>

<script>
import toast from '../../assets/toast'
export default {
  data() {
    return {
      fields: [
        {
          key: 'content',
          label: 'Comments'
        },
        {
          key: 'show_details'
        }
      ]
    }
  },
  computed: {
    comments() {
      return !this.$store.getters.userInfo.comments
        ? false
        : this.$store.getters.userInfo.comments
    }
  },
  methods: {
    deleteAllComment() {
      console.log('the logic is not completed UserComments.vue')
    },
    deleteComment(row) {
      console.log(row.item._id)
      toast.confirm('Are You Sure', '', () => {
        this.$store.dispatch('deleteComment', row.item._id)
      })
      row.toggleDetails()
    }
  }
}
</script>

<style scoped>
.profile-btn {
  justify-content: start;
  flex-wrap: wrap;
}
@media screen and (max-width: 768px) {
  .profile-btn {
    flex-direction: column;
    justify-content: space-between;
    margin: 1rem !important;
  }
}
</style>
