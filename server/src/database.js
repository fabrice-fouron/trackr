import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.MYSQL_HOST);

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
}).promise()

export async function checkStatus() {
    // Check the status of the database
    return 'DATABASE OUT OF COMMISSION';
}

export async function getUser(email) {

    const [result] = await pool.query(`SELECT * FROM user WHERE email = ?`, [email]);
    const rows = result[0];

    return rows;
}

export async function createUser(firstName, middleName, lastName, dateOfBirth, email, role) {

    const [result] = await pool.query("\
        INSERT INTO `trackr`.`user`\
        (`Id`,`FirstName`,`MiddleName`,`LastName`,`DateOfBirth`,`Email`,`Role`)\
        VALUES\
        (UUID(),?,?,?,?,?,?)",
        [firstName, middleName, lastName, dateOfBirth, email, role]
    );
}

export async function getApplication(applicantId) {
    
    const [result] = await pool.query("\
        SELECT * FROM application WHERE ApplicantId = ?",
        [applicantId]
    );

    console.log(result);
}

export async function createApplication(appBody) {

    const [result] = await pool.query("\
        INSERT INTO `trackr`.`application`\
        (`Id`,`CompanyName`,`JobPosition`,`Department`,`HiringManagerEmail`,`HiringManagerName`,`ApplicantId`,`JobDescription`,`Tags`, `Status`)\
        VALUES\
        (UUID(),?,?,?,?,?,?,?,?,?)",
        [appBody.companyName, appBody.jobPosition, appBody.department, appBody.hiringManagerEmail, appBody.hiringManagerName, appBody.applicantId, appBody.jobDescription, appBody.tags, appBody.status]
    );
}

export async function getResume() {

    const [result] = await pool.query("\
        "
    );
}

export async function createResume() {

    const [result] = await pool.query("\
        "
    );
}

