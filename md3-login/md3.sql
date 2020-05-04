CREATE TABLE userinfo
(
    id INT PRIMARY KEY,
    username varchar(100),
    password varchar(100),
    portrait varchar(10),
    registered_at DATE,
    location varchar(100)
   
);

userinfo document
{
    id INT PRIMARY KEY, //unique key
    username varchar(100),  
    password varchar(100), 
    portrait varchar(10),
    registered_at DATE, //registered time
    location varchar(100)
}

 

userinfo table

| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| id           | String    | The id of the user   |
| username     | string    | The username of user |
| password     | string    | The user password    |
| portrait     | string    | The src of the portrait|
|registered_at |string     |data of the registered|
|location      | string    | place the uer sign in|