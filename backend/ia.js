const fs = require("fs");
const path = require("path");

// carregar currículo uma vez
const caminhoCurriculo = path.join(__dirname, "curriculo.txt");
const curriculo = fs.readFileSync(caminhoCurriculo, "utf8");

// transformar em lista de skills
const skills = curriculo
  .toLowerCase()
  .split(/\n|,|\./)
  .map(skill => skill.trim())
  .filter(skill => skill.length > 2);

function calcularScore(descricao) {

  const descricaoLower = descricao.toLowerCase();

  let score = 0;

  skills.forEach(skill => {
    if (descricaoLower.includes(skill)) {
      score += 5;
    }
  });

  if (score > 100) {
    score = 100;
  }

  return score;
}

module.exports = calcularScore;