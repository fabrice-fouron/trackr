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


// Generate email util using AI

/**
 * This function will generate the emails that the user will use however they want
 */
export async function generateEmail(client, assistantId, content) {
    try {
        
        const thread = await client.beta.threads.create();

        await client.beta.threads.messages.create(thread.id, {
            role: "user",
            content: JSON.stringify(content)
        });

        const run = await client.beta.threads.runs.create(thread.id, {
            assistant_id: assistantId
        });

        // Step 4: Poll the run until it completes
        await new Promise((resolve) => setTimeout(resolve, 15000)); // waiting for the message
        
        const messages = await client.beta.threads.messages.list(thread.id);
        const newList = messages.data.reverse();
        
        return newList[newList.length-1].content[0].text.value;
    }

    catch (error) {
        console.log("There was an error running the OpenAI Assistant ==> ", error);
    }
}

///////////////////////////////////////////////////////////////////////////
