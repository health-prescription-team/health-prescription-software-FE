import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import * as signalR from "@microsoft/signalr";
import {ChatService} from "../../services/chat.service";

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
  egn:string = ""
  connection:any = undefined

  chatMessages:any = []
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
      (res:any)=>{
        this.chatMessages = res
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

  sendMessage(message:string){
    this.connection.invoke("SendMessage",this.egn, message)
  }


}
