import {$authHost, $host} from "./index";


export const register = async (form) => {
    let data
    await $host({
        url: 'api/auth/registration',
        method: 'POST',
        data: form,
        // headers: { "Content-Type": "multipart/form-data" },
    })
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

export const registerNoAvatar = async (form) => {
    let data
    await $host({
        url: 'api/auth/registration/no-avatar',
        method: 'POST',
        data: form,
    })
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

export const login = async (form) => {
    let data
    await $host({
        url: 'api/auth/login/',
        method: 'POST',
        data: form,
    })
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

export const check = async () => {
    const {data} = await $authHost.get('api/auth/check')
    return data
}

export const getAllUsers = async () => {
    const {data} = await $authHost.get('api/users/')
    return data
}

export const getUsersFriends = async (userId) => {
    let data
    await $authHost(`api/users/friends/${userId}`)
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

export const getFriendReqs = async (userId) => {
    let data
    await $authHost(`api/users/friend-reqs/${userId}`)
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

export const sendFriendRequest = async (userF, userS) => {
    let data
    await $authHost({
        url: `api/users/friend`,
        method: 'POST',
        data: {userF, userS}
    })
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

export const confirmFriendRequest = async (userF, userS) => {
    let data
    await $authHost({
        url: `api/users/friend/confirm`,
        method: 'POST',
        data: {userF, userS}
    })
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