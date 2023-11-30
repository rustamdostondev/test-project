import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from 'src/organizations/entities/organization.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Organization)
    private orgRepository: Repository<Organization>,
  ) {}

  OrgStatistics() {
    return this.orgRepository.query(`
    select 
    o.id,
    o.name,
    count(p.*)::int as projects,
    count(t.*)::int as tasks
    from 
    organization o
    left join projects p
    on o.id = p.org_id

    left join task t
    on t.project_id = p.id
    group by o.id
    `);
  }

  projectStatistics() {
    return this.orgRepository.query(`
    select 
    p.id as project_id,
    count(t.*) ::int as task_count,
    o.name as org_name
    from projects p
    left join task t
    on p.id = t.project_id

    left join organization o
    on p.org_id = o.id
    group by p.id, o.name
    order by p.id asc
    
    `);
  }

  async allStatistics() {
    const allStat = await this.orgRepository.query(`
    select 
    (
    select 
    count(o.id) as org
    from
    organization o) as org_count,
     (
    select 
    count(p.id) as org
    from
    projects p) as project_count,
     (
    select 
    count(t.id) as org
    from
    task t) as task_count
   
    `);

    return allStat[0];
  }
}
