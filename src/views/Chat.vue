<template>
  <div class="chat">
    <div class="left">
      <div class="left-top"><span>Мои сообщения</span></div>
      <div v-if="bool">
        <div v-for="(value, name, index) in chatRooms" v-bind:key="index" @click="onSelectRoom(value)" class="room">
          <div class="room__image">
            <img
              src="https://dyl80ryjxr1ke.cloudfront.net/external_assets/hero_examples/hair_beach_v391182663/original.jpeg"
              alt=""
            />
          </div>
          <div class="room__body">
            <div class="room__body-el">
              <div class="surname">{{ getSurname(value) }}</div>
              <div ref="lastUpdate" class="time">{{ getLastUpdate(value) }}</div>
            </div>
            <div class="room__body-el">
              <div ref="lastMsg" class="last-msg">{{ getLastMsg(value) }}</div>
              <div class="action">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    id="vac-icon-dropdown-room"
                    d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <loader v-else></loader>
    </div>
    <div class="right">
      <div class="inner-wrapper" v-if="selectRoom">
        <div v-if="bool" class="right-top">
          <div class="df">
            <div class="topel">
              <img
                src="https://dyl80ryjxr1ke.cloudfront.net/external_assets/hero_examples/hair_beach_v391182663/original.jpeg"
                alt=""
              />
            </div>
            <div class="surname-top">{{ getSurname(currentRoom) }}</div>
          </div>
          <div class="settings">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                id="vac-icon-menu"
                d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"
              ></path>
            </svg>
          </div>
        </div>
        <div v-if="bool" id="messages" class="messages">
          <p v-if="noMessage" class="no-msg">No messages</p>
          <chat-dialog :messages="messages" v-else></chat-dialog>
        </div>
        <div v-if="bool" class="typing">
          <div class="df">
            <div class="voice margin-r">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width="24"
                height="24"
                viewBox="0 0 512 512"
                class="vac-icon-microphone"
              >
                <path
                  id="vac-icon-microphone"
                  d="M432.8,216.4v39.2c0,45.2-15.3,84.3-45.2,118.4c-29.8,33.2-67.3,52.8-111.6,57.9v40.9h78.4c5.1,0,10.2,1.7,13.6,6c4.3,4.3,6,8.5,6,13.6c0,5.1-1.7,10.2-6,13.6c-4.3,4.3-8.5,6-13.6,6H157.6c-5.1,0-10.2-1.7-13.6-6c-4.3-4.3-6-8.5-6-13.6c0-5.1,1.7-10.2,6-13.6c4.3-4.3,8.5-6,13.6-6H236v-40.9c-44.3-5.1-81.8-23.9-111.6-57.9s-45.2-73.3-45.2-118.4v-39.2c0-5.1,1.7-10.2,6-13.6c4.3-4.3,8.5-6,13.6-6s10.2,1.7,13.6,6c4.3,4.3,6,8.5,6,13.6v39.2c0,37.5,13.6,70.7,40,97.1s59.6,40,97.1,40s70.7-13.6,97.1-40c26.4-26.4,40-59.6,40-97.1v-39.2c0-5.1,1.7-10.2,6-13.6c4.3-4.3,8.5-6,13.6-6c5.1,0,10.2,1.7,13.6,6C430.2,206.2,432.8,211.3,432.8,216.4z M353.5,98v157.6c0,27.3-9.4,50.3-29,69c-19.6,19.6-42.6,29-69,29s-50.3-9.4-69-29c-19.6-19.6-29-42.6-29-69V98c0-27.3,9.4-50.3,29-69c19.6-19.6,42.6-29,69-29s50.3,9.4,69,29C344.2,47.7,353.5,71.6,353.5,98z"
                ></path>
              </svg>
            </div>
            <div class="input">
              <input v-on:keyup.enter="sendMsg()" ref="msgInput" placeholder="Type message" type="text" />
            </div>
          </div>
          <div class="df">
            <div class="smales margin-r">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  id="vac-icon-emoji"
                  d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                ></path>
              </svg>
            </div>
            <div class="file margin-r">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  id="vac-icon-paperclip"
                  d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z"
                ></path>
              </svg>
            </div>
            <div class="send">
              <svg
                @click="sendMsg()"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path id="vac-icon-send-disabled" d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="select-room" v-if="!selectRoom && bool"><span>Выберите чат</span></div>
      <div class="loader-right">
        <loader v-if="!bool"></loader>
      </div>
    </div>
  </div>
</template>

<script>
import { db, roomsRef } from '@/firebase';
import { fetchRoomsChat, fetchUsernames, sendMessage } from '@/main/utils/chat/api';
import { mapMutations, mapGetters, mapActions } from 'vuex';
import { formatDate, scrollSmoothToBottom } from '@/main/common';
import Loader from '@/components/chat/Loader';
import ChatDialog from '@/components/chat/ChatDialog';

