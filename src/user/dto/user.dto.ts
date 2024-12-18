import { Expose, Exclude } from 'class-transformer';

export class UserDto {
  @Exclude()
  id: number;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Exclude()
  pass_word: string;
  @Expose()
  phone: string;
  @Expose()
  birth_day: string;
  @Expose()
  gender: string;
  @Exclude()
  role: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
