# SA101 CRUD

Next.js app (host PC) connected to MySQL (VM).

## Prerequisites
- Node.js 18+
- MySQL running on the VM, reachable from the host PC
- Database and table created (see below)

## Database setup (on the VM)
```sql
CREATE DATABASE school;
USE school;
CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  course VARCHAR(100)
);
```

## To run
```bash
git clone https://github.com/JonathanNiez/SA101-CRUD.git
cd SA101-CRUD
npm i
```

Create a `.env.local` file in the project root (same level as `package.json`):
```
DB_HOST=<VM-IP>
DB_PORT=3306
DB_USER=student
DB_PASS=pass123
DB_NAME=school
```

Then start the app:
```bash
npm run dev
```

Open http://localhost:3000

## Troubleshooting
- **500 error:** check the terminal for the MySQL message.
- **Connection refused / timeout:** check VM IP, firewall (`ufw allow 3306`), and `bind-address`.
- Restart `npm run dev` after editing `.env.local`.
