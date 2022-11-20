async function deleteFormHandler(event) {
    event.preventDefault();

    const location = window.location.toString().split('/');
    const id = location[location.length -1];
    
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);