function capitalizeAndSpace(name) {
    return name.replaceAll("-", " ")
    .toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')
}

function formatString(inputString) {
    // Split the string into words based on underscores
    const words = inputString.split('_');
  
    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => {
      // Ensure the word is not empty
      if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      return ''; // Handle empty words
    });
  
    // Join the words back together with spaces
    const formattedString = capitalizedWords.join(' ');
  
    return formattedString;
  }

export { capitalizeAndSpace, formatString }