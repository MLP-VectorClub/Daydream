import { Pipe, PipeTransform } from '@angular/core';
import { UserRole } from 'app/types';

@Pipe({ name: 'roleLabel' })
export class RoleLabelPipe implements PipeTransform {
  private readonly labelMap: { [key in UserRole]: string } = {
    guest: 'Guest',
    user: 'DeviantArt User',
    member: 'Club Member',
    assistant: 'Assistant',
    staff: 'Staff',
    admin: 'Administrator',
    developer: 'Site Developer',
  };

  transform(provider: UserRole): string {
    return this.labelMap[provider];
  }
}
