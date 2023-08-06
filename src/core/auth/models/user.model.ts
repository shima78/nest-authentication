import { AbstractEntity } from '../../../shared/models';

export class User extends AbstractEntity<string> {
  name: string;
  email: string;
  password: string;
  constructor(name: string, email: string, password: string) {
    super();
    this.name = name;
    this.email = email;
    this.password = password;
  }
  setPassword(password: string) {
    this.password = password;
  }
}
