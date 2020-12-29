CREATE DATABASE todoapp;

CREATE TABLE detail (
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(300) NOT NULL 
);