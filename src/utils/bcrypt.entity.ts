import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class BcryptEntity {
  private sault = 10;
  constructor() {}
  async hash(password: string): Promise<string> {
    console.log(password);
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, this.sault, (err, hash) => {
        console.log(hash);
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(hash);
        }
      });
    });
    // try {
    //   const hashedPassword = await bcrypt.hash(password, this.sault);
    //   return hashedPassword;
    // } catch (error) {
    //   console.error('Error hashing password:', error);
    //   throw error;
    // }
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, same) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(same);
        }
      });
    });
  }
}
