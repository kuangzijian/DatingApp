import { Component, inject } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent {
  memberService = inject(MembersService);

  ngOnInit(): void {
    if (this.memberService.members().length === 0) {
      this.loadMembers();
    }
  }

  loadMembers() {
    this.memberService.getMembers()
  }
}
