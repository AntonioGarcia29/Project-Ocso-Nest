
import { ArrayNotEmpty, IsArray, IsString, MaxLength } from "class-validator";
import { Location } from "../entities/location.entity";

export class CreateLocationDto  extends Location{
    @IsString()
    @MaxLength(25)
    locationName: string;
    @IsString()
    @MaxLength(160)
    locationAdress: string;
    @IsString()
    @MaxLength(25)
    @IsArray()
    @ArrayNotEmpty()
    locationLatLng: number[];
}
