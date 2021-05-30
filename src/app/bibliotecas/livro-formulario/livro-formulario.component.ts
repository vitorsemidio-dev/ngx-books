import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Livro } from 'src/app/livros/livro.model';

@Component({
  selector: 'app-livro-formulario',
  templateUrl: './livro-formulario.component.html',
  styleUrls: ['./livro-formulario.component.scss'],
})
export class LivroFormularioComponent implements OnInit {
  formularioLivro: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit() {
    this.montarFormulario();
    this.route.data.subscribe((resolve: { livro: Livro }) => {
      console.log(resolve.livro);
    });
  }

  montarFormulario() {
    this.formularioLivro = this.fb.group({
      name: [
        'nome livro',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      author: [
        'autor livro',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      pages: [
        350,
        [Validators.required, Validators.min(0), Validators.max(1000)],
      ],
      quantity: [10, [Validators.required, Validators.min(0)]],
    });
  }
}
