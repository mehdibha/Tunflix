import React, { useEffect } from "react";
import videojs from "video.js";
import qualitySelector from "@silvermine/videojs-quality-selector";
import "@silvermine/videojs-quality-selector/dist/css/quality-selector.css";
import "video.js/dist/video-js.css"
import "./style.css";
import './spinner.scss'

export const VideoPlayer = (props) => {
    
    qualitySelector(videojs);
    const videoRef = React.useRef(null);
    const { options, handleClose, title } = props;
    const VideoHtml = (props) => (
        <div data-vjs-player>
            <video ref={videoRef} className="video-js vjs-big-play-centered vjs-theme-tunflix" />
        </div>
    );

    useEffect(() => {
        const videoElement = videoRef.current;
        let player;
        if (videoElement) {
            player = videojs(videoElement, options, () => {
                player.controlBar.addChild("QualitySelector");
                const backButton = player.addChild("Component");
                const arrowLeft = backButton.addChild("Component");
                const backButtonText = backButton.addChild("Component");
                const logo = player.controlBar.addChild("Component");
                const titleComponent = player.controlBar.addChild("Component");

                const titleDom = titleComponent.el();
                titleDom.innerHTML = title;

                logo.addClass("video-player-logo");
                titleComponent.addClass("video-player-title");
                arrowLeft.addClass("fas");
                arrowLeft.addClass("fa-arrow-left");
                arrowLeft.addClass("back-btn-icon");
                backButton.addClass("back-btn");
                backButtonText.addClass("back-btn-text");

                const backButtonTextDom = backButtonText.el();
                backButtonTextDom.innerHTML = "Retour à la navigation";

                const myButtonDom = backButton.el();
                myButtonDom.onclick = function () {
                    handleClose();
                };
            });
        }
        return () => {
            console.log(player)
            if (player) {
                player.dispose();
            }
        };
    }, [options, handleClose]);

    return <VideoHtml />;
};
export default VideoPlayer;
