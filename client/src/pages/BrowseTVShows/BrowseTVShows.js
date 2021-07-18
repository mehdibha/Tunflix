import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBrowseTVShows } from "../../actions/browseActions";
import Box from "@material-ui/core/Box";
import Banner from "../../components/Banner/Banner";
import Loader from "../../components/Loader";
import Row from "../../components/Row";
import { Helmet } from "react-helmet";
import MainContainer from "../../containers/MainContainer";

const Browse = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.browseReducer.isLoadingTVShows);
    const banner = useSelector((state) => state.browseReducer.bannerTVShows);
    const rows = useSelector((state) => state.browseReducer.rowsTVShows);
    const error = useSelector((state) => state.browseReducer.errorTVShows);
    useEffect(() => {
        if (!banner && !rows & !error) {
            dispatch(getBrowseTVShows());
        }
    }, [dispatch,banner,rows,error]);
    return !isLoading && banner && rows ? (
        <>
            <Helmet>
                <title>X-Netflix - Séries TV</title>
            </Helmet>
            <MainContainer>
                <Banner data={banner} mediaType="tv" />
                <div className="home-content">
                    {rows.map((elem, k) => (
                        <Row key={k} title={elem.title} data={elem.data} />
                    ))}
                </div>
            </MainContainer>
        </>
    ) : (
        <Loader />
    );
};

export default Browse;
