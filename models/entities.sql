
CREATE DATABASE unicontest;

CREATE TABLE users (
    id serial not null primary key,
    name varchar(100),
    role varchar(50) not null,
    created_by number  not null references users(id)
);

CREATE TABLE projects (
    id serial not null primary key,
    org_id number not null references organizations( id),
    created_by number not null references users (id)
);

CREATE TABLE organizations  (
    id serial not null primary key,
    name varchar(100),
    created_by number not null references users (id)
);

CREATE TABLE organizations_user  (
    id serial not null primary key,
    org_id number not null references organizations( id),
    user_id number not null references users(id),
    created_by number not null references users (id)
);



CREATE TABLE tasks (
    id serial not null primary key,
    created_by date not null,
    project_id number not null references projects ( id ),
    due_date date not null,
    worker_user_id number not null references users (id),
    status varchar(50) check ( status in ('CREATED','IN_PROCESS','DONE')),
    done_at boolean default false
);

insert into "users" (name,role,created_by) values ('Dostonbek','CREATED',1);

%admin task1
select 
    o.id,
    o.name,
    count(p.*) as projects,
    count(t.*) as tasks
    from 
    organization o
    left join projects p
    on o.id = p.org_id

    left join task t
    on t.project_id = p.id
    group by o.id, p.org_id