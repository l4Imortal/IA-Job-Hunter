const axios = require("axios");

async function buscarRemoteOk() {

  try {

    const response = await axios.get("https://remoteok.com/api");

    const jobs = response.data
      .slice(1) // remove primeiro item (metadata)
      .map(job => ({
        titulo: job.position,
        empresa: job.company,
        link: job.url,
        descricao: job.description || ""
      }));

    return jobs;

  } catch (error) {
    console.log("Erro RemoteOK:", error.message);
    return [];
  }

}

module.exports = buscarRemoteOk;