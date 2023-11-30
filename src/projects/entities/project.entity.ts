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
  name: 'projects',
})
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

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
  org_id: number;

  // project bilan task
  @OneToMany((type) => Task, (task) => task.project)
  tasks: Task[];

  // project bilan org ulandi
  @ManyToOne((type) => Organization, (organization) => organization.projects)
  @JoinColumn({ name: 'org_id' })
  organization: Organization;

  // project bilan user
  @ManyToOne((type) => User, (user) => user.projects)
  @JoinColumn({ name: 'created_by' })
  user: User;
}
