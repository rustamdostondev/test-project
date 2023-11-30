import { OrganizationsUser } from 'src/organizations_user/entities/organizations_user.entity';
import { Project } from 'src/projects/entities/project.entity';
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
  name: 'organization',
})
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: '100',
    nullable: true,
  })
  name: string;

  @Column({
    nullable: true,
    default: false,
  })
  deleted_at: boolean;

  @Column({
    nullable: false,
  })
  created_by: number;

  // user bilan orgnainzation bo'glanish
  @ManyToOne((type) => User, (user) => user.organizations)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  // orgUser bilan Org bog'lanish
  @OneToMany((type) => OrganizationsUser, (orgUser) => orgUser.organization)
  orgUser: OrganizationsUser[];

  //org bilan project
  @OneToMany((type) => Project, (project) => project.organization)
  projects: Project[];
}
