import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { OrganizationsUserModule } from './organizations_user/organizations_user.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsModule } from './statistics/statistics.module';
import TypeOrmConfig from './config/orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot(TypeOrmConfig()),
    UsersModule,
    OrganizationsModule,
    OrganizationsUserModule,
    ProjectsModule,
    TasksModule,
    StatisticsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
