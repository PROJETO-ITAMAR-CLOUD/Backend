import { Controller, Post, Body } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { LoginService } from "./auth.service";

@Controller("login")
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post()
    create(@Body() loginDto: LoginDto) {
        return this.loginService.create(loginDto);
    }
}
