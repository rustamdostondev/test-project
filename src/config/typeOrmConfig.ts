import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConf = new DocumentBuilder()
    .setTitle('UzTrans documentation')
    .setDescription('The UzTrans API description')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'Authorisation', in: 'header' })
    // .addBearerAuth(
    //     {
    //         description: 'Default JWT Authorization',
    //         type: 'http',
    //         in: 'header',
    //         scheme: 'bearer',
    //         bearerFormat: 'JWT',
    //     },
    //     'defaultBearerAuth',
    // )
    .build();
