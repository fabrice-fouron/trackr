// This file will be used for utils purposes

// hunter.io - find information about people from given companies

export default class EmailHunter {
    constructor(apiURL, api_key) {
        this.apiURL = apiURL;
        this.api_key = api_key;
    }

    getKey() {
        return this.api_key;
    }

    getURL() {
        return this.apiURL;
    }
}

/**
 * Fetches the email of a given individual at a given company
 * @param {string} firstName First Name of the individual
 * @param {string} lastName Last Name of the individual
 * @param {string} companyName Company where the individual works at
 * @param {EmailHunter} emailHunter EmailHunter object
 */
export async function getEmail(firstName, lastName, companyName, emailHunter) {
    const params = new URLSearchParams({
        company: companyName,
        first_name: firstName,
        last_name: lastName,
        api_key: emailHunter.getKey()
    }).toString();

    console.log(params);
    
    const response = await fetch(emailHunter.apiURL + params);
    const data = response.json();
    return data;
}
///////////////////////////////////////////////////////////////////////////
