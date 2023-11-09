import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import './RedirectPage.css';


const RedirectPage = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const { gistId } = useParams();

    useEffect(() => {
        const fetchBaseUrl = async () => {
            try {
                const gistResponse = await axios.get(`https://api.github.com/gists/${gistId}`);
                const ngrokUrl = JSON.parse(gistResponse.data.files['backend_url.json'].content).url;
                window.location.href = ngrokUrl;
            } catch (error) {
                console.error('Error fetching ngrok URL from Gist:', error);
                setError('Failed to fetch the redirect URL. Please check the Gist ID and try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchBaseUrl();
    }, [gistId]);

    return (
        <div className="redirect-page">
            {loading ? (
                <ClipLoader size={150} color={"#123abc"} loading={loading} />
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : null}
        </div>
    );
};

export default RedirectPage;
