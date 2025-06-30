

async function registerUser(username) {
  console.log(`Registering user: ${username}`);

  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Registration successful", data);


    const credential = await navigator.credentials.create(data.publicKey);
    console.log("Credential created", credential);

    const responseCred = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ credential, username }),
    });
    if (!responseCred.ok) {
      throw new Error(`HTTP error! status: ${responseCred.status}`);
    }
    const dataCred = await responseCred.json();

    console.log("Credential sent", dataCred);
  } catch (error) {
    console.error("Registration failed", error);
  }
}

async function authenticateUser(username) {
  console.log(`Authenticating user: ${username}`);

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const credential = await navigator.credentials.get(data.publicKey);
    console.log("Authentication successful", credential);
  } catch (error) {
    console.error("Authentication failed", error);
  };
}


document.getElementById('registerButton')?.addEventListener('click', () => {
  const username = document.getElementById('username').value;
  registerUser(username);
});

document.getElementById('loginButton')?.addEventListener('click', () => {
  const username = document.getElementById('username').value;
  authenticateUser(username);
});

