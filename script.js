document.addEventListener('DOMContentLoaded', function () {
  const calculateBtn = document.getElementById('calculateBtn');
  calculateBtn.addEventListener('click', calculateWinrate);

  function calculateWinrate() {
    const currentMatchesInput = document.getElementById('currentMatches');
    const currentWinrateInput = document.getElementById('currentWinrate');
    const desiredWinrateInput = document.getElementById('desiredWinrate');
    const resultElement = document.getElementById('result');

    // Clear previous results and errors
    resultElement.innerHTML = '';
    resultElement.classList.remove('error', 'matches-needed'); // Remove error and matches-needed classes

    const currentMatches = parseInt(currentMatchesInput.value);
    const currentWinrate = parseFloat(currentWinrateInput.value);
    const desiredWinrate = parseFloat(desiredWinrateInput.value);

    if (isNaN(currentMatches) || isNaN(currentWinrate) || isNaN(desiredWinrate)) {
      displayResult('Please enter valid numbers for all fields.', 'error'); // Pass 'error' class
      return;
    }

    const matchesNeeded = calculateMatchesNeeded(currentMatches, currentWinrate, desiredWinrate);

    if (matchesNeeded < 0) {
      displayResult('Desired winrate is already achieved with current statistics.', 'error'); // Pass 'error' class
      return;
    }

    displayResult(`To achieve ${desiredWinrate}% winrate, you need to win ${matchesNeeded} more matches.`, 'matches-needed'); // Pass 'matches-needed' class
  }

  function calculateMatchesNeeded(currentMatches, currentWinrate, desiredWinrate) {
    let matchesNeeded = 0;
    let currentWins = Math.ceil((currentWinrate / 100) * currentMatches);

    while (currentWins / (currentMatches + matchesNeeded) < desiredWinrate / 100) {
      matchesNeeded++;
      currentWins++;
    }

    return matchesNeeded;
  }

  function displayResult(message, resultClass) {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = message;
    resultElement.classList.add(resultClass); // Add the specified class
  }
});
