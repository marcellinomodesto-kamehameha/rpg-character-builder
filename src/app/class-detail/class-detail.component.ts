import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-class-detail',
  imports: [RouterLink],
  templateUrl: './class-detail.html',
  styleUrl: './class-detail.css',
})
export class ClassDetailComponent {
  private route = inject(ActivatedRoute, { optional: true });

  public classId: string =
    this.route?.snapshot.paramMap.get('id') ?? '';
}

export { ClassDetailComponent as ClassDetail };
