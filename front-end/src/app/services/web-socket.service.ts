import { Injectable } from '@angular/core';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: any;

  constructor() { }

  connectToServer() {
    this.socket = io('http://localhost:3000', {
      withCredentials: true}); 
    this.socket.on('connect', () => {
      console.log('Connected to server');
    });


    this.socket.emit('event', { message: 'Hello server!' });
    
    this.socket.on('response', (data: any) => {
      console.log('Response from server:', data);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  }

  // Закрытие соединения с сервером
  disconnectFromServer() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
