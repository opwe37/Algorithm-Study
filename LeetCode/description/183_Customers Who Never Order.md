# 183. Customers Who Never Order

출처 : https://leetcode.com/problems/customers-who-never-order/


## 문제

Suppose that a website contains two tables, the `Customers` table and the `Orders` table. Write a SQL query to find all customers who never order anything.
(웹 사이트에  `Customers`와 `Orders` 두 테이블이 있다고 가정해보자. 어떤 주문도 하지 않은 모든 소비자를 찾는 SQL 쿼리를 작성하라)

### SQL Schema
```
Create  table  If  Not  Exists  Customers (Id  int,  Name  varchar(255))
Create  table  If  Not  Exists  Orders (Id  int, CustomerId  int)
Truncate  table  Customers
insert  into  Customers (Id,  Name)  values  ('1',  'Joe')
insert  into  Customers (Id,  Name)  values  ('2',  'Henry')
insert  into  Customers (Id,  Name)  values  ('3',  'Sam')
insert  into  Customers (Id,  Name)  values  ('4',  'Max')
Truncate  table  Orders
insert  into  Orders (Id, CustomerId)  values  ('1',  '3')
insert  into  Orders (Id, CustomerId)  values  ('2',  '1')
```
## 예제

Table : `Customers` 
```
+----+-------+
| Id | Name  |
+----+-------+
| 1  | Joe   |
| 2  | Henry |
| 3  | Sam   |
| 4  | Max   |
+----+-------+
```
Table : `Orders`
```
+----+------------+
| Id | CustomerId |
+----+------------+
| 1  | 3          |
| 2  | 1          |
+----+------------+
```
Answer : 
```
+-----------+
| Customers |
+-----------+
| Henry     |
| Max       |
+-----------+
```

## Answer
1. Not In
```
SELECT Name AS Customers FROM Customers 
	WHERE Customers.Id 
	NOT IN (SELECT CustomerID FROM Orders) 
```
- Customers.Id 중, Not In 서브쿼리의 결과에 포함되지 않는 Id의 Name을 반환

2. Not Exists
```
SELECT Name AS Customers FROM Customers 
	WHERE NOT EXISTS (SELECT 1 FROM Orders WHERE CustomerID=Customers.Id)
```
- Not Exists 서브쿼리의 실행결과가 존재하지 않는 경우의 Name을 반환
