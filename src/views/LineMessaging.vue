<template>
  <div id="page-margin">
    <h2>
      Ex3.Please create one small project for Line messaging API(Up to you), contain a flow
      diagram, your code, and database.
    </h2>
    <hr />
    <button
      type="button"
      class="btn btn-sm btn-primary btn-flat"
      v-on:click="setCurrent('directchat')"
    >Direct Chat</button>&nbsp;
    <button
      type="button"
      class="btn btn-sm btn-success btn-flat"
      v-on:click="setCurrent('diagram')"
    >Diagram</button>
    <hr />

    <!-- .row -->
    <div class="row" v-if="current == 'directchat'">
      <div class="col-md-6">
        <div class="box box-primary direct-chat direct-chat-primary">
          <div class="box-header with-border">
            <h3 class="box-title">Chats</h3>
          </div>

          <!-- /.box-header -->
          <div class="box-body">
            <!-- Contacts are loaded here -->
            <div class="direct-chat-contacts-open direct-chat-messages">
              <ul class="contacts-list">
                <div v-for="message in listmessages">
                  <li>
                    <a
                      href="#"
                      class="card-header-icon"
                      aria-label="more options"
                      v-on:click.prevent="GetCurrentUser(message.userid)"
                    >
                      <!--components-->
                      <UserInfo :message="message" />
                    </a>
                  </li>
                </div>
                <!-- End Contact Item -->
              </ul>
              <!-- /.contatcts-list -->
            </div>
          </div>
          <!-- /.box-body -->
        </div>
      </div>

      <div class="col-md-6">
        <!-- DIRECT CHAT -->
        <div class="box box-primary direct-chat direct-chat-primary">
          <div class="box-header with-border">
            <h3 class="box-title">Direct Chat</h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <!--components-->
            <DirectChat :messages="messages" />
          </div>
          <!-- /.box-body -->
          <div class="box-footer">
              <div class="input-group">
                <input
                  type="text"
                  name="message"
                  id="message"
                  placeholder="Type Message ..."
                  class="form-control"
                  v-on:keyup.enter="SendMessage"
                />
                <span class="input-group-btn">
                  <button
                    type="button"
                    class="btn btn-sm btn-info btn-flat float-right"
                    v-on:click="SendMessage()"
                  >
                    Send
                    <i class="fa fa-arrow-circle-right"></i>
                  </button>
                </span>
              </div>
          </div>
          <!-- /.box-footer-->
        </div>
        <!--/.direct-chat -->
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->

    <!-- .row -->
    <div class="row" v-else-if="current == 'diagram'">
      <div class="col-md-8">
        <img alt="DesignDatabae" src="../assets/DesignDatabae.png" />
        <img alt="ProcessFlowDiagram" src="../assets/ProcessFlowDiagram.png" />
      </div>
      <div class="col-md-4">
        <b>Line QR Code.</b><br/>
        <img alt="QRCode" src="../assets/qrcode.png" />
        <p>Basic ID : @078ettgm</p>
        <p>User Id : U68f840080796f57dfff287697c2926c0</p>
      </div>
    </div>
    <!-- /.row -->
  </div>
</template>

<script>
import DirectChat from "@/components/DirectChat.vue";
import UserInfo from "@/components/UserInfo.vue";

export default {
  components: {
    DirectChat,
    UserInfo
  },
  data: function() {
    return {
      endpointAPI : "https://assignment-web-api.herokuapp.com/", //http://localhost:3000
      current: "directchat",
      listmessages: [],
      messages: [],
      currentuser: "",
      pollingLoop: false
    };
  },
  created() {
    this.GetUserMessages();
  },
  methods: {
    setCurrent: function(current) {
      this.current = current;
      if (current === "directchat") {
        this.PollingLoop();
      }
    },
    GetUserMessages: async function() {
      this.pollingLoop = false;
      let response = await fetch( `${this.endpointAPI}getlastmsgofeachuser`, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      let result = await response.json();
      let data = await result.Data;
      if (data) {
        this.listmessages = data;
        console.log(this.listmessages);
      }
    },
    GetCurrentUser: async function(userid) {
      this.pollingLoop = false;
      let response = await fetch(`${this.endpointAPI}getmsgbyuser`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userid: userid
        })
      });
      let result = await response.json();
      let data = await result.Data;
      if (data) {
        this.messages = data;
        this.currentuser = userid;
        this.GetUserMessages();
        this.pollingLoop = true;
        this.PollingLoop();
      }
    },
    PollingLoop: async function() {
      const _currentuser = this.currentuser;
      if (this.pollingLoop === true) {
        let response = await fetch(`${this.endpointAPI}getmsgbyuser`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userid: _currentuser
          })
        });
        let result = await response.json();
        let data = await result.Data;
        if (data && data.length > 0 && data[0].userid === _currentuser) {
          this.messages = data;
        }
      }

      if (this.current === "directchat") {
        setTimeout(() => {
          this.PollingLoop(_currentuser);
        }, 3000);
      }

      return await false;
    },
    SendMessage: async function() {
      this.pollingLoop = false;
      const _currentuser = this.currentuser;
      if(!this.currentuser)
        return await false;
      const msg = document.getElementById("message").value;
      document.getElementById("message").value = "";
      let response = await fetch(`${this.endpointAPI}onedirection`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: _currentuser,
          message: msg
        })
      });
      let result = await response.json();
      let status = await result.Status;
      if (status === "Success") {
        this.pollingLoop = true;
        this.PollingLoop();
      }
    }
  }
};
</script>

<style lang="scss">
@import "../assets/CSS/chat.css";
</style>