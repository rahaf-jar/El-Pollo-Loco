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
    </div>`;
}

function getLegalNoticeTemplate() {
  return /*html*/ `
  <div class="container">
    <div class="h1">Legal Notice</div>

    <span class="h2">Game Title</span>
    <div class="p">El Pollo Loco</div>

    <span class="h2">Publisher</span>
    <div class="p">
      Rahaf Jarrous<br />
      bahnhoferstraße 20<br />
      93053<br />
      Germany
    </div>

    <span class="h2">Contact</span>
    <div class="p">
      Email: <a href="mailto:jarrousrahaf@gmail.com">jarrousrahaf@gmail.com</a><br />
      Phone: <a href="tel:017683062949">017683062949</a>
    </div>

    <span class="h2">Disclaimer</span>
    <div class="p">
      The contents of this game were created with care. However, we cannot
      guarantee the accuracy, completeness, or timeliness of the content.
    </div>

    <span class="h2">Liability for Links</span>
    <div class="p">
      Our game may contain links to external websites we cannot control. We
      are not responsible for the content of these websites. The provider or
      operator is always responsible for their content.
    </div>

    <span class="h2">Privacy Policy</span>
    <div class="p">
      We respect your privacy and do not collect personal data without your
      consent. Any information you choose to provide (such as through contact
      forms or support requests) will be handled securely and never shared
      with third parties, except as required by law.
    </div>

    <span class="h2">Copyright</span>
    <div class="p">
      All graphics, sounds, and texts in this game are protected by copyright.
      Any reproduction, distribution, or public reproduction requires prior
      written consent from the copyright holder.
    </div>
  </div>`;
}

function getMenu() {
  return /*html*/ ` 
    <div class="buttons-menu">
      <button onclick="openLegalNotice()">Legal Notice</button>
      <button onclick="openAboutTheGame()" id="about_the_game">
        About the Game
      </button>
    </div>
  `;
}
