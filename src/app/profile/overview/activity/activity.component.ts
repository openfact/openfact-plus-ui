import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Context, Contexts } from '../../../ngx/ngx-clarksnut';
import { UserService, User } from '../../../ngx/ngx-login-client';

export class Activity {
  public what: string;
  public when: string;
}

@Component({
  selector: 'cn-activity',
  templateUrl: './activity.component.html'
})
export class ActivityComponent implements OnDestroy, OnInit {

  public activityItems: any[] = [];
  public context: Context;
  public loggedInUser: User;
  public subscriptions: Subscription[] = [];

  constructor(
    private contexts: Contexts,
    private userService: UserService,
    private router: Router) {
    this.subscriptions.push(contexts.current.subscribe((val) => this.context = val));
    this.subscriptions.push(userService.loggedInUser.subscribe((user) => {
      this.loggedInUser = user;
    }));
  }

  public ngOnInit(): void {

  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  // Actions

  public routeToHome(): void {
    this.router.navigate(['/', '_home']);
  }

  // Private

}
