const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function encodeBase32() {
  const input = document.getElementById("inputText").value;
  const bytes = new TextEncoder().encode(input);
  let bits = '';
  let output = '';

  for (let byte of bytes) {
    bits += byte.toString(2).padStart(8, '0');
  }

  for (let i = 0; i < bits.length; i += 5) {
    const chunk = bits.substring(i, i + 5).padEnd(5, '0');
    const index = parseInt(chunk, 2);
    output += base32Chars[index];
  }

  document.getElementById("outputText").value = output;
}

function decodeBase32() {
  const input = document.getElementById("inputText").value.toUpperCase().replace(/=+$/, '');
  let bits = '';
  let output = '';

  for (let char of input) {
    const index = base32Chars.indexOf(char);
    if (index === -1) {
      alert("Invalid Base32 character: " + char);
      return;
    }
    bits += index.toString(2).padStart(5, '0');
  }

  const bytes = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    const byte = bits.substring(i, i + 8);
    bytes.push(parseInt(byte, 2));
  }

  const decodedText = new TextDecoder().decode(new Uint8Array(bytes));
  document.getElementById("outputText").value = decodedText;
}



function toggleMode() {
  const body = document.body;
  const toggle = document.getElementById('modeToggle');

  if (toggle.checked) {
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
}

// Apply stored theme on page load
window.onload = () => {
  const theme = localStorage.getItem('theme') || 'light';
  const toggle = document.getElementById('modeToggle');
  
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    toggle.checked = true;
  }
};