async function test() {
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbxLWaXdeRW8YvkDoSfTlp0EKasrqM_TGpjzDuI0FbSxkA7iC_SFy1HYvHKyO-VI6Dr5vA/exec';
  try {
    const formData = new URLSearchParams();
    formData.append('email', 'diagnostics_test@example.com');
    
    console.log('Sending test POST request to:', scriptUrl);
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    });
    
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    const text = await response.text();
    console.log('Response Body:', text);
  } catch (err) {
    console.error('Fetch Error:', err);
  }
}

test();
