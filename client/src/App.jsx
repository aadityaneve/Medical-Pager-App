import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelContainer, ChannelListContainer, Auth } from './components';

import './App.css';
require('dotenv').config();

const cookies = new Cookies();
const authToken = cookies.get('token');
const STREAM_CHAT_API_KEY = "8gkk79s5v48s"
const client = StreamChat.getInstance(STREAM_CHAT_API_KEY);

if (authToken) {
    client.connectUser(
        {
            id: cookies.get('userId'),
            name: cookies.get('username'),
            fullName: cookies.get('fullName'),
            image: cookies.get('avatarURL'),
            hashedPassword: cookies.get('hashedPassword'),
            phoneNumber: cookies.get('phoneNumber'),
        },
        authToken
    );
}

const App = () => {
    if (!authToken) return <Auth />;

    return (
        <div className='app__wrapper'>
            <Chat client={client} theme='team light'>
                <ChannelListContainer />
                <ChannelContainer />
            </Chat>
        </div>
    );
};

export default App;
