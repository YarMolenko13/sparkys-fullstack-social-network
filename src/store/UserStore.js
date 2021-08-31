import {makeAutoObservable} from "mobx";
import {useHistory} from "react-router-dom";
import {FEED_URL} from "../utils/consts";


export class UserStore {

    constructor() {
        this._user = {}
        this._allUsers = []
        this._usersFriends = []
        this._friendReqs = []
        this._isAuth = false
        makeAutoObservable(this)
    }

    exit(user, callback) {
        localStorage.removeItem('token')
        user.setUser({})
        user.setIsAuth(false)
        callback()
    }

    get user() {
        return this._user;
    }
    get isAuth() {
        return this._isAuth;
    }
    get allUsers() {
        return this._allUsers;
    }
    get usersFriends() {
        return this._usersFriends;
    }
    get friendReqs() {
        return this._friendReqs;
    }

    setUser(value) {
        this._user = value;
    }
    setIsAuth(value) {
        this._isAuth = value;
    }
    setAllUsers(value) {
        this._allUsers = value
    }
    setUsersFriends(value) {
        this._usersFriends = value
    }
    setFriendReqs(value) {
        this._friendReqs = value
    }
}