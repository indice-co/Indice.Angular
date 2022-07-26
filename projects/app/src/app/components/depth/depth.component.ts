import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-depth',
    templateUrl: './depth.component.html'
})
export class DepthComponent implements OnInit {
    constructor(private activatedRoute: ActivatedRoute) { }

    public id: string | undefined;

    public ngOnInit(): void {
        this.id = this.activatedRoute.snapshot.params['id'];
    }
}
