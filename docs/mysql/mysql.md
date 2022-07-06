# MySQL

## 基础学习

* [菜鸟教程](https://www.runoob.com/mysql/mysql-tutorial.html)  
* [W3school](https://www.w3school.com.cn/sql/index.asp)

## 数据库管理和设计工具

[Navicat premium](https://www.cnblogs.com/sq1995liu/p/12671331.html)

## 笔记

### create
```mysql
create table student
(
	sno char(20),
	sname char(20),
	sage int,
	ssex char(10),
	sdept char(10)
)
```

### insert
```mysql
insert into student(sno,sname,sage,ssex)
values('10004','wang12',24,'男')
```

### update
```mysql
update student
set sname='yang',ssex='女'
where sno='10004'
```

### alert
```
alter table student1
add grade int
```

### delete
```mysql
delete from student
where sno='10004'
```

### select
```mysql
select sname,'year of birth:',2021-sage,lower(sdept) from student
select * from student where sdept is null and sage in (24)
select * from student where ssex='女' or sage<=24 order by sage desc,sno desc

#别名
select sname NAME,'year of birth:' BIRTH,2021-sage BIRTHDAY,lower(sdept) DEPATMENT from student

#去重
select distinct sno from sc

#转义
select sno,sname,ssex from student where sname like 'wang\%' escape '\'

#group
select sno,avg(grade) from sc group by sno having avg(grade)>=90

#自身连接
select first.cno,second.cpno from course first,course second where first.cpno=second.cno

#嵌套查询
select sno,sname,sdept from student where sdept in 
(
	select sdept
	from student
	where sname='wang1'
)
select sno,sname
from student
where sno in
	(select sno
	from sc
	where cno in
		(select cno
		from course
		where cname='数据库')
	)

#exists
select sname
from student
where exists
(select *
from sc
where sno=student.sno and cno='1')

#union(并)
select * from student
where sdept='bi'
union
select * from student
where sage>=25

#intersect(交)
select * from student
where sdept='bi'
intersect
select * from student
where sage>=25

#except(差)
select * from student
where sdept='bi'
except
select * from student
where sage<=19
```

### view
```mysql
create view bi_student
as
select sno,sname,sage from student
where sdept='bi'
```

### index
```mysql
create unique index student_sno
on student(sno)
```

### check
```mysql
create table student
(
	sno char(20),
	sname char(20),
	sage int check(sage<29),
	ssex char(10) check(ssex in ('男','女')),
	sdept char(10)
)
```

### left join
```mysql
select 表1查询的字段，表2查询的字段 from 表1 left join 表2 on 条件
```

## 数据库中导入文本文件
```MySQL
#创建数据表
create table snp
(
    CHROM varchar(55),
    POS int,
    ID varchar(255),
    REF varchar(255),
    ALT varchar(255),
    INFO longtext,
    genotype longtext,
    REF_frq double,
    ALT_frq double
);
ALTER TABLE `snp` ADD PRIMARY KEY(`ID`);
ALTER TABLE `snp` ADD INDEX zu(`CHROM`,`POS`);
#导入文件(启动mysql时添加--local-infile参数)
LOAD DATA LOCAL INFILE 'snp.txt' INTO TABLE snp FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n';
```

## 复制表
```mysql
CREATE TABLE targetTable LIKE sourceTable;
INSERT INTO targetTable SELECT * FROM sourceTable;
```

## 修复InnoDB引擎的MySQL表

1. 直接复制frm和ibd文件会导致数据表不可用。
2. 首先使用**dbsake**从frm文件中获取表结构
   ```bash
   dbsake frmdump test.frm >test.sql
   ```
3. 通过获取的sql文件，重新建立表格
4. 移除表空间
   ```mysql
   alter table test discard tablespace;
   ```
5. 将ibd文件复制到MySQL数据目录中，即当前建立的表格的底层保存目录
6. 导入表空间
   ```mysql
   alter table test import tablespace;
   ```