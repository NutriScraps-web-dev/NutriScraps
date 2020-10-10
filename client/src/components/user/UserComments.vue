<template>
  <b-container class="mt-5" >
    <b-jumbotron class="jumbo">
      <div v-if="comments.length !== 0">
      <h2>Your Comments:</h2>
      <b-table
      class="data-tbl"
        sticky-header="400px"
        head-row-variant="info"
        table-variant="light"
        striped
        hover
        :items="comments"
        :fields="fields"
        borderless
        sort-icon-left
        responsive="sm"
      >
      <template v-slot:cell(content)="row">
        <div class="content-col">
          {{ row.item.content }}
        </div>
      </template>
        <template v-slot:cell(show_details)="row">
          <div class=" detail-btn">
          <b-button
            style="min-width: 120px"
            size="sm"
            @click="row.toggleDetails"
            variant="outline-info"
            class="mr-2"
          >
            {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
          </b-button>
          </div>
        </template>
        <template v-slot:row-details="row">
          <b-card class="con-b-card">
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
              <b-col class="d-flex con-btn">
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
      </div>
      <div v-else>
        <p>You Do Not Have Any Comment!</p>
      </div>
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
    deleteAllComments() {
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
.con-btn {
  justify-content: start;
  flex-wrap: wrap;
}

@media screen and (max-width: 768px) {
  .con-btn {
    flex-direction: column;
    justify-content: space-between;
    margin: 1rem !important;
  }
  .data-tbl{
   overflow-x: hidden;
  }
  .content-col{
    min-width: 19rem;
    margin-right: 20rem;
  }
  .con-b-card{
    display: none;
  }
}

</style>
