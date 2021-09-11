import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "",
      breed: "",
    };

    this.loading = true;
    this.isTerrier = false;
    this.renderImage = this.renderImage.bind(this);
    this.fetchDog = this.fetchDog.bind(this);
  }

  componentDidMount() {
    console.log("didMount");
    this.fetchDog();
  }

  shouldComponentUpdate(_nextProps, nextState) {
    console.log("shouldUpdate?");
    const { url } = nextState;
    this.isTerrier = url.includes("terrier");
    return true;
  }

  componentDidUpdate(_prevProps, prevState) {
    console.log("didUptade");
    const { url, breed } = this.state;
    if (!this.isTerrier) {
      localStorage.setItem("dog_url", url);
      localStorage.setItem("dog_breed", breed);
    }
    this.loading = true;
  }

  componentWillUnmount() {
    console.log("willUnmount");
  }

  async fetchDog() {
    console.log("fetch");
    const request = await fetch("https://dog.ceo/api/breeds/image/random");
    const json = await request.json();
    const regex = /(?<=breeds\/)(.*)(?=\/)/gi;
    const breed = json.message.match(regex);
    console.log("setState");
    this.loading = false;
    this.setState({
      url: json.message,
      breed,
    });
  }

  renderImage() {
    const { url, breed } = this.state;
    return (
      <section>
        <h1>{breed}</h1>
        <img src={url} alt="dog" width="50%" />
      </section>
    );
  }

  render() {
    console.log("render");
    const loadingElement = <p id="loading">Loading...</p>;
    const terrierElement = (
      <p>The next dog is a terrier breed, sorry I won't show it.</p>
    );
    return (
      <div className="App">
        <button onClick={this.fetchDog}>Buscar outro cão</button>
        <br />
        {this.loading && loadingElement}
        {this.isTerrier ? terrierElement : this.renderImage()}
      </div>
    );
  }
}

export default App;
