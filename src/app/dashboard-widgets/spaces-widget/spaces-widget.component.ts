import { Space } from 'ngo-openfact-sync';
import { Input } from '@angular/core';
import { PipelinesService } from './../../shared/runtime-console/pipelines.service';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy, } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'ofs-spaces-widget',
    templateUrl: './spaces-widget.component.html',
    styleUrls: ['./spaces-widget.component.scss']
})
export class SpacesWidgetComponent implements OnInit, OnDestroy {

    @Input()
    public spaces: Space[] = [];

    constructor() { }

    public ngOnInit() {

    }

    public ngOnDestroy() {

    }

}