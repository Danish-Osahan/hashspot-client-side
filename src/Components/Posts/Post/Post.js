import React,{ useState} from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
// import ButtonBase from '@material-ui/core/ButtonBase';
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletepost, likepost } from "../../../actions/posts";
// import { useNavigate } from "react-router-dom";

const Post = ({ post, setcurrentid ,mode}) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(post?.likes);

  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const userId = user?.result.googleId || user?.result?._id;

  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likepost(post._id));
    
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };



  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  // const openPost = () => {
  //   navigate(`/posts/${post._id}`);
  // };

  let light = {
    boxShadow:
      "  -3px -3px 6px #ffffff,3px 3px 6px #00000050, -3px -3px 6px #ffffff,3px 3px 6px #00000050",
    backgroundColor: "#e8e8e8",
    border: "none",
  };
  let dark = {
    boxShadow:
      "-3px -3px 6px #ffffff10,3px 3px 6px #000000, -3px -3px 6px #ffffff10,3px 3px 6px #00000090",
    backgroundColor: "#272727",
    border: "none",
    color: "white",
  };
  return (
    <Card className={classes.card} id="card" raised elevation={4} style={mode==='Light'?light:dark}>
     
        <CardMedia
          className={classes.media}
          image={post.selectedfile}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2"  >
            {moment(post.createdat).fromNow()}
          </Typography>
        </div>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setcurrentid(post._id);
              }}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
        )}

        <div className={classes.details}>
          <Typography variant="body2" >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography variant="h5" className={classes.title}  gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2"  component="p">
            {post.message}
          </Typography>
        </CardContent>
      
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
          // onClick={() => dispatch(likepost(post._id))}
        >
          {/* <ThumbUpAltIcon fontSize="small" />
          &nbsp;Like &nbsp; {post.likecount} */}
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletepost(post._id))}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
