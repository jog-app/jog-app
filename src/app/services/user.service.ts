import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  private userId = '05da912e-9126-4efa-8747-f163f2283703';

  public getUserId(): string {
    return this.userId;
  }
}