export default {
  components: {
    Loader,
    'chat-dialog': ChatDialog,
  },
  data() {
    return {
      currentRoom: null,
      currentRoomID: '',
      messages: [],
      bool: false,
      noMessage: true,
      selectRoom: false,
    };
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      chatRooms: 'chat/chatRooms',
      userNames: 'chat/userNames',
      myID: 'chat/myID',
    }),
  },
  methods: {
    getSurname(value) {
      let result = '';
      value.data.users.forEach((userID) => {
        this.userNames.forEach((obj) => {
          if (obj.userId === userID) {
            result = obj.username;
          }
        });
      });
      return result;
    },
    getLastUpdate(value) {
      const time = value.data.lastUpdate;
      return formatDate(new Date(time));
    },
    getLastMsg(value) {
      const msg = value.data.messages;
      if (msg.length > 0) {
        this.noMessage = false;
        return msg[msg.length - 1].text;
      } else {
        return 'Room created';
      }
    },
    onSelectRoom(value) {
      if (!this.currentRoom || this.currentRoom.id !== value.id) {
        this.currentRoom = value;
        this.selectRoom = true;
        this.messages = value.data.messages;

        const doc = roomsRef.doc(value.id);
        const observer = doc.onSnapshot(
          (docSnapshot) => {
            // console.log(docSnapshot.data());
            if (docSnapshot) {
              this.messages = docSnapshot.data().messages;
              // this.$refs.lastUpdate[0].innerText = formatDate(new Date(docSnapshot.data().lastUpdate));
              // this.$refs.lastMsg[0].innerText = docSnapshot.data().messages[messages.length - 1];
            }
          },
          (err) => {
            console.log(`Encountered error: ${err}`);
          },
        );
        scrollSmoothToBottom('messages');
      }
    },
    sendMsg() {
      const text = this.$refs.msgInput.value;
      if (text.trim().length > 0) {
        sendMessage(this.currentRoom.id, this.myID, text);
        this.$refs.msgInput.value = '';
      }
    },
    crollToBottom() {
      try {
        let objDiv = document.querySelector('.messages');
        objDiv.scrollTop = objDiv.scrollHeight;
      } catch (ex) {}
    },
  },
  watch: {
    // currentRoomID: function (val) {
    //   if(this.currentRoomID!==val){
    //   }
    // },
  },
  async created() {
    await fetchRoomsChat();
    await fetchUsernames(this.chatRooms);
    this.bool = true;
  },
  updated() {
    scrollSmoothToBottom('messages');
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.inner-wrapper {
  height: 100%;
}
.select-room {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.no-msg {
  margin: 26px auto;
  text-align: center;
}
.last-msg {
  height: 36px;
  overflow: hidden;
}
.loader-right {
  transform: translate(0, 125%);
}
.room {
  padding: 6px;
  margin: 8px;
  border-radius: 10px;
  transition: all 0.4s;
  width: 318px;
  background-color: #f8f9f9;
  &:hover {
    cursor: pointer;
    background-color: #eaeded;
  }

  display: flex;
  align-items: center;
}
.chat {
  height: 80vh;
  margin: 0 auto;

  display: flex;
  background-color: #34495e;
  border-radius: 12px;
}
.left {
  width: 35%;
  height: 72.5vh;
  overflow-y: auto;
  padding-top: 46px;
  position: relative;
  border-right: 2px solid rgba($color: grey, $alpha: 0.1);
}
.from-me {
  max-width: 50%;
  background-color: #f8f9f9;
  border-radius: 8px;
  padding: 5px;
  margin: 8px;
  transform: translate(90%, 0);
  &:hover {
    cursor: pointer;
  }
}
.from-them {
  max-width: 50%;
  background-color: #f8f9f9;
  border-radius: 8px;
  padding: 5px;
  margin: 8px;
  &:hover {
    cursor: pointer;
  }
}
.msg-text {
  margin-bottom: 4px;
}
.time {
  font-size: 13px;
}
.msg-time {
  font-size: 12px;
}
.messages {
  width: 100%;
  height: 82%;
  // background-color: red;
  overflow-y: auto;
  padding: 6px;
  box-sizing: border-box;
  position: relative;
}
.input {
  width: 340px;
  height: 34px;
  & input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    border-radius: 10px;
    padding: 0 0 0 10px;
  }
  margin-bottom: 3px;
}
.margin-r {
  margin: 0 8px 0 0;
}
svg {
  fill: #2471a3;
  transition: all 0.4s;
  &:hover {
    cursor: pointer;
    fill: #d7bde2;
  }
}
.typing {
  height: 10%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}
.settings {
  margin-right: 10px;
}
.surname {
  font-weight: 700;
  font-size: 17.2px;
  width: 50%;
  overflow: hidden;
}
.surname-top {
  margin-left: 10px;
}
.df {
  display: flex;
  align-items: center;
}
.topel {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  & img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  margin-left: 20px;
}
.right {
  width: 65%;
  height: 100%;
  // background-color: #cacfd2;
  position: relative;
  border-top-right-radius: 12px;
}
.right-top {
  padding: 8.5px 0px;
  width: 100%;
  border-top-right-radius: 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left-top {
  padding: 14px 0;
  border-top-left-radius: 12px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  left: 0;
}
.room__body-el {
  display: flex;
  justify-content: space-between;
  margin: 1px 0;
}
.room__body {
  width: 260px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px;
}
.room__image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  & img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
