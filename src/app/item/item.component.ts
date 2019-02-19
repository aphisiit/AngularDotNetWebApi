import { Component, OnInit } from '@angular/core';

import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  displayedColumns: string[] = ['saleText', 'idLength', 'idWidth', 'idHeight', 'fgSheetLength', 'fgSheetWidth'];
  items: Item[];

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.itemService.getItem()
      .subscribe(items => this.items = items);
  }

}
