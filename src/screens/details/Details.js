import React, { useState, useEffect } from 'react'
import Header from './../../common/header/Header'
import Typography from '@material-ui/core/Typography';
import YouTube from 'react-youtube';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Link } from 'react-router-dom';



import "./Details.css"
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        height: '100%'
    },
    title: {
        color: theme.palette.primary.white,

    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgb(0 0 0 / 84%) 70%, rgb(0 0 0 / 42%) 100%)',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 240,
        maxWidth: 240
    }

}));



function Details(props) {
    //Declaring states for the details page
    const classes = useStyles();
    const [moviedetails, setMovieDetails] = useState("");
    const [title, setMovieTitle] = useState("")
    const [duration, setMovieDuration] = useState("")
    const [critics_rating, setMovieRating] = useState("")
    const [story_line, setMoviePlot] = useState("")
    const [trailer_url, setYoutubeCode] = useState("");
    const [wiki_url, setWikiUrl] = useState("")
    const [release_date, setReleaseDate] = useState("")
    const [artists, setArtists] = useState([])
    const [genres, setGenresDisp] = useState([])
    
    //star icon state
    const [starIcons, setstarIcons] = useState([{

        id: 1,
        stateId: "star1",
        color: "black"
    },
    {
        id: 2,
        stateId: "star2",
        color: "black"
    },
    {
        id: 3,
        stateId: "star3",
        color: "black"
    },
    {
        id: 4,
        stateId: "star4",
        color: "black"
    },
    {
        id: 5,
        stateId: "star5",
        color: "black"
    }])


    useEffect(() => {

        //load details function to load details page

        async function loadDetails() {


            try {
                const rawResponse = await fetch(props.baseUrl + "/movies/" + props.match.params.id, {
                    method: 'GET',
                })

                if (rawResponse.ok) {
                    const result = await rawResponse.json()

                    setMovieDetails(result);
                    setMovieTitle(result.title)
                    setMovieDuration(result.duration)
                    setMovieRating(result.rating)
                    setReleaseDate(result.release_date)
                    setMoviePlot(result.storyline)
                    setWikiUrl(result.wiki_url)
                    setYoutubeCode(embedCode(result.trailer_url))
                    setArtists(result.artists)
                    setGenresDisp(result.genres)
                    //console.log("I am here" + moviedetails);

                } else {
                    const error = new Error();
                    error.message = 'Unable to Load Upcoming Movies';

                }
            } catch (e) {
                alert(`Error: ${e.message}`);
            }
        }
        loadDetails();
    }, [])

    const opts = {
        height: '300',
        width: '700',
        
    }


    const _onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    //extracting embed code from youtube url
    const embedCode = (url) => {
        //console.log("hello")
        return url.split("?v=")[1]

    }

    let starIconList = [];
    //stars icon click handler
    const starClickHandler = (id) => {

        for (let star of starIcons) {
            let starNode = star;
            if (star.id <= id) {
                starNode.color = "yellow"
            }
            else {
                starNode.color = "black";

            }
            starIconList.push(starNode);
        }

        return setstarIcons(starIconList)

    }

 // page for loading details pages
    return (
        <div> <Header showBookShowButton="true" id={props.match.params.id} baseUrl={props.baseUrl} />
            <div className="flex-container">
                <div className="leftdet">
                    <div className="backbutton"><Link to="/"><Typography>&#60; Back to Home</Typography></Link></div>
                    <div><img src={moviedetails.poster_url} alt={title} /></div>
                </div>
                <div className="middledet">
                    {/* Please note the headline variant is deprecated  for Typography now*/}

                    <div><Typography variant="h5" component="h2">{title}</Typography></div>

                    <div><Typography><span className="bold">Genre: </span>{genres.map(item => (
                        item + ", "
                    ))}  &nbsp;</Typography></div>
                    <div><Typography><span className="bold">Duration:</span> {duration}</Typography></div>
                    <div><Typography><span className="bold">Release Date: </span>
                        {new Date(release_date).toDateString()} </Typography></div>
                         {/* Converting date to Readable format*/}
                    <div><Typography><span className="bold">Rating:</span> {critics_rating}</Typography></div>
                    <div className="plottrailer"><Typography><span className="bold"> Plot: <a href={wiki_url} target="_blank"> (Wiki Link)</a></span> {story_line}</Typography></div>
                    <div className="plottrailer"><Typography><span className="bold">Trailer: </span></Typography>
                    </div>
                    <YouTube
                        videoId={trailer_url}
                        opts={opts}
                        ready={_onReady}
                        
                       
                    /> 
                </div>
                <div className="right">
                    <div><Typography><span className="bold">Rate this Movie</span></Typography></div>
                    <div>
                        {starIcons.map(star => (
                            <StarBorderIcon
                                className={star.color}
                                key={"star" + star.id}
                                onClick={() => starClickHandler(star.id)}
                            />
                        ))}

                    </div>
                    <div> {/*GridList Item is deprecated so ImageList Item used */}
                        <div className="artisthead"><Typography><span className="bold">Artists:</span></Typography></div>
                        <div className={classes.root}>
                            <ImageList className={classes.imageList} cols={2} cellheight="160">
                                {artists.map((item) => (
                                    <ImageListItem key={item.id}>
                                        <img src={item.profile_url} alt={item.first_name + " " + item.last_name} className="movie-poster" />
                                        <ImageListItemBar
                                            title={item.first_name + " " + item.last_name}
                                            classes={{
                                                root: classes.titleBar,
                                                title: classes.title,
                                            }}

                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details


