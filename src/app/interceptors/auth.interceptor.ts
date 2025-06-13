import { HttpInterceptorFn } from '@angular/common/http';
import { AuthState } from '../states/auth.state';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authState = inject(AuthState);

  const unProtectedRoutes = [
    '/login',
    '/register'
  ];

  const isProtectedRoute = (url: string): boolean => {
    return !unProtectedRoutes.some(route => url.includes(route));
  };

  if (!isProtectedRoute(req.url)) {
    return next(req);
  }

  const token = authState.token();

  if (!token) {
    return next(req);
  }

  const clonedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });

  return next(clonedReq);
};
