import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

class DatePickerComponent extends React.Component {
  render() {
    const { classes } = this.props;
    return(
      <form className={classes.reminderWrap} noValidate>
        <TextField
          id="datetime-local"
          label="Remind For Your Brain"
          type="datetime-local"
          defaultValue={ this.getCurrentTime }
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
         <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={ < SendIcon />}
        >
          Send
        </Button>
      </form>

    )
  }

  getCurrentTime = () => {
    
  }
}

export default withStyles(styles)(DatePickerComponent);




