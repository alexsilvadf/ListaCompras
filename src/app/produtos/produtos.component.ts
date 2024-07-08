import { Component, numberAttribute } from '@angular/core';
import { Produto } from '../Produto';
import { Guid } from 'guid-typescript';
import { faCheckCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
})
export class ProdutosComponent {
  faCheckCircle = faCheckCircle;
  faTrash = faTrash;
  produtos: Produto[] = [];
  formulario: any;

  constructor() {}

  ngOnInit(): void {
    this.ExibirProdutos();
    this.formulario = new FormGroup({
      produtoId: new FormControl(),
      nome: new FormControl(),
      quantidade: new FormControl(),
      isComprado: new FormControl(),
    });
  }

  CadastrarProduto() {
    this.formulario.value.produtoId = Guid.create().toString();
    this.formulario.value.isComprado = false;
    const produto: Produto = this.formulario.value;

    if(produto.nome === null || produto.quantidade === null){
      alert("Campos obrigatórios não preenchidos...")
    }

    this.produtos.push(produto);

    localStorage.setItem('BD', JSON.stringify(this.produtos));

    this.formulario.reset();
  }

  ExibirProdutos() {
    if (localStorage.getItem('BD')) {
      this.produtos = JSON.parse(localStorage.getItem('BD') || '{}');
    } else {
      this.produtos = [];
    }
  }

  AtualizarProduto(produtoId: string): void {
    const indice: number = this.produtos.findIndex(
      (p) => p.produtoId === produtoId
    );

    if (this.produtos[indice].isComprado) {
      this.produtos[indice].isComprado = false;
    }else{
        this.produtos[indice].isComprado = true;      
    }

    localStorage.setItem("BD", JSON.stringify(this.produtos));
  }


  RemoverProduto(produtoId: string){
    const indice: number = this.produtos.findIndex(
      (p) => p.produtoId === produtoId
    );
    console.log(this.produtos)

    this.produtos.splice(indice, 1);

    console.log(this.produtos)



   

   
  }

}
