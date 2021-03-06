// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classnames from 'classnames';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Text from 'material-ui/Text';
import { red } from 'material-ui/styles/colors';
import paellaImage from 'docs/site/assets/images/paella@2x.jpg';

const styleSheet = createStyleSheet('RecipeReviewCard', (theme) => ({
  card: { maxWidth: 400 },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', '150ms'),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: { backgroundColor: red[500] },
  flexGrow: { flex: '1 1 auto' },
}));

export default class RecipeReviewCard extends Component {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = { expanded: false };

  handleExpandClick = () => this.setState({ expanded: !this.state.expanded });

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={<Avatar icon="R" aria-label="Recipe" className={classes.avatar} />}
            title="Shrimp and Chorizo Paella"
            subhead="September 14, 2016"
          />
          <CardMedia>
            <img src={paellaImage} alt="Contemplative Reptile" />
          </CardMedia>
          <CardContent>
            <Text component="p">
              This impressive paella is a perfect party dish and a
              fun meal to cook together with your guests. Add 1 cup
              of frozen peas along with the mussels, if you like.
            </Text>
          </CardContent>
          <CardActions actionSpacing={false}>
            <IconButton>favorite</IconButton>
            <IconButton>share</IconButton>
            <div className={classes.flexGrow} />
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
            >
              expand_more
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
            <CardContent>
              <Text paragraph type="body2">Method:</Text>
              <Text paragraph>
                Heat 1/2 cup of the broth in a pot until simmering,
                add saffron and set aside for 10 minutes.
              </Text>
              <Text paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large,
                deep skillet over medium-high heat. Add chicken, shrimp
                and chorizo, and cook, stirring occasionally until
                lightly browned, 6 to 8 minutes. Transfer shrimp to a
                large plate and set aside, leaving chicken and chorizo
                in the pan. Add pimentón, bay leaves, garlic, tomatoes,
                onion, salt and pepper, and cook, stirring often until
                thickened and fragrant, about 10 minutes. Add saffron broth
                and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Text>
              <Text paragraph>
                Add rice and stir very gently to distribute. Top with
                artichokes and peppers, and cook without stirring, until
                most of the liquid is absorbed, 15 to 18 minutes. Reduce
                heat to medium-low, add reserved shrimp and mussels,
                tucking them down into the rice, and cook again without
                stirring, until mussels have opened and rice is just tender,
                5 to 7 minutes more. (Discard any mussels that don’t open.)
              </Text>
              <Text>Set aside off of the heat to let rest for 10 minutes, and then serve.</Text>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}
