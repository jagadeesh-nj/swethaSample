import { CanActivateChildFn } from '@angular/router';

export const roleGuard: CanActivateChildFn = (childRoute, state) => {
  
  const userrole : string = 'user';

  if(userrole == 'admin'){
   return true;
  } else {
    alert('you dont have access');
    return false;
  }
};
