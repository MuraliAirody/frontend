import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

    constructor(private loginServiec:LoginService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //add the jwt token from local storage

         // console.log("enetred authInter");
        

        let authReq = req
        let token = this.loginServiec.getToken();
        // console.log("token in intercep",token);
        
        if(token!=null){
            authReq= authReq.clone({setHeaders:{'Authorization':`Bearer ${token}`},
        })
        }
        // console.log("auth- >",authReq);
        
        return next.handle(authReq)
    }

}

export const authInterceptorProviders=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthTokenInterceptor,
        multi:true
    }
]