const axios = require("axios");
require("dotenv").config();

const APP_ID = process.env.ADZUNA_APP_ID;
const APP_KEY = process.env.ADZUNA_APP_KEY;

async function buscarAdzuna() {

  try {

    const url = `https://api.adzuna.com/v1/api/jobs/br/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&what=software developer`;

    const response = await axios.get(url);

    const jobs = response.data.results.map(job => ({
      titulo: job.title,
      empresa: job.company.display_name,
      link: job.redirect_url,
      descricao: job.description
    }));

    return jobs;

  } catch (error) {

    console.log("Erro Adzuna:", error.message);
    return [];

  }

}

module.exports = buscarAdzuna;