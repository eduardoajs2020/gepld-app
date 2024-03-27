import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})

export class CadastroComponent implements OnInit{
[x: string]: any;


  tipoPessoa: number = 1;
  cpfCnpj: string = '';
  nomeCliente: string = '';
  produto: string = '';
  data: Date | undefined;
  valorMovimentado: number | undefined;
  detalhesMovimentacao: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  buscaCliente() {

    throw new Error('Method not implemented.');

  }

  cadastro() {

    throw new Error('Method not implemented.');

  }

  cadastrarIndicio() {
    const data = {
      tipoPessoa: this.tipoPessoa,
      cpfCnpj: this.cpfCnpj,
      nomeCliente: this.nomeCliente,
      produto: this.produto,
      data: this.data,
      valorMovimentado: this.valorMovimentado,
      detalhesMovimentacao: this.detalhesMovimentacao
    };

    this.http.post<any>('http://localhost:4200/connection', data)
      .subscribe(response => {
        console.log('Resposta:', response);
      }

    );
  }



}
