import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.component.html',
  styleUrls: ['./visualizacao.component.css']
})
export class VisualizacaoComponent implements OnInit {
  indicios: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.carregarIndicios();
  }

  carregarIndicios(): void {
    this.http.get<any[]>('http://localhost:3000/indicios')
      .subscribe(data => {
        this.indicios = data;
      });
  }
}

