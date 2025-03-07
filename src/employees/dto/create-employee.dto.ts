import { IsEmail, isEmail, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Employee } from "../entities/employee.entity";
import { Location } from "src/locations/entities/location.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class LocationEmployeeDto extends Location{
    @ApiProperty()
    locationId: number;

    @ApiPropertyOptional()
    locationName: string;

    @ApiPropertyOptional()
    locationLatLng: number[];

    @ApiPropertyOptional()
    locationAdress: string;
}
export class CreateEmployeeDto extends Employee {
@ApiProperty()
@IsString()
@MaxLength(30)
employeeName: string;

@ApiProperty()
@IsString()
@MaxLength(70)
employeeLastName: string;

@ApiProperty()
@IsString()
@MaxLength(14)
phoneNumber: string;

@ApiProperty()
@IsString()
@IsEmail()
employeeEmail: string;

@ApiPropertyOptional()
@IsObject()
@IsOptional()
location: Location;
}

