import { Injectable } from '@angular/core';
import * as io from "socket.io-client"
import {Observable} from "rxjs";

const backendUrl: string = "https://localhost:3200"
@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private clientSocket
  constructor() {
    this.clientSocket = io.connect(backendUrl)
  }

  listen_to_server(ev: string): Observable<any>{
    console.log("listen_to_server(ev = " + ev + ")")
    return new Observable((subscribe) => {
      this.clientSocket.on(ev, (data: any) =>{
        console.log('data:', data)
        subscribe.next(data)
      })
    })
  }

  emit_to_server(ev: string, data: any): void{
    console.log("emit_to_server(ev = " + ev + ", data = " + data + ")")
    this.clientSocket.emit(ev, data)
  }
}
