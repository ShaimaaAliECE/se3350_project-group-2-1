import axios from "axios"

function PostData(url, data) {
    axios.post(url, { ...data }).then((response) => {
        console.log(response.data)
    })
}

export default PostData