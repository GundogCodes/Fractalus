import sendRequest from "./send-request.cjs";

const BASE_URL = 'api/post'

export function makePost(){
    return
}
export function deletePost(){
    return
}
export function editPost(){
    return
}
export function likePost(){
    return
}
export function dislikePost(){
    return
}
export function commentOnPost(){
    return
}
export function getPost(postId){
    return sendRequest(`${BASE_URL}/${postId}`)
}
export function allPosts(){
    return sendRequest(`${BASE_URL}`)
}