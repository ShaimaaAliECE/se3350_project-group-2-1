import axios from "axios"

function PostData(data) {
    axios.post('http://34.122.82.157:80/postData', { ...data }).then((response) => {
        console.log(response.data)
    })
}

export default PostData