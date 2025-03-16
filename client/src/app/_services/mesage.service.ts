import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaginatedResult } from '../_models/pagination';
import { Message } from '../_models/message';
import { setParginatedResponse, setParginationHeader } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MesageService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  paginatedResult = signal<PaginatedResult<Message[]> | null>(null);

  getMessages(pageNumber: number, pageSize: number, container: string) {
    let params = setParginationHeader(pageNumber, pageSize);
    params = params.append('Container', container);

    return this.http.get<Message[]>(this.baseUrl + 'messages', { observe: 'response', params })
      .subscribe({
        next: response => setParginatedResponse(response, this.paginatedResult)
      })
  }
}
