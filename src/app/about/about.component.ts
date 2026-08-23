import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
  private route = inject(ActivatedRoute, { optional: true });

  public title: string =
    this.route ? this.route.snapshot.data['title'] ?? '' : '';
}

export { AboutComponent as About };
