import { User } from "src/users/entities/user.entity";
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Organization } from "src/organizations/entities/organization.entity";
import { Project } from "src/projects/entities/project.entity";
import { OrganizationsUser } from "src/organizations_user/entities/organizations_user.entity";
import { Task } from "src/tasks/entities/task.entity";

export default (): TypeOrmModuleOptions => {
    return {
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: +process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USERNAME,
        password: () => {
            return process.env.POSTGRES_PASSWORD;
        },
        database: process.env.POSTGRES_DATABASE,
        entities: [
            User,
            Organization,
            Project,
            OrganizationsUser,
            Task
        ],
        synchronize: true,
        autoLoadEntities: true,
    };

}