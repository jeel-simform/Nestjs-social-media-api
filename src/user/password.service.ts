import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    const saltRound = 10;
    const hashPassword = await bcrypt.hash(password, saltRound);
    return hashPassword;
  }
  async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    const isMatch = bcrypt.compare(password, hashPassword);
    return isMatch;
  }
}
