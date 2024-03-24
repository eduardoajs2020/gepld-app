import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit{

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

  cadastrarIndicio(): void {
    const data = {
      tipoPessoa: this.tipoPessoa,
      cpfCnpj: this.cpfCnpj,
      nomeCliente: this.nomeCliente,
      produto: this.produto,
      data: this.data,
      valorMovimentado: this.valorMovimentado,
      detalhesMovimentacao: this.detalhesMovimentacao
    };

    this.http.post<any>('http://localhost:3000/indicios', data)
      .subscribe(response => {
        console.log(response);
      });
  }



}