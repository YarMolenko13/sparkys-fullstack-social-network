import {CREATE_POST_URL, FEED_URL, FRIENDS_URL, HOME_URL, LOGIN_URL, REGISTER_URL} from "../utils/consts";
import RegistrationPage from "../pages/RegistrationPage";
import FeedPage from "../pages/FeedPage";
import LoginPage from "../pages/LoginPage";
import FriendsPage from "../pages/FriendsPage";
import CreatePostPage from "../pages/CreatePostPage";


export const publicRoutes = [
    {
        path: REGISTER_URL,
        Component: RegistrationPage
    },
    {
        path: LOGIN_URL,
        Component: LoginPage
    },
    {
        path: FEED_URL,
        Component: FeedPage
    },
    {
        path: HOME_URL,
        Component: FeedPage
    }
]

export const authRoutes = [
    {
        path: FRIENDS_URL,
        Component: FriendsPage
    },
    {
        path: CREATE_POST_URL,
        Component: CreatePostPage
    }
]