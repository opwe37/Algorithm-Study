# 182. Duplicate Emails

출처 : https://leetcode.com/problems/duplicate-emails/

## 문제


Write a SQL query to find all duplicate emails in a table named  `Person`.

`Person`테이블에서 중복된 이메일을 모두 찾는 SQL쿼리를 작성하라.

### SQL Schema
```
Create  table  If  Not  Exists  Person (Id  int, Email  varchar(255))
Truncate  table  Person
insert  into  Person (Id, Email)  values  ('1',  'a@b.com')
insert  into  Person (Id, Email)  values  ('2',  'c@d.com')
insert  into  Person (Id, Email)  values  ('3',  'a@b.com')
```

## 예제
```
+----+---------+
| Id | Email   |
+----+---------+
| 1  | a@b.com |
| 2  | c@d.com |
| 3  | a@b.com |
+----+---------+
```
For example, your query should return the following for the above table:

예를들어, 쿼리문은 위와 같은 테이블에서 다음의 결과를 출력할 것이다: 
```
+---------+
| Email   |
+---------+
| a@b.com |
+---------+
```

## Answer
**Group By** 와 **Having** 을 이용한 해답
```
SELECT Email FROM Person 
GROUP BY Email 
HAVING COUNT(Email) > 1
```
- Group By 절 : 특정 컬럼의 데이터를 기준으로 그룹화 (본 문제에서 Email을 데이터를 기준으로 그룹화) 
- Having 절 : Group By절과 함께 쓰여야하며, 집계함수를 사용하여 조건을 주기위해 사용 (Where 절에서는 집계함수 사용 불가)
