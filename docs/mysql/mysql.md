# MySQL

## 基础学习

* [菜鸟教程](https://www.runoob.com/mysql/mysql-tutorial.html)  
* [W3school](https://www.w3school.com.cn/sql/index.asp)

## 数据库管理和设计工具

[Navicat premium](https://www.cnblogs.com/sq1995liu/p/12671331.html)

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
#导入文件
LOAD DATA LOCAL INFILE 'snp.txt' INTO TABLE snp FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n';
```