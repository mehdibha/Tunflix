import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import VideoPlayer from "../../components/VideoPlayer";
import { useSpring, animated } from "@react-spring/web";
import { Dialog } from "@material-ui/core";

const Modal = ({ open, handleClose, videoLinks, tmdbId, title }) => {
    const classes = useStyles();
    const videoJsOptions = (urls) => {
        return {
            controlBar: {
                volumePanel: {
                    inline: false,
                },
            },
            aspectRatio: "30:9",
            autoplay: true,
            controls: true,
            sources: [
                { label: 'fr', src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", type: "video/mp4" },
                { label: 'en', src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", type: "video/mp4" },
            ],
            tracks: [
                {
                    kind: "captions",
                    src: `/api/movie/subs/test/ar`,
                    srclang: "ar",
                    label: "Arabic",
                },
                {
                    kind: "captions",
                    src: `/api/movie/subs/test/fr`,
                    srclang: "fr",
                    label: "Français",
                },
                {
                    kind: "captions",
                    src: `/api/movie/subs/test/en`,
                    srclang: "ar",
                    label: "English",
                },
            ],
        };
    };

    return (
        <Dialog
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            className={classes.modal}
            open={open === undefined ? false : open}
            onClose={() => handleClose()}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 1500,
            }}
            fullScreen
        >
            <Fade in={open}>
                <VideoPlayer options={videoJsOptions(videoLinks)} handleClose={() => handleClose()} title={title} />
            </Fade>
        </Dialog>
    );
};

const useStyles = makeStyles((theme) => ({
    modal: { maxHeight: "100vh" },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

export default Modal;
