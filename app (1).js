document.getElementById('ui-generate-btn').addEventListener('click', function() {
  const promptText = document.getElementById('ui-prompt').value;
  const style = document.getElementById('ui-style').value;
  const resolution = document.getElementById('ui-resolution').value;

  // 1. Compile template logic dynamically
  let finalPrompt = '';
  if (style === 'flux2020') {
    finalPrompt = `a candid phone photo ${promptText} This is a mid 2020's era amateur photograph with clear detail in high resolution. IMG_8026.JPEG`;
  } else {
    finalPrompt = `a candid phone photo ${promptText} IMG_8026.JPEG`;
  }

  // 2. Prepare payload
  const payload = {
    prompt: finalPrompt,
    resolution: resolution,
    guidanceScale: 7,
    seed: -1
  };

  document.getElementById('status-log').innerText =
    "Connecting to Perchance API Endpoint...\n\nSent Payload:\n" + JSON.stringify(payload, null, 2);

  // 3. Connect to the Perchance rendering backend 
  const apiEndpoint = `https://image-generation.perchance.org/api/generate?prompt=${encodeURIComponent(payload.prompt)}&resolution=${payload.resolution}&guidanceScale=${payload.guidanceScale}&seed=${Math.floor(Math.random() * 1000000)}`;

  const img = document.getElementById('output-img');
  img.src = apiEndpoint;
  img.style.display = 'block';
  
  img.onload = function() {
    document.getElementById('status-log').innerText =
      "Success! Image loaded from backend API.\n\nFinal API GET URL:\n" + apiEndpoint;
  };
});
