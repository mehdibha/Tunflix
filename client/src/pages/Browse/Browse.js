import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBrowseHome } from "../../actions/browseActions";
import Box from "@material-ui/core/Box";
import Banner from "../../components/Banner/Banner";
import Loader from "../../components/Loader";
import MainContainer from "../../containers/MainContainer";
import Row from "../../components/Row";
import { Helmet } from "react-helmet";

const Browse = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.browseReducer.isLoadingHome);
    const banner = useSelector((state) => state.browseReducer.bannerHome);
    const rows = useSelector((state) => state.browseReducer.rowsHome);
    useEffect(() => {
        if (!banner && !rows) {
            dispatch(getBrowseHome());
        }
    }, [banner, dispatch, rows]);
    return !isLoading && banner && rows ? (
        <>
            <Helmet>
                <title>X-Netflix - Accueil</title>
            </Helmet>
            <MainContainer>
                    <Banner data={banner} mediaType="movie" />
                    <div>
                        {rows && rows.slice(0,4).map((elem, k) => (
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
