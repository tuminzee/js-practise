import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Tumin1',
    },
    {
      id: 2,
      name: 'Tumin2',
    },
  ];

  findAll() {
    return this.users;
  }
}
