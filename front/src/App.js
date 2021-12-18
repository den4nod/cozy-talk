import './App.css';
import {PostContainer} from './containers/post/post';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PostContainer
          subject="First post"
          body="The first post in CozyTalk social network.
                        The first post is very special.
                        It is the face of each profile.
                        It makes an impression on friends and
                        other people in community who view your page."
          tags={['first post', 'post', 'cozy talk', 'news']}
        />
      </header>
    </div>
  );
}

export default App;
