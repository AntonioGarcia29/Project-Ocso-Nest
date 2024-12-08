import { applyDecorators, UseGuards } from "@nestjs/common";
import { RolesGuard } from "../guards/roles.guard";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guards/auth.guard";

export const Auth = (...roles: string [])=> {
    roles.push("Admin");
    return applyDecorators(
        Roles(roles),
        UseGuards(AuthGuard,RolesGuard)
    )
}