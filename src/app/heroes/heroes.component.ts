import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'action'];
  heroes: Hero[];

  constructor(private heroService: HeroService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    // this.refresh();
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
        this.refresh();
        // TODO : You can use getHeroes method instead refresh
        // this.getHeroes();
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  refresh() {
    // this.heroService.getHeroes().subscribe((res) => {
      this.getHeroes();
      this.changeDetectorRefs.detectChanges();
    // });
  }
}
