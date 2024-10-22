import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'; // Import HandlebarsAdapter
import { config } from 'dotenv';

// Load environment variables from .env file
config();

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: process.env.EXP_IN },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST, // Thay bằng SMTP server của bạn
        port: Number(process.env.MAIL_PORT) || 587, // Thông thường là 587 (TLS) hoặc 465 (SSL)
        secure: false, // True nếu sử dụng SSL, false nếu sử dụng TLS
        auth: {
          user: process.env.MAIL_USER, // Thay bằng email của bạn
          pass: process.env.MAIL_PASSWORD, // Mật khẩu của email hoặc app password
        },
      },
      defaults: {
        from: `"No Reply" ${process.env.MAIL_PASSWORD}`, // Email mặc định dùng để gửi
      },
      template: {
        dir: join(__dirname, '../../src/templates'), // Thư mục chứa các file template
        adapter: new HandlebarsAdapter(), // Dùng Handlebars làm template engine
        options: {
          strict: true,
        },
      },
    }),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
