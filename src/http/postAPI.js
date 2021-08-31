import {$authHost, $host} from "./index";

export const getAllPosts = async () => {
    let data
    await $host.get('api/posts')
        .then(res => {
            data = res
        })
        .catch(function (error) {
            if (error.response) {
                data = error.response
            }
        })
    return data
}

export const getPostsForUser = async (userId) => {
    let data
    await $host.get(`api/posts/${userId}`)
        .then(res => {
            data = res
        })
        .catch(function (error) {
            if (error.response) {
                data = error.response
            }
        })
    return data
}

export const createPostNoPhoto = async (userId, form) => {
    let data
    await $authHost.post(`api/posts/no-photo/${userId}`, form
    )
        .then(res => {
            data = res
        })
        .catch(function (error) {
            if (error.response) {
                data = error.response
            }
        })
    console.log(data)
    return data
}

export const createPost = async (userId, form) => {
    const data = await $authHost.post(`api/posts/${userId}`, form
    )
    console.log(data)
    return data
}