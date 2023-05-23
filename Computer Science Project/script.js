function removeSpaces(cardNumber) {
    let result = '';
    for (let i = 0; i < cardNumber.length; i++) {
      if (cardNumber[i] !== ' ') {
        result += cardNumber[i];
      }
    }
    return result;
  }
  
  function validateCard() {
    const fullNameInput = document.getElementById('fullNameInput');
    const addressInput = document.getElementById('addressInput');
    const phoneNumberInput = document.getElementById('phoneNumberInput');
    const emailInput = document.getElementById('emailInput');
    const cvcInput = document.getElementById('cvcInput');
    const expiryDateInput = document.getElementById('expiryDateInput');
    const cardNumberInput = document.getElementById('cardNumberInput');
    const result = document.getElementById('result');
  
    const fullName = fullNameInput.value;
    const address = addressInput.value;
    const phoneNumber = phoneNumberInput.value;
    const email = emailInput.value;
    const cvc = cvcInput.value;
    const expiryDate = expiryDateInput.value;
    const cardNumber = removeSpaces(cardNumberInput.value);
  
    // Check if any input field is left blank
    if (!fullName || !address || !phoneNumber || !email || !cvc || !expiryDate || !cardNumber) {
      result.textContent = 'Please fill in all fields.';
      result.style.color = 'red';
      return;
    }
  
    if (validateCreditCardNumber(cardNumber)) {
      const cardType = getCardType(cardNumber);
      result.textContent = `Card type: ${cardType}`;
      result.style.color = 'green';
      result.insertAdjacentHTML('afterend', '<p>Card is valid</p>');
    } else {
      result.textContent = 'Invalid credit card number';
      result.style.color = 'red';
      result.insertAdjacentHTML('afterend', '<p>Card is not valid</p>');
    }
  }
  
  function validateCreditCardNumber(cardNumber) {
    let trimmedCardNumber = '';
    for (let i = 0; i < cardNumber.length; i++) {
      if (cardNumber[i] !== ' ') {
        trimmedCardNumber += cardNumber[i];
      }
    }
  
    if (
      (trimmedCardNumber.length !== 16 && trimmedCardNumber.length !== 15) ||
      isNaN(trimmedCardNumber)
    ) {
      return false; // Invalid length or non-numeric characters
    }
  
    let sum = 0;
    let doubleDigits = false;
  
    for (let i = trimmedCardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(trimmedCardNumber.charAt(i));
  
      if (doubleDigits) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
  
      sum += digit;
      doubleDigits = !doubleDigits;
    }
  
    return sum % 10 === 0; // Return true if the sum is divisible by 10
  }
  
  
  
  
  function getCardType(cardNumber) {
    if (cardNumber.startsWith('4')) {
      return 'Visa';
    } else if (cardNumber.startsWith('34') || cardNumber.startsWith('37')) {
      if (cardNumber.length === 15) {
        return 'American Express';
      }
    } else if (cardNumber.startsWith('5')) {
      return 'Mastercard';
    } else if (cardNumber.startsWith('6')) {
      if (
        cardNumber.startsWith('6011') ||
        cardNumber.startsWith('65') ||
        parseInt(cardNumber.slice(0, 4)) >= 6221 ||
        parseInt(cardNumber.slice(0, 4)) <= 6229
      ) {
        return 'Discover';
      }
    }
  
    return 'Unknown'; // Unable to identify the card type
  }
  
  