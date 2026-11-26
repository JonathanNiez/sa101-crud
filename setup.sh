#!/bin/bash
sudo apt update
sudo apt install -y mysql-server
sudo sed -i 's/^bind-address.*/bind-address = 0.0.0.0/' /etc/mysql/mysql.conf.d/mysqld.cnf
sudo systemctl restart mysql
sudo mysql <<'SQL'
CREATE DATABASE IF NOT EXISTS school;
CREATE USER IF NOT EXISTS 'student'@'%' IDENTIFIED BY 'pass123';
GRANT ALL PRIVILEGES ON school.* TO 'student'@'%';
FLUSH PRIVILEGES;
USE school;
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  course VARCHAR(100)
);
SQL
echo "VM IP address:"
hostname -I