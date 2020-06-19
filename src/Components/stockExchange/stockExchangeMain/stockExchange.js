import React from "react";
import useStyles from "./style";
import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';
import Share from './share'
import {actions} from "./shareList";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function StockExchange() {

    const classes = useStyles();
    const [allShare, setAllShare] = React.useState([]);

    function deleteExchange(i) {
        let temp = allShare.slice();
        temp.splice(i, 1);
        setAllShare(temp);

    }

    function addExchange(value) {

        fetch("https://bdoalex.com/mysuperday/api/bourse?action=" + value)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                let newPush = allShare.slice();
                newPush.push(new Share(data.name, data.lowPrice, data.highPrice, data.dayChangePercentage, data.lastPrice))
                setAllShare(newPush);
            })
    }

    const [getValueAutoComplete, setGetValueAutoComplete] = React.useState("")
    return (
        <div className={classes.container}>
            <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item xs={'auto'}>
                    <Autocomplete
                        onChange={(event, value) => setGetValueAutoComplete(value.value)}
                        id="combo-box-demo"
                        options={actions}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Ajouter une action" variant="outlined" />}
                    />

                </Grid>
                <Grid item xs={'auto'}>
                    <Fab color="primary" aria-label="add" onClick={() => addExchange(getValueAutoComplete)}>
                        <AddIcon/>
                    </Fab>
                </Grid>
            </Grid>
            <Grid container justify="center">
                {
                    allShare.map((item, i) =>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Grid container alignItems="center" className={classes.gridItem}>
                                    <Grid item xs={5} className={classes.data}>
                                        <p className={classes.shareTitle}>
                                            {item.name}
                                        </p>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <div>
                                                    <p className={classes.infoTitle}>Prix actuel : </p>
                                                    <p className={classes.infoNumber}>{item.lastPrice}</p>
                                                </div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div>
                                                    <p className={classes.infoTitle}>Variation du jour : </p>
                                                    <p className={classes.infoNumber}>{item.dayPercentChange > 0 ?
                                                        <span
                                                            className={classes.green}> {item.dayPercentChange} %</span> :
                                                        <span
                                                            className={classes.red}>{item.dayPercentChange} %</span>}</p>
                                                </div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div>
                                                    <p className={classes.infoTitle}>Prix + haut : </p>
                                                    <p className={classes.infoNumber}>{item.highPrice}</p>
                                                </div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div>
                                                    <p className={classes.infoTitle}>Prix + bas : </p>
                                                    <p className={classes.infoNumber}>{item.lowPrice}</p>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Grid container>
                                            <Grid item xs={11}>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <IconButton>
                                                    <CloseIcon onClick={() => deleteExchange(i)}/>
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    )
                }
            </Grid>
        </div>
    );
}