import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallingapiService {
  public env:any = null;
  public url = "http://localhost:8080/";
  constructor(private http: HttpClient) {
  }

  postMethodApi(endUrl:any, payload:any){
    return this.http.post(this.url+endUrl, JSON.parse(JSON.stringify(payload))).pipe(
        map((response) => {
          return response;
      }),
        catchError((res)=>{
          return res;
        })
    );
  }

  getMethodApi(endUrl:any){
    return this.http.get(this.url+endUrl).pipe(
        map((response) => {
          console.log('conlsle response',response)
          return response;
      }),
        catchError((err)=>{
          return err;
        })
    );
  }

  iniliztion(){
    if(!this.env){
      this.http.get('/assets/environment.js').pipe(map((res)=>{
        console.log('res',res)
        this.env = res;
      })
    );
    console.log('this.env',this.env)
    }
  }

  updateDataApi(endurl: any, payload:any){
    return this.http.post(this.url+endurl, JSON.parse(JSON.stringify(payload))).pipe(
        map((response) => {
          return response;
      }),
        catchError((err)=>{
          return err;
        })
    );
  }
}
