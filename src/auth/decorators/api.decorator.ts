import { applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

export const ApiAuth = (()=>{
    return applyDecorators(
          ApiResponse({
            status: 401,
            description: "Missiong or invalid token"
          }),
          ApiResponse({
            status: 403,
            description: "Missiong role"
          }),
          ApiResponse({
            status: 500,
            description: "Server error"
          })
    )
})