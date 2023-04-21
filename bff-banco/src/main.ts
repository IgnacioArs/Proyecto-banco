import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule,DocumentBuilder} from '@nestjs/swagger'
declare const module: any;

async function Main() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('BANCO BFF')
  .setDescription('Banco API')
  .setVersion('1.0')
  .addTag('banco')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('swagger', app, document);
app.enableCors({
  /* http://localhost:3000/api */
  origin:['http://localhost:4000','http://localhost:3003']
});
await app.listen(process.env.PORT,() =>{console.log('listening on port BFF-BANCO ',process.env.PORT)});
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => app.close());
}
}
Main();
