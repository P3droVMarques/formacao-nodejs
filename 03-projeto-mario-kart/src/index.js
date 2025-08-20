const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};

const player2 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};

async function rollDice() {// função de rolar dados
  return Math.floor(Math.random() * 6) + 1;
  //Math.floor => responsável por arredondar valores
  //Math.random => chama um número aleatório de 0 a 1
  //Como foi necessitamos de 6 números (1,6), foi necessário multiplicar a função por 6
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function playRaceEngine(character1, character2) { //motor principal
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    // sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    // rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

      await logRollResult(
        character1.NOME,
        "velocidade",
        diceResult1,
        character1.VELOCIDADE
      );

      await logRollResult(
        character2.NOME,
        "velocidade",
        diceResult2,
        character2.VELOCIDADE
      );
    }

    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(
        character1.NOME,
        "manobrabilidade",
        diceResult1,
        character1.MANOBRABILIDADE
      );

      await logRollResult(
        character2.NOME,
        "manobrabilidade",
        diceResult2,
        character2.MANOBRABILIDADE
      );
    }

    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;

      console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);

      await logRollResult(
        character1.NOME,
        "poder",
        diceResult1,
        character1.PODER
      );

      await logRollResult(
        character2.NOME,
        "poder",
        diceResult2,
        character2.PODER
      );

      if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
        //Optei por criar uma const bomba para não ter que criar outra const para o casco.
        //Logo, tratei o casco como uma excessão para o caso da bomba não ser sorteada.

        //Sortear se o Item é um bomba (bomb) ou casco (tratado como excessão da bomba). 
        const bomb = Math.random();
        //calcular pontos perdidos(lostPoints) em cada item
        const lostPoints = bomb ? 2 : 1
        //Condição do item usado(usedItem)
        const usedItem = bomb ? "usando bomba 💣" : "usando casco 🐢";

        console.log(
          `${character1.NOME} venceu o confronto usando ${usedItem} ! ${character2.NOME} perdeu ${lostPoints} ponto`
        );

        //O perdedor dessa condição (character2) perderá um ponto
        character2.PONTOS =- lostPoints;

        //Adicionado 1 ponto Turbo ao vencedor dessa condição (character1)
        character1.PONTOS++;
      }

      if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
        //Sortear se o Item é um bomba (bomb) ou casco (tratado como excessão da bomba). 
        const bomb = Math.random() < 0.5;
        //calcular pontos perdidos(lostPoints) em cada item
        const lostPoints = bomb ? 2 : 1;
        //Condição do item usado(usedItem)
        const usedItem = bomb ? "usando bomba 💣" : "usando casco 🐢";

        console.log(
          `${character2.NOME} venceu o confronto usando ${usedItem}! ${character1.NOME} perdeu ${lostPoints} ponto `
        );

        //O perdedor dessa condição (character1) perderá um ponto
        character1.PONTOS =- lostPoints;

        //Adicionado 1 ponto Turbo ao vencedor dessa condição (character2)
        character2.PONTOS++;
        
      }

      console.log(
        powerResult2 === powerResult1
          ? "Confronto empatado! Nenhum ponto foi perdido"
          : ""
      );
    }

    // verificando o vencedor
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.NOME} marcou um ponto!`);
      character1.PONTOS++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.NOME} marcou um ponto!`);
      character2.PONTOS++;
    }

    console.log("-----------------------------");
  }
}

async function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS)
    console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
  else if (character2.PONTOS > character1.PONTOS)
    console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
  else console.log("A corrida terminou em empate");
}

(async function main() {// função principal(função de entrada), responsável por chamar as outras funções
  console.log(
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
  );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
