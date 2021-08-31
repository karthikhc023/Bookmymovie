import React, { useState, useEffect } from 'react';
import './Home.css';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

//Very important - GridList, GridListItem and GridListTIle Bar are all deprecated
//As suggested by Material UI - ImageList, ImageListItem and ImageListItemBar is used

//styles for the home page - applied in ImageList and Cards 
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%',
        color: theme.palette.primary.white
    },
    title: {
        color: theme.palette.primary.light,
    },
    title1: {
        color: theme.palette.primary.white,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgb(0 0 0 / 84%) 70%, rgb(0 0 0 / 42%) 100%)',

    },
    formControl: {
        margin: theme.spacing(2), // theme spacing unit is obsolete, replaced by theme.spacing
        minWidth: 240,
        maxWidth: 240
    }

}));




function Home(props) {

    const classes = useStyles();
    //declaring state for upcomingmovies and setupcoming movies
    const [upcomingmovies, setUpcomingMovies] = useState([]);
    const [releasedmovies, setReleasedMovies] = useState([]);

    //declaring states for Cards on the right side
    const [moviename, setMovieName] = useState("")

    const [genres, setGenres] = useState([]);
    const [artists, setArtists] = useState([])
    const [releaseDateStart, setReleaseDateStart] = useState("")
    const [releaseDateEnd, setReleaseEndDate] = useState("")
    const [genresList, setGenresList] = useState([]);
    const [artistsList, setArtistList] = useState([]);
    useEffect(() => {

        async function fetchPublished() {
            //Upcoming Titles fetch   
            try {
                const rawResponse = await fetch(props.baseUrl + "movies?status=PUBLISHED", {
                    method: 'GET',
                })

                if (rawResponse.ok) {
                    const result = await rawResponse.json()
                    //update state of upcomingmovies   
                    setUpcomingMovies(result["movies"]);
                    //console.log(result["movies"]);

                } else {
                    const error = new Error();
                    error.message = 'Unable to Load Upcoming Movies';

                }
            } catch (e) {
                alert(`Error: ${e.message}`);
            }
        }
        async function fetchReleased() {
            //fetch released movies    
            try {
                const rawResponse = await fetch(props.baseUrl + "movies?status=RELEASED", {
                    method: 'GET',
                })

                if (rawResponse.ok) {
                    const result = await rawResponse.json()
                    //update state of released movies    
                    setReleasedMovies(result["movies"]);


                } else {
                    const error = new Error();
                    error.message = 'Unable to Load Released Movies';

                }
            } catch (e) {
                alert(`Error: ${e.message}`);
            }
        }

        async function getGenres() {
            //load genres fetch    
            try {
                const rawResponse = await fetch(props.baseUrl + "genres", {
                    method: 'GET',
                })

                if (rawResponse.ok) {
                    const result = await rawResponse.json()

                    setGenresList(result["genres"]);
                    //console.log(result["genres"]);

                } else {
                    const error = new Error();
                    error.message = 'Unable to Load Genres';

                }
            } catch (e) {
                alert(`Error: ${e.message}`);
            }
        }

        async function getArtists() {
            //load artists fetch
            try {
                const rawResponse = await fetch(props.baseUrl + "artists", {
                    method: 'GET',
                })

                if (rawResponse.ok) {
                    const result = await rawResponse.json()

                    setArtistList(result["artists"]);
                    //console.log(result["artists"]);

                } else {
                    const error = new Error();
                    error.message = 'Unable to Load Artists';

                }
            } catch (e) {
                alert(`Error: ${e.message}`);
            }
        }


        fetchReleased();
        fetchPublished();
        getGenres();
        getArtists();
        //console.log("Use effect called")
    }, [])

    //handler to moviename    
    const movieNameChangeHandler = (e) => {
        setMovieName(e.target.value)
        //console.log(moviename)
    }

    //handler for genre
    const genreSelectHandler = (e) => {
        setGenres(e.target.value)
        //console.log(genres)
    }
    //handler for releaseDate
    const releaseDateStartHandler = (e) => {
        setReleaseDateStart(e.target.value)
        //console.log(releaseDateStart)
    }
    //handler for releaseEndDate
    const releaseDateEndHandler = (e) => {
        setReleaseEndDate(e.target.value)
        // console.log(releaseDateEnd)
    }
    //handler for artists
    const artistSelectHandler = (e) => {
        setArtists(e.target.value)
        //console.log(artists)
    }
    //handler for movie click
    const movieClickHandler = (movieId) => {
        props.history.push('/movie/' + movieId);
    }

    //filter apply button handler
    const filterApplyHandler = async () => {
        //console.log(moviename + " " + artists + " " + genres + " " + releaseDateStart + " " + releaseDateEnd)

        let moviequery = props.baseUrl + "movies?status=RELEASED";
        if (moviename !== "") {
            moviequery = moviequery + "&title=" + moviename;
        }
        if (genres.length > 0) {
            moviequery = moviequery + "&genre=" + genres.toString();
        }
        if (artists.length > 0) {
            moviequery = moviequery + "&artists=" + artists.toString();;
        }
        if (releaseDateStart !== "") {
            moviequery = moviequery + "&start_date=" + releaseDateStart;
        }
        if (releaseDateEnd !== "") {
            moviequery = moviequery + "&end_date=" + releaseDateEnd;
        }
        //console.log(moviequery)

        try {
            const rawResponse = await fetch(moviequery, {
                method: 'GET',
            })

            if (rawResponse.ok) {
                const result = await rawResponse.json()

                setReleasedMovies(result["movies"]);
                // console.log(result["movies"]);

            } else {
                const error = new Error();
                error.message = 'Unable to Load Upcoming Movies';

            }
        } catch (e) {
            alert(`Error: ${e.message}`);
        }

    }
    // displaying the page with upcoming, released and filters
    // Note - GridList is deprecated and ImageGridList is used
    return (
        <div>
            <Header baseUrl={props.baseUrl} showBookShowButton="false" />
            <div className="upcoming">Upcoming Titles </div>
            <div className={classes.root}>
                {/*Cell Height Deprecated instead rowHeight Used. Also GridList, GridListItem and GridListTIlebar also deprecated*/}

                <ImageList className={classes.imageList} cols={6} rowHeight={250}>
                    {upcomingmovies.map((item) => (
                        <ImageListItem key={item.id}>
                            <img src={item.poster_url} alt={item.title1} className="movie-poster" />
                            <span color="white"><ImageListItemBar
                                title={item.title}
                                classes={{
                                    root: classes.titleBar,
                                    title: classes.titleBar
                                }}

                            /></span>
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
            <div className="flex-container">
                <div className="newleft">
                    <ImageList rowHeight={350} cols={4} gap={20}>
                        {releasedmovies.map((item) => (
                            <ImageListItem key={item.id} className="imgListMain" >
                                <img className="movie-poster" onClick={() => movieClickHandler(item.id)} src={item.poster_url} height="350" alt={item.title} />
                                <ImageListItemBar
                                    title={item.title}
                                    subtitle={"Release Date: ".concat(new Date(item.release_date).toDateString())}
                                    classes={{
                                        root: classes.titleBar,
                                        title: classes.title1,
                                    }}

                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
                <div className="newright">
                    <Card>
                        <CardContent>
                            <FormControl className={classes.formControl}>
                                <Typography className={classes.title} color="textSecondary">
                                    FIND MOVIES BY:
                                </Typography>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                                <Input id="movieName" value={moviename} onChange={movieNameChangeHandler} />
                            </FormControl>
                            <br />
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="select-multiple-checkbox">Genres</InputLabel>
                                <Select
                                    multiple
                                    input={<Input id="select-multiple-checkbox-genre" />}
                                    renderValue={selected => selected.join(',')}
                                    value={genres}
                                    onChange={genreSelectHandler}
                                >
                                    {genresList.map(genre => (
                                        <MenuItem key={genre.id} value={genre.genre}>
                                            <Checkbox checked={genres.indexOf(genre.genre) > -1} />
                                            <ListItemText primary={genre.genre} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <br />
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="select-multiple-checkbox">Artists</InputLabel>
                                <Select
                                    multiple
                                    input={<Input id="select-multiple-checkbox" />}
                                    renderValue={selected => selected.join(',')}
                                    value={artists}
                                    onChange={artistSelectHandler}
                                >
                                    {artistsList.map(artist => (
                                        <MenuItem key={artist.id} value={artist.first_name + " " + artist.last_name}>
                                            <Checkbox checked={artists.indexOf(artist.first_name + " " + artist.last_name) > -1} />
                                            <ListItemText primary={artist.first_name + " " + artist.last_name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <br />
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="releaseDateStart"
                                    label="Release Date Start"
                                    type="date"
                                    defaultValue=""
                                    InputLabelProps={{ shrink: true }}
                                    onChange={releaseDateStartHandler}
                                />
                            </FormControl>
                            <br />
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="releaseDateEnd"
                                    label="Release Date End"
                                    type="date"
                                    defaultValue=""
                                    InputLabelProps={{ shrink: true }}
                                    onChange={releaseDateEndHandler}
                                />
                            </FormControl>
                            <br /><br />
                            <FormControl className={classes.formControl}>
                                <Button onClick={() => filterApplyHandler()} variant="contained" color="primary">
                                    APPLY
                                </Button>
                            </FormControl>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Home
