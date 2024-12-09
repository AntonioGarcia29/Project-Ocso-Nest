import { IsEmail, isEmail, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Employee } from "../entities/employee.entity";
import { Location } from "src/locations/entities/location.entity";

export class CreateEmployeeDto extends Employee {
@IsString()
@MaxLength(30)
employeeName: string;
@IsString()
@MaxLength(70)
employeeLastName: string;
@IsString()
@MaxLength(14)
phoneNumber: string;
@IsString()
@IsEmail()
employeeEmail: string;
@IsObject()
@IsOptional()
location: Location;
}
