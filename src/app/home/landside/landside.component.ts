import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Broadcaster } from '../../ngx/ngx-base';
import { User, UserService } from '../../ngx/ngx-login-client';
import { Space, SpaceService } from '../../ngx/ngx-clarksnut';
import { SpacesService } from '../../ngx-impl/ngx-clarksnut-impl/spaces.service';

@Component({
  selector: 'cn-landside',
  templateUrl: './landside.component.html',
  styleUrls: ['./landside.component.scss']
})
export class LandsideComponent implements OnInit, OnDestroy {

  user: User;
  spaces: Space[];

  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private broadcaster: Broadcaster,
    private userService: UserService,
    private spaceService: SpaceService,
    private spacesService: SpacesService) {
    this.subscriptions.push(
      Observable.merge(
        this.userService.loggedInUser.do((user) => this.user = user),
        this.broadcaster.on('spaceCreated'),
        this.broadcaster.on('spaceDeleted')
      ).subscribe((val) => {
        this.spaceService.getSpacesByUserId(this.user.id, 'owner', 5).subscribe((val) => {
          this.spaces = val;
        });
      })
    );
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscriptions.forEach((subs) => subs.unsubscribe());
  }

  editSpace(space: Space) {
    this.router.navigate(['/_spaces', space.id]);
  }

}
