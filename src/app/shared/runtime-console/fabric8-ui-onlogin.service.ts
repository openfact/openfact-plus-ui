import { OnLogin } from './../../runtime-console/shared/onlogin.service';
import { LoginService } from './../login.service';
import { Injectable } from '@angular/core';

@Injectable()
export class Fabric8UIOnLogin implements OnLogin {

    constructor(private loginService: LoginService) {

    }

    // TODO - remove this in favor of handling all tokens through ngx-login-client
    get token(): string {
        // return this.loginService.openShiftToken;
        return null;
    }

    public onLogin(token: string) {
        // Not needed
    }

}
