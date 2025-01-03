// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import { join } from 'path';
// import { IoAdapter } from '@nestjs/platform-socket.io';

// async function bootstrap() {
//   const app = await NestFactory.create<NestExpressApplication>(AppModule);
//   const config = new DocumentBuilder()
//     .setTitle('Blog')
//     .setDescription('A simple blog API.')
//     .setVersion('1.0')
//     .addTag('Auth')
//     .addTag('Users')
//     .addBearerAuth()
//     .build();
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('/api-docs', app, document, {
//     customSiteTitle: 'Backend Generator',
//     customfavIcon: 'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
//     customJs: [
//       'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
//       'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
//     ],
//     customCssUrl: [
//       'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
//       'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
//       'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
//     ],
//   });

//   app.enableCors({
//     origin: 'http://localhost:3000', // Allow requests from your frontend
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // Set to true if you're sending cookies or authorization headers
//   });

//   // app.useStaticAssets(join(__dirname, '../../uploads'));
//   app.useStaticAssets(join(__dirname, '../../'));

//   const ioAdapter = app.get(IoAdapter);
//   ioAdapter.createIOServer(5000, {
//     cors: {
//       origin: 'http://localhost:3000',
//       methods: ['GET', 'POST'],
//       allowedHeaders: ['content-type'],
//       credentials: true,
//     },
//   });

//   await app.listen(5000);
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Set up WebSocket adapter
  app.useWebSocketAdapter(new IoAdapter(app));

  // Set up Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Blog')
    .setDescription('A simple blog API.')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Users')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api-docs', app, document, {
    customSiteTitle: 'Backend Generator',
    customfavIcon: 'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  });

  // Enable CORS for HTTP requests
  app.enableCors({
    origin: '*', // Allow requests from your frontend.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Set to true if you're sending cookies or authorization headers
  });

  // Set up CORS for the WebSocket server (Socket.io)
  // const ioAdapter = app.get(IoAdapter);
  // ioAdapter.createIOServer(5000, {
  //   cors: {
  //     origin: 'http://localhost:3000',
  //     methods: ['GET', 'POST'],
  //     allowedHeaders: ['content-type'],
  //     credentials: true,
  //   },
  // });

  await app.listen(5000);
}
bootstrap();
