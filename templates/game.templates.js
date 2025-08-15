function getAboutTheGameTemplate() {
  return /*html*/ `
    <div class="game-instructions">
      <h2>🐔 Welcome to El Pollo Loco! 🌶️</h2>
      <div class="game-explaination-text">
        <span class="color-text"> You are Pepe </span>. Your path is full of normal chickens and tiny baby chicks
        but <span class="color-text">don’t be fooled </span> by their size. Every single one can <span class="color-text">attack </span> you, and
        they all move at different speeds.. Collect coins, dodge danger, and
        <span class="color-text">keep moving</span>.
      </div>
      <div class="game-explaination-text">
        There are <span class="color-text">only 5 </span> bottles in the whole game. The Giant Chicken Boss
        at the end has exactly 5 lives. Use your bottles on anything else… and
        you'll face the boss with <span class="color-text">nothing </span>.
      </div>
      <div class="rules-of-survival">
        <h4>Rules of Survival</h4>
        <ul>
          <li>Run, jump, and grab coins.</li>
          <li>Avoid chickens when you can.</li>
          <li>Save all your salsa bottles for the final fight.</li>
        </ul>
      </div>
      <h3>One chance. Five bottles. One giant chicken.</h3>
      <h3>Good luck, hero. 🐔🔥</h3>
    </div>
        
    `;
}

function getMenu() {
  return /*html*/ ` 
    <div class="buttons-menu">
      <button>
        <a href="./legal.notice.html">legal notice</a>
      </button>
      <button onclick="openAboutTheGame()" id="about_the_game">
        About the Game
      </button>
    </div>
  `;
}
