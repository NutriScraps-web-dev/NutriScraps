<template>
  <b-container class="mt-5">
    <b-jumbotron class="jumbo">
      <div v-if="posts.length !== 0">
        <h2>Your Posts:</h2>
        <b-table
          head-row-variant="info"
          table-variant="light"
          striped
          hover
          :items="posts"
          :fields="fields"
          borderless
          sort-icon-left
        >
          <template v-slot:cell(show_details)="row">
            <b-button
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
                <b-col sm="3" class="text-sm-right"><b>ID:</b></b-col>
                <b-col>{{ row.item._id }}</b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"><b>Type:</b></b-col>
                <b-col>{{ row.item.type }}</b-col>
              </b-row>

              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"><b>Likes: </b></b-col>
                <b-col>likes</b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"><b>disLikes: </b></b-col>
                <b-col>dislikes</b-col>
              </b-row>
              <div class="d-flex con-btn d-md-block">
                <b-button
                  variant="outline-info"
                  size="sm"
                  @click="row.toggleDetails"
                  class="pass-btn my-2 mx-md-2 mx-lg-4 my-lg-4 px-5"
                  >Hide Details</b-button
                >
                <b-button
                  v-b-toggle="'delete-role'"
                  variant="outline-danger"
                  @click="deletePost(row)"
                  size="sm"
                  class="pass-btn my-2 mx-md-2 mx-lg-4 my-lg-4 px-5"
                >
                  <font-awesome-icon icon="trash-alt" class="mr-2" />
                  Delete</b-button
                >
              </div>
            </b-card>
          </template>
        </b-table>
      </div>
      <div v-else>
        <p>You Do Not Have Any Posts!</p>
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
          key: 'name',
          label: 'Name'
        },
        {
          key: 'cuisine',
          label: 'Cuisine'
        },
        {
          key: 'show_details'
        }
      ]
    }
  },
  computed: {
    posts() {
      return !this.$store.getters.userInfo.posts
        ? false
        : this.$store.getters.userInfo.posts
    }
  },
  methods: {
    deletePost(row) {
      console.log(row.item._id)
      toast.confirm('Are You Sure', '', () => {
        this.$store.dispatch('deletePost', row.item._id)
      })
      row.toggleDetails()
    }
  }
}
</script>

<style scoped>
.role-btn {
  float: right;
}
.role-container {
  display: flex;
  flex-direction: column;
}
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
}
</style>
