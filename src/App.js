import { Fragment, useEffect, useRef, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import NewImage from './components/NewImage';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-top: 100px;
`;

function App() {
  const [file, setfile] = useState(null);
  const [loading, setloading] = useState(false);
  const [image, setImage] = useState(null);
  const [color, setColor] = useState("#ffffff");
  const [showresult, setshowresult] = useState(false)

  useEffect(() => {
    const getImage = () => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImage({
          url: img.src,
          width: img.width,
          height: img.height,
        });
      };
    };
    file && getImage();
  }, [file]);

  const detect = () => {
    setloading(true);

    const intervel = setTimeout(() => {
      setloading(false);
      setshowresult(true);
      clearTimeout(intervel);
    }, 2000);

  }

  return (
    <Fragment>
      <Navbar />
      <div className="app">
        <div className="newpost">
          {
            loading ? (
              <ClipLoader color={color} loading={loading} css={override} size={150} />
            ) : (
              <div className="addPost">
                {
                  image && !showresult ? (
                    <img crossOrigin="anonymous" ref={null} src={image?.url} alt="" srcSet="" />
                  ) : ""
                }

                {
                  image && showresult ? (
                    <NewImage image={image} />
                  ) : ""
                }
              </div>
            )
          }

          <div className="postForm">
            <div className="upload-btn-wrapper">
              <button className="btn">Upload a file</button>
              <input type="file" onChange={(e) => setfile(e.target.files[0])} name="myfile" />
            </div>
            <button onClick={detect}>Detect</button>
          </div>
        </div>

      </div>
    </Fragment>
  );
}

export default App;
