<template>
  <div>
    <b-card
    class="mb-3"
      v-for="(comment, index) in comments"
      :key="index"
      :footer="comment.reviewer.username + ' | ' +comment.createdAt.split('T')[0]"
    >
      <b-card-text class="py-3">{{comment.content}}</b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  props: ['comments']
}
</script>
