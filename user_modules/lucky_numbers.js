function lucky_numbers(req, res) {
  function get_3_numbers() {
    const results_array = [19, 82, 40, 81, 83, 28, 26, 43, 65, 55, 82, 56, 53, 97, 22, 82, 98, 87, 10, 78, 37, 87, 45, 26, 16, 87, 98, 75, 94, 98];
    
    const array_length = results_array.length;
    
    const random_index = length => Math.floor(Math.random() * (length));
    
    for (let i = 1; i <= 3; i++) {
      globalThis["val" + i] = random_index(array_length);
    }
    
    if (val1 == val2) {
      while (true) {
        val2 = random_index(array_length);
    
        if (val1 != val2) {
          break;
        }
      }
    }
    
    if (val2 == val3) {
      while (true) {
        val3 = random_index(array_length);
    
        if (val2 != val3) {
          break;
        }
      }
    }
    
    if (val1 == val3) {
      while (true) {
        val1 = random_index(array_length);
    
        if (val1 != val3) {
          break;
        }
      }
    }
    
    return [ results_array[val1], results_array[val2], results_array[val3] ];
  }
  
  // Create a function to generate a random number
  function random() {
    return Math.floor(Math.random() * 100) + 1;
  }
  
  // Create an empty object
  const obj = {};
  
  // Loop 10000 times
  for (let i = 0; i < 10000; i++) {
    // Generate a random number
    const guess = random();
  
    // Check if the random number is already in the object
    if (guess in obj) {
      // Increment the count of the random number
      obj[guess]++;
    } else {
      // Add the random number to the object with a count of 1
      obj[guess] = 1;
    }
  }
  
  // Get the values of the object
  const predictions = Object.values(obj);
  
  // Sort the values of the object in descending order
  predictions.sort((a, b) => b - a);
  
  // Create an empty string
  let skNumbers = [];
  
  // Loop 10 times
  for (let i = 0; i < 7; i++) {
    // Get the current prediction
    const num = predictions[i];
  
    // Loop through the object
    for (const [key, value] of Object.entries(obj)) {
      // Check if the current prediction matches the value of the current object key
      if (num === value) {
        // Add the current object key to the string
        skNumbers.push(key);
  
        // Delete the current object key from the object
        delete obj[key];
  
        // Break out of the loop
        break;
      }
    }
  }
  
  // Print the string
  const final = skNumbers.concat(get_3_numbers());
  
  console.log(final);
  
  let results = "";
  
  final.forEach(val => {
    let value = "";
    
    if (val.length == 1) {
      if (val == 0) {
        value = "00";
      } else {
        value = "0" + val;
      }
    } else if (val.length == 3) {
      value = "00";
    } else value = val;
  
    results += value + ", ";
  });
  
  const url = 'https://platform.clickatell.com/messages/http/send?apiKey=PXTRN_iRQia1LPTtFDzq6g==&to=918534992433&content=' + results;
  
  fetch(url)
  .catch(err => console.log(err))
  .final(() => {
    res.send(results);
  });
}

module.exports = lucky_numbers;