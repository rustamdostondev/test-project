import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Request, urlencoded } from 'express';
import { Role } from "./role.enum";
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }
  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>("roles", [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles) {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest()
    const userRole = request.headers.role

    if (!userRole) return false


    return requireRoles.some((role) => userRole == role);
  }
}