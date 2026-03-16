const axios = require("axios");

async function buscarVagas() {

  const response = await axios.get("https://remotive.com/api/remote-jobs");

  const jobs = response.data.jobs.map(job => ({
    titulo: job.title,
    empresa: job.company_name,
    link: job.url,
    descricao: job.description
  }));

  return jobs;
}

module.exports = buscarVagas;