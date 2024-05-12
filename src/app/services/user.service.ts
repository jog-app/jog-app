import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  private userId = 'bcd501de-094f-4ab5-8cd7-529a7bfd9157';

  public getUserId(): string {
    return this.userId;
  }
}
