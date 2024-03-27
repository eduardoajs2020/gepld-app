import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.css'
})
export class ConnectionComponent {

}

@Injectable({
  providedIn: 'root'
})
  
export class ConnectionService {
  private apiUrl = 'http://localhost:4200/api';

  constructor(private http: HttpClient) { }

  // Método para conectar ao banco de dados SQL Server
  connectToDatabase() {
    return this.http.post(`${this.apiUrl}/connect`, {});
  }

  // Método para criar um novo registro
  createRecord(newRecord: any) {
    return this.http.post(`${this.apiUrl}/registros`, newRecord);
  }

  // Método para obter todos os registros
  getAllRecords() {
    return this.http.get(`${this.apiUrl}/registros`);
  }

  // Método para obter um único registro pelo ID
  getRecordById(id: number) {
    return this.http.get(`${this.apiUrl}/registros/${id}`);
  }

  // Método para atualizar um registro existente pelo ID
  updateRecord(id: number, updatedRecord: any) {
    return this.http.put(`${this.apiUrl}/registros/${id}`, updatedRecord);
  }

  // Método para excluir um registro pelo ID
  deleteRecord(id: number) {
    return this.http.delete(`${this.apiUrl}/registros/${id}`);
  }
}
