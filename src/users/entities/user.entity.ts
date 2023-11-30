import { Organization } from 'src/organizations/entities/organization.entity';
import { OrganizationsUser } from 'src/organizations_user/entities/organizations_user.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Task } from 'src/tasks/entities/task.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: '100',
    nullable: true,
  })
  name: string;

  @Column({
    length: '50',
    nullable: true,
  })
  role: string;

  @Column({
    nullable: false,
  })
  created_by: number;

  @Column({
    nullable: true,
    default: false,
  })
  deleted_at: boolean;

  // user bilan org
  @OneToMany((type) => Organization, (organization) => organization.createdBy)
  organizations: Organization[];

  //user bilan orgUser
  @OneToMany(
    (type) => OrganizationsUser,
    (organization_user) => organization_user.user,
  )
  organizationsUsers: OrganizationsUser[];

  // project bilan user
  @OneToMany((type) => Project, (project) => project.user)
  projects: Project[];

  // task bilan user
  @OneToMany((type) => Task, (task) => task.user)
  tasks: Task[];

  // user to user relation
  @OneToMany((type) => User, (userA) => userA.cretedBy)
  cretedUsers: User[];

  @ManyToOne((type) => User, (userB) => userB.cretedUsers)
  @JoinColumn({ name: 'created_by' })
  cretedBy: User;
}
