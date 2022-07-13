<template>
    <div class="container p-4 detail">
        <div class="row">
            <div class="col-3 p-0">
                <ul class="list-group chat-list">
                    <div v-if="opponents != ''">
                        <div v-for="(opponent_user, i) in opponents" :key="i" @click="roomClick(i)">
                            <div class="opponent_profile" style="cursor:pointer "
                                :style="{ backgroundImage: `url(${opponent_user.photoURL})` }"
                                @click="user_click(opponent_user.uid)"></div>
                            <li class="list-group-item" style="position:static">
                                <h6 id="chatroom" style="cursor:default">{{ opponent_user.name }}</h6>
                            </li>
                        </div>
                    </div>
                    <div class="list-group-item" style="text-align:center">
                        <button class="new_chat" @click="new_chat">+</button>
                    </div>
                </ul>
            </div>
            <div class="col-9 p-0">
                <div v-if="!add_chatroom">
                    <div class="chat-room">
                        <ul class="list-group chat-content">
                            <li v-for="message in messages" :key="message">
                                <span class="chat-box" :class="{ mine: message.isMine }">{{ message.content }}</span>
                                <h5 style="font-size:smaller;" :class="{ mine: message.isMine }">{{ message.date }}</h5>
                            </li>
                        </ul>
                        <div class="input-group">
                            <input class="form-control" id="chat-input">
                            <button class="btn btn-secondary" id="send" @click="send">전송</button>
                        </div>
                    </div>
                </div>
                <div v-if="add_chatroom">
                    <div class="chat-room">
                        <ul class="list-group chat-content">
                            <div style="margin-top:5px; margin-left:5px" v-for="(opponent_user, i) in no_chatroom_user"
                                :key="i" @click="open_chat(opponent_user.uid)">
                                <div class="opponent_profile" style="cursor:pointer"
                                    :style="{ backgroundImage: `url(${opponent_user.photoURL})` }"></div>
                                <li class="list-group-item" style="position:static; margin-top:0px;">
                                    <h6 id="chatroom" style="cursor:default">{{ opponent_user.name }}</h6>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { db } from '../main.js'
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore"
export default {
    props: {
        currentuser: Object,
    },
    data() {
        return {
            opponents: [],
            rooms: [],
            clicked_chatroom: '',
            messages: [],
            add_chatroom: false,
            no_chatroom_user: [],
        }
    },
    mounted() {
        const chatRef = collection(db, 'chatroom');
        const q = query(chatRef, where('chat_user', 'array-contains', this.currentuser.uid));
        onSnapshot(q, (result) => {
            this.rooms.splice(0, this.rooms.length);
            this.opponents.splice(0, this.opponents.length);
            var docs_order = result.docs.sort(function (a, b) {
                return b.data().recent_msg - a.data().recent_msg;
            });
            docs_order.forEach((room) => {
                this.rooms.push(room.id);
                var opponent;
                if (room.data().chat_user[0] == this.currentuser.uid) opponent = room.data().chat_user[1];
                else opponent = room.data().chat_user[0];
                getDoc(doc(db, 'users', opponent)).then((opponent_user) => {
                    this.opponents.push({
                        name: opponent_user.data().name,
                        email: opponent_user.data().email,
                        photoURL: opponent_user.data().photoURL,
                        uid: opponent_user.id,
                    });
                })
            })
            this.clicked_chatroom = this.rooms[0];
            this.msg_Load();
        })
    },
    updated() {
        if (!this.add_chatroom) {
            var chat_scroll = document.querySelector('.chat-content');
            chat_scroll.scrollTop = chat_scroll.scrollHeight - chat_scroll.clientHeight + 10;
        }
    },
    methods: {
        msg_Load: function () {
            getDoc(doc(db, 'chatroom', this.clicked_chatroom)).then((db_msg) => {
                const q = query(collection(db, db_msg.ref.path + '/message'), orderBy('date'));
                onSnapshot(q, (result) => {
                    this.messages.splice(0, this.messages.length);
                    result.docs.forEach((message) => {
                        var msg_date = new Date((message.data().date.seconds * 1000) + (message.data().date.nanoseconds / 10000));
                        if (message.data().uid == this.currentuser.uid) {
                            this.messages.push({
                                content: message.data().content,
                                date: msg_date.getDate() + '일 ' + msg_date.getHours() + ':' + msg_date.getMinutes().toString().padStart(2, '0'),
                                isMine: true,
                            })
                        }
                        else {
                            this.messages.push({
                                content: message.data().content,
                                date: msg_date.getDate() + '일 ' + msg_date.getHours() + ':' + msg_date.getMinutes().toString().padStart(2, '0'),
                                isMine: false,
                            })
                        }
                    })
                });

            });
        },
        new_chat: function () {
            this.add_chatroom = true
            const q = query(collection(db, 'users'));
            onSnapshot(q, (result) => {
                this.no_chatroom_user.splice(0, this.no_chatroom_user.length)
                result.docs.forEach((user) => {
                    var isNoChatroom = true;
                    this.opponents.forEach((opponent) => {
                        if (user.data().email == opponent.email) isNoChatroom = false;
                    });
                    if (isNoChatroom && user.id != this.currentuser.uid) {
                        this.no_chatroom_user.push({
                            name: user.data().name,
                            email: user.data().email,
                            photoURL: user.data().photoURL,
                            uid: user.id,
                        });
                    }
                })
            })
        },
        send: function () {
            var send_msg = {
                content: document.querySelector('#chat-input').value,
                date: new Date(),
                uid: this.currentuser.uid,
            }
            var chatroomRef = doc(db, 'chatroom', this.clicked_chatroom);
            getDoc(chatroomRef).then((db_msg) => {
                addDoc(collection(db, db_msg.ref.path + '/message'), send_msg);
                updateDoc(chatroomRef, { recent_msg: send_msg.date });
                document.querySelector('#chat-input').value = ''
            });
        },
        roomClick: function (i) {
            if (this.clicked_chatroom != this.rooms[i]) {
                this.clicked_chatroom = this.rooms[i];
                document.querySelector('#chat-input').value = '';
            }
            this.msg_Load();
        },
        open_chat: function (uid) {
            addDoc(collection(db, 'chatroom'), {
                chat_user: [this.currentuser.uid, uid],
                recent_msg: new Date(),
            });
            this.add_chatroom = false;
        },
        user_click: function (uid) {
            location.href = '/profile/' + uid;
        }

    }
}
</script>

<style>
#chatroom {
    font-size: 80%;
    text-align: right;
}

.new_chat {
    font-size: large;
    border-radius: 50%;
    border: 1px solid black;
}

.chat-list {
    border: 0.5px solid grey;
    height: 100%;
}

.chat-content {
    height: 450px;
    overflow-y: scroll;
    padding: 10px;
}

.chat-content li {
    margin-top: 10px;
}

.text-small {
    font-size: 12px;
    color: gray;
    margin-bottom: 0;
}

.chat-box {
    background: #eee;
    padding: 5px;
    border-radius: 5px;
    margin-left: 10px;
    float: left;
}

.mine {
    float: right;
}

.opponent_profile {
    width: 30px;
    height: 30px;
    background-size: 100%;
    border-radius: 50%;
    float: left;
    margin: 5px;
}
</style>