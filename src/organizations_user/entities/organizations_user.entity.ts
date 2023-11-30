import { ApiTags } from '@nestjs/swagger';
import { Organization } from 'src/organizations/entities/organization.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'organization_user',
})
export class OrganizationsUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  org_id: number;

  @Column({
    nullable: false,
  })
  created_by: number;

  @Column({
    nullable: true,
    default: false,
  })
  deleted_at: boolean;

  @Column({
    nullable: false,
  })
  user_id: number;

  // orgUser bilan org bog'landi
  @ManyToOne((type) => Organization, (organization) => organization.orgUser)
  @JoinColumn({ name: 'org_id' })
  organization: Organization;

  // orgUser bilan user
  @ManyToOne((type) => User, (user) => user.organizationsUsers)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // orUser bilan task
  @OneToMany((type) => Task, (task) => task.workerUser)
  tasks: Task[];
}
