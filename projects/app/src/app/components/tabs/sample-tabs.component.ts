import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { LibTabComponent } from 'projects/ng-components/src/lib/controls/tabs/lib-tab.component';



@Component({
    selector: 'app-sample-tabs',
    templateUrl: './sample-tabs.component.html'
})
export class SampleTabsComponent implements OnInit {
    public ngOnInit(): void {
        this.news = [{
            "name": "Jessie Patterson",
            "description": "Veniam reprehenderit proident ullamco id et id qui consequat. Irure excepteur sint labore dolor deserunt quis do consectetur esse. Ipsum labore aute cupidatat ullamco esse minim in elit labore nulla."
        }, {
            "name": "Winters Sosa",
            "description": "Ullamco veniam pariatur elit sunt ullamco culpa ea. Sit nisi minim voluptate proident duis. Labore pariatur nulla tempor et eu veniam exercitation cupidatat."
        }, {
            "name": "Pearson Ayers",
            "description": "Ut duis occaecat enim sint exercitation Lorem do dolor. Reprehenderit culpa ex Lorem proident ipsum velit eu consequat est adipisicing ullamco et sunt. Magna cupidatat ex ut laboris deserunt sit voluptate in consequat ipsum magna."
        }, {
            "name": "Marie Lyons",
            "description": "Id consequat aute commodo nisi et enim commodo nulla proident consectetur. Irure nostrud in sunt amet voluptate cupidatat excepteur nisi culpa. Consectetur ut labore officia consequat ea consequat irure duis et deserunt elit irure."
        }, {
            "name": "Farley Roach",
            "description": "Commodo non consectetur magna do tempor aliquip ullamco Lorem. Ad officia non nisi sint irure mollit id nulla dolore. Pariatur pariatur minim nulla minim sunt minim quis esse tempor fugiat pariatur cupidatat."
        }, {
            "name": "Ladonna Yates",
            "description": "Laborum culpa voluptate deserunt Lorem cupidatat ullamco. Reprehenderit aliqua mollit quis proident nisi commodo magna labore. Ad deserunt mollit voluptate dolor in sunt nostrud nostrud in magna ex laboris duis veniam."
        }];
    }

    public news: { name: string, description: string, template?: TemplateRef<any> }[] = [];

    public onTabChanged(tab: LibTabComponent): void {
        console.log('tab change', tab);
    }

    public onNewsDelete(item: any): void {
        const itemIndex = this.news.indexOf(item);
        this.news.splice(itemIndex, 1);
        console.log(this.news);
    }
}
