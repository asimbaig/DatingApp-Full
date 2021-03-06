import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/Auth.service';
import { Message } from '../_models/Message';

@Injectable()
export class MsgsResolver implements Resolve<Message[]> {
    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'Unread';

    constructor(private userService: UserService, private router: Router,
                private alertify: AlertifyService, private authService: AuthService) {}

    // resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    //     console.log('>>>>>>>>>>>>>>>>>>|>|>|>|>|>|>' + this.authService.decodedToken.nameid);
    //     return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likesParam).pipe(
    //         catchError(error => {
    //             this.alertify.error('Problem retrieving data');
    //             this.router.navigate(['/home']);
    //             return of(null);
    //         })
    //     );
    // }
    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
      // console.log('MsgsResolver>>>>>>>>>>|>|>|>|>|>|>' + this.authService.decodedToken.nameid);
      return this.userService.getMessages(this.authService.decodedToken.nameid,
            this.pageNumber, this.pageSize, this.messageContainer).pipe(
          catchError(error => {
              this.alertify.error('Problem retrieving messages');
              this.router.navigate(['/home']);
              return of(null);
          })
      );
    }

}
