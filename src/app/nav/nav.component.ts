import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public sections = [
    {label: "Dashboard", href: "",      icon: "./assets/icons/border-all-solid.svg", title: "Dashboard", alt: "Menu item Dashboard"},
    {label: "Vehicle",   href: "/home", icon: "./assets/icons/car-side-solid.svg",   title: "Vehicle",   alt: "Menu item Vehicle"},
    {label: "Reports",   href: "",      icon: "./assets/icons/chart-bar-solid.svg",  title: "Reports",   alt: "Menu item Reports"}
  ]
  constructor() { }

  ngOnInit() {
  }

}
