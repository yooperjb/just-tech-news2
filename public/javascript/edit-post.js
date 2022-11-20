async function editFormHandler(event) {
    event.preventDefault();
    
    // get post id
    const location = window.location.toString().split('/');
    const id = location[location.length -1];

    // get post title
    const title = document.querySelector('input[name="post-title"]').value;

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);