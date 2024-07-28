document.getElementById('myForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        });
        
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Erro ao enviar os dados:', error);
    }
});

