import {makeAutoObservable} from "mobx";


export default class PostsStore {

    constructor() {
        this._posts = []
        makeAutoObservable(this)
    }

    setPosts(value) {
        this._posts = value
    }

    get posts() {
        return this._posts
    }
}