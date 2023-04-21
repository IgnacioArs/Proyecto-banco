import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule,DocumentBuilder} from '@nestjs/swagger'
declare const module: any;

async function Main() {
  const app = await NestFactory.create(AppModule);

   const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Banco API MS')
    .setDescription('The banco API description')
    .setVersion('1.0')
    .addTag('Banco example basic')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
  app.setGlobalPrefix(''); //NOT PREFIX TO USE HTTP PETITIONS WITH OUT PROBLEMS
  app.enableCors({
  /* http://localhost:3000/api */
  origin:['http://localhost:3000']
  });
  await app.listen(process.env.PORT,()=>{
  console.log("Server running in port MS-BANCO",process.env.PORT);
  });
  
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  
  }
  Main();
