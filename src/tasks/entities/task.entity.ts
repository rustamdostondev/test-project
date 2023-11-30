import { Organization } from 'src/organizations/entities/organization.entity';
import { OrganizationsUser } from 'src/organizations_user/entities/organizations_user.entity';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'task',
})
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'due_date',
    nullable: true,
  })
  due_date: Date;

  @Column({
    name: 'status',
    default: 'CREATED',
  })
  status: string;

  @Column({
    name: 'done_at',
    default: false,
  })
  done_at: boolean;

  @Column({
    nullable: false,
  })
  created_by: number;

  @Column({
    nullable: false,
  })
  project_id: number;

  @Column({
    nullable: false,
  })
  worker_user_id: number;

  @Column({
    nullable: true,
    default: false,
  })
  deleted_at: boolean;

  // user blan task
  @ManyToOne((type) => User, (user) => user.tasks)
  @JoinColumn({ name: 'created_by' })
  user: User;

  // task bila project
  @ManyToOne((type) => Project, (project) => project.tasks)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  // task bilan orgUser
  @ManyToOne((type) => OrganizationsUser, (user) => user.tasks)
  @JoinColumn({ name: 'worker_user_id' })
  workerUser: OrganizationsUser;
}
