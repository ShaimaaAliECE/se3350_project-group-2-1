import axios from "axios"

function PostData(data) {
    axios.post('http://35.208.35.172:80/postData', { ...data }).then((response) => {
        console.log(response.data)
    })
}

export default PostData