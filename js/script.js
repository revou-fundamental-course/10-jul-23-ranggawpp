// Function to hide the result container and show the main container
function showMainContainer() {
  document.getElementById('main-container').classList.remove('d-none');
  document.getElementById('result-container').classList.add('d-none');
}

// Function to show the result container and hide the main container
function showResultContainer() {
  document.getElementById('main-container').classList.add('d-none');
  document.getElementById('result-container').classList.remove('d-none');
}
// Function to calculate BMI
function hitungBMI() {
  // Get user inputs
  const gender = document.querySelector('input[name="gender"]:checked');
  const weight = parseFloat(document.getElementById('berat-badan').value);
  const age = parseInt(document.getElementById('usia').value);
  const height = parseFloat(document.getElementById('tinggi-badan').value);

  // Check if all inputs are filled
  if (!gender || isNaN(weight) || isNaN(age) || isNaN(height)) {
    if(!gender){
      alert("Harap isi Jenis Kelamin!");
    }
    if(isNaN(weight)){
      alert("Harap isi Berat Badan!")
    }
    if(isNaN(age)){
      alert("Harap isi Usia!")
    }
    if(isNaN(height)){
      alert("Harap isi Tinggi Badan!")
    }
    return;
  }

  // Check if the user's age is at least 18 years old
  if (age < 18) {
    alert("Kalkulator ini hanya boleh digunakan oleh orang dewasa (minimal usia 18 tahun).");
    return;
  }

  // Calculate BMI
  const heightInMeter = height / 100; // Convert height to meters
  const bmi = weight / (heightInMeter * heightInMeter);

  // Round the BMI value to two decimal places
  const roundedBMI = bmi.toFixed(2);

  // Show the result container
  showResultContainer();

  // Display the calculated BMI value
  document.getElementById('value-bmi').textContent = roundedBMI;

  // Display the BMI category image based on gender
  const genderStr = gender.value === 'Pria' ? 'male' : 'female';
  const imgBMI = document.getElementById('img-bmi-display-' + genderStr);
  imgBMI.style.display = 'block';

  // Show appropriate BMI range bubble
  const bubble = document.getElementById('bubble');
  const rangePosition = getRangePosition(bmi);
  bubble.style.left = rangePosition + '%';

  // Display the result text based on the BMI category
  const resultText = document.getElementById('result-text');
  const suggestionText = document.getElementById('suggestion-text');
  const adviceText = document.getElementById('advice-text');
  const riskTitle = document.getElementById('risk-title');
  const listRisk = document.getElementById('list-risk');

  if (bmi < 18.5) {
    resultText.textContent = 'Anda termasuk dalam kategori Kekurangan Berat Badan.';
    suggestionText.textContent = '1. Mungkin Anda perlu meningkatkan asupan nutrisi dan berkonsultasi dengan dokter.';
    adviceText.textContent = '2. Tetap perhatikan pola makan dan rajin berolahraga.';
    riskTitle.textContent = 'Resiko Kesehatan:';
    listRisk.innerHTML = '<li>Kekurangan energi dan nutrisi</li><li>Mudah lelah dan lesu</li><li>Resiko osteoporosis meningkat</li>';
  } else if (bmi >= 18.5 && bmi < 25) {
    resultText.textContent = 'Anda termasuk dalam kategori Normal atau Sehat.';
    suggestionText.textContent = '1. Pertahankan pola hidup sehat dan rajin berolahraga.';
    adviceText.textContent = '2. Jaga pola makan yang seimbang dan tetap aktif.';
    riskTitle.textContent = 'Resiko Kesehatan:';
    listRisk.innerHTML = '<li>Resiko penyakit berkurang</li><li>Pola hidup sehat membantu mencegah penyakit kronis</li>';
  } else if (bmi >= 25 && bmi < 30) {
    resultText.textContent = 'Anda termasuk dalam kategori Kelebihan Berat Badan.';
    suggestionText.textContent = '1. Coba kurangi asupan kalori dan tingkatkan aktivitas fisik.';
    adviceText.textContent = '2. Jaga pola makan sehat dan tetap bergerak aktif.';
    riskTitle.textContent = 'Resiko Kesehatan:';
    listRisk.innerHTML = '<li>Resiko penyakit kardiovaskular meningkat</li><li>Resiko diabetes meningkat</li>';
  } else {
    resultText.textContent = 'Anda termasuk dalam kategori Obesitas.';
    suggestionText.textContent = '1. Segera konsultasi dengan dokter untuk mendapatkan nasihat dan dukungan.';
    adviceText.textContent = '2. Perubahan gaya hidup dan pola makan sangat diperlukan.';
    riskTitle.textContent = 'Resiko Kesehatan:';
    listRisk.innerHTML = '<li>Resiko penyakit jantung dan pembuluh darah meningkat</li><li>Resiko diabetes tipe 2 meningkat</li><li>Resiko sleep apnea meningkat</li>';
  }
}

// Function to get the position of the range bubble based on the BMI value
function getRangePosition(bmi) {
  if (bmi < 18.5) {
    return 0;
  } else if (bmi >= 18.5 && bmi < 25) {
    return (bmi - 18.5) / 6.5 * 100;
  } else if (bmi >= 25 && bmi < 30) {
    return (bmi - 25) / 4.9 * 100 + 50;
  } else {
    return 100;
  }
}

// Function to go back to the main calculator form
function kembali() {
  document.getElementById('main-container').classList.remove('d-none');
  document.getElementById('result-container').classList.add('d-none');
}

// Function to validate input to allow only numbers
function onlyNumberValidation(event) {
  const key = event.keyCode;
  return (key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key === 8 || key === 9 || key === 46;
}

// Function to limit input field length
function maxLengthValidation(event) {
  const target = event.target;
  const maxLength = target.getAttribute('maxlength');
  if (target.value.length >= maxLength) {
    event.preventDefault();
  }
}

// Function to remove validation styling after change
function removeValidation(event) {
  const target = event.target;
  target.classList.remove('invalid-input');
}

// Add event listener to the "Hitung BMI" button
document.getElementById('hitung-bmi').addEventListener('click', hitungBMI);

// Add event listener to the "Kembali" button
document.getElementById('kembali').addEventListener('click', kembali);

// ... (rest of the existing functions)

function resetForm() {
  // Clear input fields
  document.getElementById("berat-badan").value = "";
  document.getElementById("usia").value = "";
  document.getElementById("tinggi-badan").value = "";

  // Clear result container elements
  document.getElementById("img-bmi-display-male").style.display = "none";
  document.getElementById("img-bmi-display-female").style.display = "none";
  document.getElementById("text-saran").innerHTML = "";
  document.getElementById("value-bmi").textContent = "";
  document.getElementById("bubble").style.removeProperty("right");
  document.getElementById("bubble").style.removeProperty("left");

  // Reset opacity of images
  const containerImage = document.getElementsByClassName("img-bmi-display-item");
  for (let i = 0; i < containerImage.length; i++) {
    containerImage[i].style.opacity = "30%";
  }

  // Show the main container and hide the result container
  showMainContainer();
}

// Call the function to show the main container and hide the result container initially
showMainContainer();
