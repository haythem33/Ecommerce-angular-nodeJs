import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PanelService {
api_url : String = environment.api_url;
  constructor(public http: HttpClient, private socket: Socket) { }

addPanelAccount(id, form) {
  return this.http.post(this.api_url +  `/panel/addToaccount/${id}`, form);
}
addPanelNoAccount(form) {
  return this.http.post(this.api_url + `/panel/addNoaccount`, form);
}
loginPanel(form,idUser) {
  return this.http.post(this.api_url +  `/panel/loginPanel/${idUser}`, form);
}
getPanel(id) {
  return this.http.get(this.api_url +  `/panel/getpanel/${id}`);
}
getPanelSocket() {
  return this.socket.fromEvent('getpanel');
}
deletePanel(id, idProduct) {
  return this.http.get(this.api_url +  `/panel/deleteProduct/${id}/${idProduct}`);
}
deletePanelSocket() {
  return this.socket.fromEvent('deleteProduct');
}
updateQuatite(id, index, body) {
  return this.http.post(this.api_url +  `/panel/updatenombre/${id}/${index}`, body);
}
confirmPanel(id,idUSer, form) {
  return this.http.post(this.api_url +  `/panel/confirmPanel/${id}/${idUSer}`, form);
}
getAllPanel(form) {
  return this.http.post(this.api_url +  `/panel/getActivePanel`, form);
}
confirmPanelNoAccount(id, form) {
  return this.http.post(this.api_url +  `/panel/confirmPanelNoAccount/${id}`, form);
}
PanelDone(id,form) {
  return this.http.post(this.api_url + `/panel/panelDone/${id}`, form)
}
getHistory(form) {
  return this.http.post(this.api_url + '/panel/getHistory', form);
}
}
