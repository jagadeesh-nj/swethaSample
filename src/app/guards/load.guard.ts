import { CanMatchFn } from '@angular/router';

export const loadGuard: CanMatchFn = (route, segments) => {
  return true;
};
