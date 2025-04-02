import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users/users.controller';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://juniel999:dJ4kDMLIbvucSNb5@cluster0.e5bz1.mongodb.net/auth-db?retryWrites=true&w=majority&appName=Cluster0',
    ),
    TasksModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
