import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from "../../api/decarators/roles.decarator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        console.log("Inside RolesGuard");
        const request = context.switchToHttp().getRequest();
        const { role } = request.user;

        const requiredRoles = this.reflector.get(Roles, context.getHandler())
        if (requiredRoles.some(requiredRole => requiredRole === role)) {
            console.log('User has all reauired role!');
            return true
        }
        return false
    }
}