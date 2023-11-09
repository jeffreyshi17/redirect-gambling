import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ButtonList.css';

const ButtonList = () => {
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    const fetchButtonUrls = async () => {
      try {
        const configResponse = await axios.get('config.json');
        const initialButtonsData = configResponse.data.map(button => ({
          ...button,
          url: '',
          isLoading: true, // Indicates that the URL is being fetched
        }));
        setButtons(initialButtonsData);

        // Fetch URLs for each button
        const buttonsData = await Promise.all(
          initialButtonsData.map(async (button) => {
            try {
              const gistResponse = await axios.get(`https://api.github.com/gists/${button.gist_id}`);
              const url = JSON.parse(gistResponse.data.files['backend_url.json'].content).url;
              return { ...button, url, isLoading: false };
            } catch (error) {
              console.error('Error fetching URL for Gist:', button.gist_id, error);
              return { ...button, url: '', isLoading: false };
            }
          })
        );
        setButtons(buttonsData);
      } catch (error) {
        console.error('Error fetching Gist configurations:', error);
        // If the config.json file itself cannot be loaded, consider how you want to handle this case.
        // For example, you could set all buttons to a failed state here.
      }
    };

    fetchButtonUrls();
  }, []);

  return (
    <div className="button-list">
      {buttons.map((button) => (
        <a
          key={button.gist_id}
          href={button.url}
          className={`button-link ${!button.url ? 'disabled' : ''}`}
          onClick={(e) => !button.url && e.preventDefault()} // Prevent navigation for disabled buttons
        >
          {button.name}
        </a>
      ))}
    </div>
  );
};

export default ButtonList;
