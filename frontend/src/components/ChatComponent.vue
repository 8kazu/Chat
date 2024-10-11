<template>
  <div id="chat">
    <h1>チャットアプリ</h1>
    <div id="messages">
      <div v-for="(message, index) in messages" :key="index">
        {{ message }}
      </div>
    </div>
    <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="メッセージを入力" />
  </div>
</template>

<script>
import { io } from 'socket.io-client';

export default {
  data() {
    return {
      socket: null,
      newMessage: '',
      messages: [],
    };
  },
  created() {
    // サーバーに接続
    this.socket = io('http://localhost:3000');

    // メッセージを受信
    this.socket.on('chat message', (msg) => {
      this.messages.push(msg);
    });
  },
  methods: {
    sendMessage() {
      if (this.newMessage) {
        // メッセージを送信
        this.socket.emit('chat message', this.newMessage);
        this.newMessage = '';
      }
    },
  },
};
</script>

<style scoped>
#chat {
  margin: 0 auto;
  width: 50%;
}
#messages {
  height: 300px;
  border: 1px solid #ccc;
  padding: 10px;
  overflow-y: scroll;
  margin-bottom: 10px;
}
input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
</style>
