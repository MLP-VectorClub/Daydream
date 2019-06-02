import { Pipe, PipeTransform } from '@angular/core';
import { UserRole } from 'app/types';

@Pipe({ name: 'permission' })
export class PermissionPipe implements PipeTransform {
  private readonly roleList: UserRole[] = [
    'guest', 'user', 'member', 'assistant', 'staff', 'admin', 'developer',
  ];

  transform(userRole: UserRole, checkAgainst: UserRole): boolean {
    return this.roleList.indexOf(checkAgainst) >= this.roleList.indexOf(userRole);
  }
}
