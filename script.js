document.getElementById('form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = new FormData(e.target);

  const params = new URLSearchParams();
  for (const [key, value] of form.entries()) {
    params.append(key, value);
  }

  const response = await fetch('https://script.google.com/macros/s/AKfycbxFxTAUvTAtj369WnkSYWoDYzEqj1NyiEc3DxFspw-3O2ydWR4N4xwdfRRiIXKXBBvBEg/exec', {
    method: 'POST',
    body: params
  });

  const confirmation = document.getElementById("confirmation");
  if (response.ok) {
    confirmation.textContent = "✅ Inscription envoyée avec succès !";
    e.target.reset();
  } else {
    confirmation.textContent = "❌ Une erreur est survenue. Réessayez.";
  }
});
