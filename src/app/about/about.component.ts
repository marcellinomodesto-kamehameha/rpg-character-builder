import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'about-title',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
  private route = inject(ActivatedRoute);

  public title: string =
    this.route.snapshot.data['title'] ?? '';
}

export { AboutComponent as About };
