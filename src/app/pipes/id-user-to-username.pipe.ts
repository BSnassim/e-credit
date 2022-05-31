import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../services/user.service';

@Pipe({
  name: 'idUserToUsername'
})
export class IdUserToUsernamePipe implements PipeTransform {
  constructor(private userService: UserService) { }

  async transform(id: string) {
    const result: any = await this.userService.getUserById(id).toPromise();

    if (result) {
      return result.prenom + " " + result.nom;
    } else {
      return null;
    }
  }
}
