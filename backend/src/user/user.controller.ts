import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Put,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import errorHandler from "src/utils/errorHandler";
import { getEmailFromReq } from "src/utils/getEmailFromReq.util";
import { CreateUserDto, UpdateUserDto } from "./user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    constructor(
        private readonly userService: UserService,
        private Jwt: JwtService,
    ) {}

    @Get("/")
    @UsePipes(new ValidationPipe())
    async getUserByEmail(@Req() req: Request) {
        try {
            const email = await getEmailFromReq(req, this.Jwt);
            const user = await this.userService.getUserByEmail(email);
            if (!user) return undefined;
            const { password, ...data } = user;
            return data;
        } catch (e) {
            errorHandler(e);
        }
    }

    @Post("/new")
    @UsePipes(new ValidationPipe())
    async createUser(@Body() dto: CreateUserDto) {
        return await this.userService.createUser(dto);
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete("/")
    async deleteUser(@Req() req: Request) {
        try {
            const email = await getEmailFromReq(req, this.Jwt);
            return await this.userService.deleteUser(email);
        } catch (e) {
            errorHandler(e);
        }
    }

    @UseGuards(AuthGuard("jwt"))
    @UsePipes(new ValidationPipe())
    @Put("/")
    async updateUser(@Body() dto: UpdateUserDto, @Req() req: Request) {
        try {
            const email = await getEmailFromReq(req, this.Jwt);

            return await this.userService.updateUser(dto, email);
        } catch (e) {
            errorHandler(e);
        }
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("/all")
    async getDataForPostRender() {
        return await this.userService.getDataForPostRender();
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("/unq")
    async getDataForPostRenderUniqueUser(@Req() req: Request) {
        try {
            const email = await getEmailFromReq(req, this.Jwt);
            return await this.userService.getDataForPostRenderUniqueUser(email);
        } catch (e) {
            errorHandler(e);
        }
    }
}
