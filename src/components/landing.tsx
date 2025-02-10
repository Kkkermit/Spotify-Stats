import React from 'react';

const Landing: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-green-500 text-white text-center">
            <h1 className="text-6xl mb-4">Welcome to Spotify Stats</h1>
            <p className="text-2xl">Discover your most listened to songs, artists, and more!</p>
        </div>
    );
};

export default Landing;
