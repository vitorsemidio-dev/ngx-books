import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

interface IBiblioteca {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class BibliotecaService {
  private readonly apiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  criar(biblioteca: IBiblioteca) {
    return this.http.post(`${this.apiUrl}/libraries`, { ...biblioteca });
  }
}
