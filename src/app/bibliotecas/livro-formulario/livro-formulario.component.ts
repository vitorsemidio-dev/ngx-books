import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
    // console.log(this.route.data);
    // this.route.data.subscribe((response) => console.log(response));
    // this.route.data['livro'].su
    const data = this.route.snapshot.data;
    console.log(data);
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
