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
        INSERT INTO user \
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
        INSERT INTO application \
        (`Id`,`CompanyName`,`JobPosition`,`Department`,`HiringManagerEmail`,`HiringManagerName`,`ApplicantId`,`JobDescription`,`Tags`, `Status`)\
        VALUES\
        (UUID(),?,?,?,?,?,?,?,?,?)",
        [appBody.companyName, appBody.jobPosition, appBody.department, appBody.hiringManagerEmail, appBody.hiringManagerName, appBody.applicantId, appBody.jobDescription, appBody.tags, appBody.status]
    );
}

export async function getResume(userId) {
    console.log("fetching Content");

    const [result] = await pool.query("\
        SELECT Content FROM resume WHERE UserId = ?", 
        [userId]
    );
    console.log(result);
    return result[0];
}

export async function createResume() {

    const [result] = await pool.query("\
        INSERT INTO resume\
        ()\
        VALUES\
        (?,?,?)",
        [] // table columns to put there
    );
}

export async function updateResume(resumeBody) {

    const [result] = await pool.query("\
        UPDATE resume\
        SET Content = ?\
        WHERE UserId = ?", 
        [resumeBody.content, resumeBody.userId]
    );
}


export async function getTagPreference(preferenceBody) {

    // JSON for preference body => {... tags: [tag1,tag2,tag3]}

    var tagsList = preferenceBody.tags;
    
    var tags = "";
    
    for (var i = 0; i < tagsList.length; i++) {
        tagsList[i] = `'%${tagsList[i]}%'`
    }

    if (tagsList.length === 1) {
        tags = tagsList[0];
    } else {
        tags = tagsList.join(" OR Tags LIKE ");
    }

    const query = "SELECT url FROM application WHERE Tags LIKE " + tags;

    const [result] = await pool.query(query);

    console.log("result: " + JSON.stringify(result));
}

// getResume("08900056-4fda-11f0-bb87-22000e09c1f8");
