<template>
  <div class="contacts-list-info">
    <!-- /.direct-chat-img -->
    <img class="direct-chat-img" :alt="message.username" :src="message.image" />
    <span class="contacts-list-name">
      {{message.username}}
      <small class="contacts-list-date float-right">{{message.datetime}}</small>
    </span>
    <span class="contacts-list-msg">{{message.text}}</span>
  </div>
  <!-- /.contacts-list-info -->
</template>

<script>
export default {
  name: "DirectChat",
  props: {
    message: Object
  }
};
</script>