document.addEventListener('DOMContentLoaded', async () => {
    let visitorCount = parseInt(localStorage.getItem('visitorCount')) || 0;
    document.getElementById('visitorCount').textContent = visitorCount;

    // Send request to increment visitor count on page load
    try {
        const response = await fetch('http://localhost:3000/visitor-count', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ count: ++visitorCount })
        });

        if (!response.ok) {
            throw new Error('Failed to send visitor count to server');
        }

        console.log('Visitor count sent to server');
    } catch (error) {
        console.error(error);
    }

    // Update the local visitor count
    localStorage.setItem('visitorCount', visitorCount);
    document.getElementById('visitorCount').textContent = visitorCount;

    document.getElementById('countVisitorBtn').addEventListener('click', async () => {
        visitorCount++;
        localStorage.setItem('visitorCount', visitorCount);

        try {
            const response = await fetch('http://localhost:3000/visitor-count', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ count: visitorCount })
            });

            if (!response.ok) {
                throw new Error('Failed to send visitor count to server');
            }

            console.log('Visitor count sent to server');
        } catch (error) {
            console.error(error);
        }

        document.getElementById('visitorCount').textContent = visitorCount;
        alert('You have been hacked FOOL!');
    });

    document.getElementById('resetBtn').addEventListener('click', async () => {
        visitorCount = 0;
        localStorage.setItem('visitorCount', visitorCount);

        try {
            const response = await fetch('http://localhost:3000/reset-visitor-count', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to reset visitor count on server');
            }

            console.log('Visitor count reset on server');
        } catch (error) {
            console.error(error);
        }

        document.getElementById('visitorCount').textContent = visitorCount;
    });
});
