export const ADD_TWEETS = 'ADD_TWEETS';
export const SET_STATUS = 'SET_STATUS';
export const LOADING = 'LOADING';

export const fetchTweets = () => {
  return (dispatch) => {
    dispatch(setStatutsToLoading());
    fetch('http://tweet-stream.glitch.me/api/tweets')
      .then(response => response.json())
      .then(response => {
        console.log(response, dispatch);
        dispatch(addTweets(response.tweets))
      });
  }
}

export const addTweets = (tweets) => ({
  type: ADD_TWEETS,
  payload: { tweets },
})

export const setStatutsToLoading = () => ({
  type: SET_STATUS,
  payload: { status: LOADING },
})