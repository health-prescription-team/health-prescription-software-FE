import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import * as signalR from "@microsoft/signalr";
import {ChatService} from "../../services/chat.service";
import {ChatMessage, Me} from "../../interfaces";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private ChatService: ChatService,
  ) {
  }

  @ViewChild("messagesWrapper") messagesWrapper!:ElementRef

  me:Me = {id: "7a83ebc1-fefd-4173-836e-f03db09cd1ee"}
  egn:string = ""
  connection:any = undefined

  messageText:string=""

  chatMessages:ChatMessage[] = [

  ]
  ngOnInit() {
    // Access route parameters
    this.route.params.subscribe(params => {
      this.egn = params['egn'];
      this.startChatBtnClick(this.egn,localStorage.getItem("token")!)
      this.fetchChat()
    });
  }


  fetchChat(){
    this.ChatService.fetchChat(this.egn).subscribe(
      (res:ChatMessage[])=>{
        this.chatMessages = res.reverse()
        console.log(res)
    })
  }

  startChatBtnClick(egn:string,currentUserToken:string){
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://health-prescription-api.azurewebsites.net/chatHub" ,{ accessTokenFactory: () => currentUserToken})
      .build();

    this.connection.on("ReceiveMessage", (senderId:string, message:string, time:string) => {
      console.log(message)
    });


    this.connection.start()

  }

  sendMessage(messageElement:any){
    this.connection.invoke("SendMessage",this.egn, messageElement.value)

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

    this.chatMessages.push({ message: messageElement.value, messageTime: formattedDateTime, authorId: this.me.id, isRead: true})
    messageElement.value =""
    setTimeout(()=>{
      this.scrollToBottom()
    },0)
  }
     scrollToBottom() {
       this.messagesWrapper.nativeElement.scrollTop = this.messagesWrapper.nativeElement.scrollHeight;
    }


}
