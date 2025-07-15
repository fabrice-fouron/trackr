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

export async function getUser(email, password) {

    const [result] = await pool.query(`SELECT * FROM user WHERE email = ? AND password = ?`, [email, password]);
    const rows = result[0];

    console.log("rows: ", rows);

    if (rows == undefined) {
        return "Make sure email and password are correct"
    }
    else {
        return "User was found"
    }
    return rows;
}

export async function createUser(userPayload) {

    try {
        const [result] = await pool.query("\
            INSERT INTO user \
            (`Id`,`FirstName`,`MiddleName`,`LastName`,`DateOfBirth`,`Email`,`Password`,`Role`)\
            VALUES\
            (UUID(),?,?,?,?,?,?,?)",
            [userPayload.firstName, userPayload.middleName, userPayload.lastName, userPayload.dateOfBirth, userPayload.email, userPayload.password, userPayload.role]
        );
        console.log(result);
        return 'Account was created successfully';
    }
    catch (err) {
        console.log(err)
        if (err.code === 'ER_DUP_ENTRY') {
            return 'This email address is already used by another user';
        } else {
            return 'There was an issue creating a new account';
        }
        // throw err;
    }
}

export async function getApplication(applicantId) {
    
    const [result] = await pool.query("\
        SELECT * FROM application WHERE ApplicantId = ? ORDER BY DateApplied DESC",
        [applicantId]
    );

    console.log(result);
    return result;
}

export async function createApplication(appBody) {
    console.log(appBody);
    const [result] = await pool.query("\
        INSERT INTO application \
        (`Id`,`CompanyName`,`JobPosition`,`Department`,`HiringManagerEmail`,`HiringManagerName`,`DateApplied`,`ApplicantId`,`JobDescription`,`Tags`, `Status`)\
        VALUES\
        (UUID(),?,?,?,?,?,?,?,?,?,?)",
        [appBody.companyName, appBody.jobPosition, appBody.department, appBody.companyContactEmail, appBody.companyContact, appBody.dateApplied, appBody.applicantId, appBody.jobDescription, appBody.tags, appBody.status]
    );
    // return result;
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

export async function createResume(resumeBody) {

    const [result] = await pool.query("\
        INSERT INTO resume\
        (Id, UserId, Content)\
        VALUES\
        (UUID(),?,?)",
        [resumeBody.userId, resumeBody.content] // table columns to put there
    );
    console.log(result);
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

// createApplication({
//     companyName: "MIT Lincoln Labs",
//     jobPosition: "Software Developer",
//     department: "IT",
//     hiringManagerEmail: "email",
//     hiringManagerName: "name",
//     dateApplied: "2025-07-07",
//     jobDescription: "DESCRIPTION",
//     applicantId: "08900056-4fda-11f0-bb87-22000e09c1f8",
//     tags: "tag1,tag2,tag3",
//     status: "applied"
// });

// getApplication("08900056-4fda-11f0-bb87-22000e09c1f8");