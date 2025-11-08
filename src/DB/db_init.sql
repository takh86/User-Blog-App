CREATE DATABASE IF NOT EXISTS blog_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE blog_app;

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS blogs;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS=1;

-- users
CREATE TABLE users(
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name  VARCHAR(50) NOT NULL,
  email      VARCHAR(120) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  DOB DATE DEFAULT NULL,
  gender ENUM('male','female') DEFAULT 'male',
  confirm_email BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL
) ENGINE=InnoDB;

-- blogs
CREATE TABLE blogs(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  user_id INT NOT NULL,
  CONSTRAINT fk_blogs_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX idx_blogs_user (user_id)
) ENGINE=InnoDB;

-- seed users 
INSERT INTO users (first_name,last_name,email,password,gender,DOB) VALUES
 ('Taha','Hussein','taha@example.com','123456','male','2000-01-01'),
 ('Sara','Khaled','sara@example.com','123456','female','1999-05-14'),
 ('Omar','Youssef','omar@example.com','123456','male','1998-09-22');

-- seed blogs 
INSERT INTO blogs (title,content,user_id) VALUES
 ('Getting started with Node.js','This post explains how to set up Node.js and npm...', 1),
 ('Express Routing 101','In this article we dive into Express routing patterns...', 1),
 ('MySQL with Node.js (mysql2)','How to connect MySQL from Node.js using mysql2...', 1),
 ('Clean Architecture for APIs','Thoughts about controllers/services separation...', 2),
 ('Debugging Tips','Useful tricks for console.log vs debug modules...', 3);
