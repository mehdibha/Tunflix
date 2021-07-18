import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBrowseMovies } from "../../actions/browseActions";
import MainContainer from "../../containers/MainContainer";
import Banner from "../../components/Banner/Banner";
import Loader from "../../components/Loader";
import Row from "../../components/Row";
import { Helmet } from "react-helmet";

const Browse = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.browseReducer.isLoadingMovies);
    const banner = useSelector((state) => state.browseReducer.bannerMovies);
    const rows = useSelector((state) => state.browseReducer.rowsMovies);
    const error = useSelector((state) => state.browseReducer.errorMovies);
    useEffect(() => {
        if (!banner && !rows && !error) {
            dispatch(getBrowseMovies());
        }
    }, [dispatch,banner,rows,error]);
    return !isLoading && banner && rows ? (
        <>
            <Helmet>
                <title>X-Netflix - Films</title>
            </Helmet>
            <MainContainer>
                <Banner data={banner} mediaType="movie" />
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
