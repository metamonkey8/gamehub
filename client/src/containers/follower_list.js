import React, {Component, PropTyes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Router, Route, Link, browserHistory} from 'react-router';
import {postProfile, showFriends, showGames, createFavMedia, showFollowers} from '../actions/index';
import axios from 'axios';

export class FollowerList extends Component {
  componentWillMount() {
    this.props.showFollowers([]);
  }

  changeProfile(email) {
    axios.post('/get_user_info',{email: email})
      .then(response => {
        browserHistory.push(`/profile/${email}`);

        let prop = {
          name: response.data.found.fullname,
          location: response.data.found.location,
          bio: response.data.found.bio,
          email: email,
          pic_path: response.data.found.pic_path
        };

        this.props.showFriends([]);
        this.props.showFollowers([]);
        this.props.postProfile(prop);
        this.props.showGames({email: email});
        this.props.createFavMedia([null, email]);

        let URL_array = window.location.pathname.split('/profile/');
        axios.post('/get_friend_info',{friend1: this.props.authData.email, friend2: URL_array[1]})
          .then(response => {
            if (this.props.authData.email !== this.props.profile.email) {
              if(response.data.status == "Found") {
                document.getElementById("followBtn").style.background='#5CB85C';
                document.getElementById("followBtn").firstChild.data='following';
              }
              else {
                document.getElementById("followBtn").style.background='#d3d3d3';
                document.getElementById("followBtn").firstChild.data='follow';
              }
            }
          });
      });
  }

  render() {
    return (
      <div>
        <table className="followers-table">
          <tbody>
            {this.props.followerList.map(item => {
              return (
              <tr key={item.email}>
                <td onClick={()=> {this.changeProfile(item.email)}} className="friend_pic">
                  <img className="img-rounded" src={item.pic_path}/>
                </td>
                <td className="friends-name" onClick={()=> {this.changeProfile(item.email)}}>
                  {item.name}
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    friendList: state.friendList,
    authData: state.authData,
    profile: state.profile,
    followerList: state.followerList
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({postProfile, showFriends, showGames, createFavMedia, showFollowers}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowerList);
