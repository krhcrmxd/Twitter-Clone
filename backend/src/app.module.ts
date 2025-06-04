import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { PostModule } from "./post/post.module";
import { UserModule } from "./user/user.module";

@Module({
    imports: [UserModule, PostModule, AuthModule, ConfigModule.forRoot()],
})
export class AppModule {}
