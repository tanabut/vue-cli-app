<template>
  <!-- Conversations are loaded here -->
  <div class="direct-chat-messages" id="direct-chat">
    <div v-for="message in messages">
      <div v-if="message.type == 'message'">
        <!-- Message. Default to the left -->
        <div class="direct-chat-msg">
          <div class="direct-chat-info clearfix">
            <span class="direct-chat-name float-left">{{message.username}}</span>
            <span class="direct-chat-timestamp float-right">{{message.datetime}}</span>
          </div>
          <img class="direct-chat-img" :alt="message.username" :src="message.image" />
          <div class="direct-chat-text">{{message.text}}</div>
        </div>
      </div>
      <div v-else-if="message.type == 'answer'">
        <!-- Message to the right -->
        <div class="direct-chat-msg right">
          <div class="direct-chat-info clearfix">
            <span class="direct-chat-name float-right">SCGApp</span>
            <span class="direct-chat-timestamp float-left">{{message.datetime}}</span>
          </div>
          <div class="direct-chat-text">{{message.text}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DirectChat",
  props: {
    messages: Array
  }
};
</script>