<template>
  <div>
    <b-card
      class="mb-3"
      v-for="(comment, index) in comments"
      :key="index"
      :footer="
        ' | '
      "
    >
      <b-card-text class="py-3">{{ comment.content }}</b-card-text>
      <div v-if="isLoggedIn">
        <b-button class="mb-2" v-b-toggle="'collapse-'+index" variant="info" size="sm"
          >Reply</b-button
        >
        <b-collapse :id="'collapse-'+index" class="mt-2">
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
