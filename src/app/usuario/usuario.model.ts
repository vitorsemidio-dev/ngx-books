import { Livro } from '../livros/livro.model';

export class Usuario {
  id: string;
  name: string;
  email: string;
  bookRented?: Livro[];
  imgUrl: string;
}
