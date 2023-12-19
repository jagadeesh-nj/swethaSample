import { CanDeactivateFn } from '@angular/router';

export const deactivateGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  
  let response = confirm("are you sure to leave ?");

  if(response == true) {
    return true;
  }
  else {
    return false;
  }
};
