import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAuthDto { }

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}

export class LogoutDto {
    @IsString()
    @IsNotEmpty()
    refreshToken: string
}
