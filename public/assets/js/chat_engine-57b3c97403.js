class ChatEngine{constructor(e,s,o){this.chatBox=$("#"+e),this.userEmail=s,this.toEmail=o,this.socket=io.connect("http://localhost:5000"),console.log("hapy",this.userEmail),this.userEmail&&this.connectionHandler()}connectionHandler(){let e=this;this.socket.on("connect",(function(){console.log("connection established using sockets...!")})),this.socket.emit("join_room",{user_email:e.userEmail,chatroom:"joinow",to_email:e.toEmail}),e.socket.on("user_joined",(function(e){console.log("a user joined",e)})),$("#send-message").click((function(){let s=$("#chat-message-input").val();""!=s&&e.socket.emit("send_message",{message:s,user_email:e.userEmail,chatroom:"joinow"})})),e.socket.on("receive_mesaage",(function(s){console.log(s.message);let o=$("<li>");o.append($("<span>",{html:s.message}));let t="other-message";s.user_email==e.userEmail&&(t="self-message"),o.addClass(t),$("#chat-messages-list").append(o)}))}}