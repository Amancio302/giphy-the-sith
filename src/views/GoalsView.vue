<template>
  <div id="goal-view" class="hoverable content">
    <p class="holder star-text text-center">
      <span> bem vindo patrulheiro! </span>
      <span>você foi escalado pela aliança rebelde para um serviço nada fácil.
      uma grande equipe será formada e seu objetivo é um único... matar lord sith... de rir!
      nosso infiltrado, jar-jar binks bolou um plano, e por suas habilidades memisticas do mais alto escalão você foi chamado.
      é muito simples. você irá escolher os melhores gifs de toda a galáxia e irá mandá-los para nossos ajudantes, eles cuidarão de todo o resto.
      não se preocupe, vou lhe dar uma pequena ajuda... não se acostume.</span>
      para navegar entre as telas vá até as bordas laterais. Todas são bem simples! A tela goal é que está agora, nela poderá se relembrar de sua missão e de sua importãncia para a aliança rebelde. À sua direita está a weapon, basicamente, por meio da mais alta tecnologia da galáxia, você poderá selecionar alguns gifs. caso sejam muito engraçados, clique no botão verde bem grande para adicioná-lo. não poderia ser mais fácil. à sua esquerda está o arsenal, que contém todos os gifs, digo... armas, que salvou até agora. quando achar que possui diversos boas armas clique no botão para enviar aos nossos homens, eles saberão o que fazer. se quiser editá-los, alterando seus títulos ou urls, basta clicar sobre ele e seguir as intruções.
      não podia ser mais fácil não é?
      o que está esperando patrulheiro? pegue suas coisas e vamos começar!
      que a força esteja com você patrulheiro!
    </p>
  </div>
</template>

<script>
export default {
  name: 'goal-view',
}
</script>

<style scoped>
  #goal-view {
    padding: 7px 0 7px 7px;
    border-radius: 10px;
    /* overflow-y: auto;
    max-height: 80vh; */
  }
  .holder {
    height: 100%;
    font-size: 1.5em;
    line-height: 2em;
  }
  p span {
    display: block;
  }

  @media only screen and (max-width: 700px) {
    .holder {
      font-size: .7em;
      height: 70%;
    }
  }
</style>