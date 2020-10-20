<template>
  <div>
    <b-card
      class="mb-3"
      v-for="(comment) in comments"
      :key="comment._id"
      :footer="
      comment.reviewer.username + ' | ' + comment.createdAt.split('T')[0]
      "
    >
      <b-card-text class="py-3">{{ comment.content }}</b-card-text>
      <div v-if="isLoggedIn">
        <b-button class="mb-2" v-b-toggle="'collapse-'+comment._id" variant="info" size="sm"
          >Reply</b-button
        >
        <b-collapse :id="'collapse-'+comment._id" class="mt-2">
          <sub-comment :parentId="comment._id"></sub-comment>
        </b-collapse>
      </div>
    <show-comments
      :comments="comment.subcomments"
      ></show-comments>
    </b-card>
  </div>
</template>

<script>
import subComment from './subComment'
import { mapGetters } from 'vuex'

export default {
  props: ['comments'],
  components: {
    subComment
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  name: 'show-comments'
}
</script>
