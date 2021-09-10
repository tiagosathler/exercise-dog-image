import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      loading: true,
    }

    this.renderImage = this.renderImage.bind(this);
    this.fecthDog = this.fecthDog.bind(this);
  }
  
  async fecthDog() {
    this.setState(
      { loading: true},
      async () => {
        const requestInfo = await fetch("https://dog.ceo/api/breeds/image/random");
        const { message } = await requestInfo.json();
        this.setState({
          loading: false,
          url: message,
        })
      }
    )
  }
  
  componentDidMount() {
    this.fecthDog();
  }

  renderImage() {
    const { url } = this.state;
    return (
      <img src={ url } alt="Cão" />
    );
  }

  render() {
    const { loading } = this.state;
    const loadingElement = <p>Loading...</p>;
    return(
    <div className="App">
      { loading ? loadingElement : this.renderImage() }
    </div>
    );
  }
}

export default App;
