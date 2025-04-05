import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService=inject(UserService);
  const router=inject(Router);
  const isAuth=!!userService.getUser(); // getUser() может теперь вернуть null
  if (!isAuth) {
    router.navigate(['auth']);
  }
  return isAuth;
};
