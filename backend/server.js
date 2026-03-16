const express = require("express");
const cors = require("cors");

const buscarRemotive = require("./jobsRemotive");
const buscarRemoteOk = require("./jobsRemoteOk");
const buscarAdzuna = require("./jobsAdzuna");

const calcularScore = require("./ia");

const app = express();

app.use(cors());

app.get("/jobs", async (req, res) => {

  try {

    // BUSCAR VAGAS DAS APIs
    const remotive = await buscarRemotive();
    const remoteok = await buscarRemoteOk();
    const adzuna = await buscarAdzuna();

    // JUNTAR TODAS
    const jobs = [...remotive, ...remoteok, ...adzuna];

    // FILTRAR VAGAS JUNIOR
    const vagasJunior = jobs.filter(job => {

      const titulo = job.titulo.toLowerCase();

      return (
        titulo.includes("junior") ||
        titulo.includes("jr") ||
        titulo.includes("entry") ||
        titulo.includes("intern")
      );

    });

    // CALCULAR SCORE
    const analisadas = vagasJunior.map(job => ({
      ...job,
      score: calcularScore(job.descricao || "")
    }));

    // ORDENAR PELAS MELHORES
    analisadas.sort((a, b) => b.score - a.score);

    res.json(analisadas.slice(0, 30));

  } catch (error) {

    console.error("Erro ao buscar vagas:", error);
    res.status(500).json({ erro: "Erro ao buscar vagas" });

  }

});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});