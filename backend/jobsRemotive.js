const axios = require("axios");

async function buscarRemotive() {

  try {

    const response = await axios.get("https://remotive.com/api/remote-jobs");

    const jobs = response.data.jobs.map(job => ({
      titulo: job.title,
      empresa: job.company_name,
      link: job.url,
      descricao: job.description
    }));

    return jobs;

  } catch (error) {
    console.log("Erro Remotive:", error.message);
    return [];
  }

}

module.exports = buscarRemotive;