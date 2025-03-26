'use client'

export default function PostEdit() {
    const url = "http://localhost:8080/api/posts/new"
    const handleSubmit = (formData: FormData) => {
        console.debug(formData)
        fetch(url, {
            method: "POST",
            body: formData
        })
        return
    }
    return (
        <div>
            <h1>Create Post</h1>
            <form action={handleSubmit}>
                <input type="number" placeholder="User id" name="user_id" />
                <br />
                <input type="text" placeholder="Title" name="title" />
                <br />
                <textarea placeholder="Body" cols={33} rows={10} name="body" />
                <br />
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
}