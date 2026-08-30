import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public pageTitle: string = 'Build the hero behind your next adventure';
}
