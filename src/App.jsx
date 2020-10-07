import React, { Component } from "react";
import HeroiServices from "./HeroiServices.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameHero: "",
      accessToken: "",
      herois: [],
      fields: {},
    };
  }

  btnPesquisarHeroi() {
    if (!this.state.accessToken) {
      alert("Seu código de acesso não pode ser vazio");
      return;
    }
    if (!this.state.nameHero) {
      alert("Nome do heroi não pode ser vazio");
      return;
    }
    HeroiServices.getHeroName(this.state.accessToken, this.state.nameHero).then(
      (sucess) => {
        if (sucess.status !== 200) return;
        if (sucess.status === 200 && sucess.data.response === "error") {
          alert(sucess.data.error);
          return;
        }

        this.setState({ herois: sucess.data.results });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  btnPesquisarAleatorio() {
    if (!this.state.accessToken) {
      alert("Seu código de acesso não pode ser vazio");
      return;
    }
    this.setState({ herois: [] });
    var herois = [];
    for (let index = 0; index < 10; index++) {
      HeroiServices.getHeroiId(
        this.state.accessToken,
        this.retornarNumeroAleatorio()
      ).then(
        (sucess) => {
          debugger;
          if (sucess.status !== 200) return;
          if (sucess.status === 200 && !sucess.data) alert(sucess.status);
          herois.push(sucess.data);
          this.setState({ herois });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  retornarNumeroAleatorio() {
    return Math.floor(Math.random() * 731) + 1;
  }

  render() {
    return (
      <body>
        <head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
            integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
            crossorigin="anonymous"
          />
        </head>
        <div className="container">
          <h1 className="text-center"> Busca de Heróis </h1>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                Access Token
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Digite o seu código de acesso"
              onChange={(e) => this.setState({ accessToken: e.target.value })}
              aria-describedby="basic-addon1"
            />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                Nome Heroi
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Digite o nome do Heroi"
              onChange={(e) => this.setState({ nameHero: e.target.value })}
              aria-describedby="basic-addon1"
            />
          </div>
          <div class="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className="btn btn-primary ml-2"
              onClick={this.btnPesquisarHeroi.bind(this)}
            >
              Pesquisar
            </button>
            <button
              type="button"
              className="btn btn-primary ml-2"
              onClick={this.btnPesquisarAleatorio.bind(this)}
            >
              Aleatorio
            </button>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {this.state.herois.map((heroi) => (
              <div className="col-md-4 mt-2" id={heroi.id}>
                <div>
                  <img
                    src={heroi.image.url}
                    alt={heroi.name}
                    width="100%"
                    height="60%"
                  />
                </div>
                <div className="input-group">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Id
                      </span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      aria-describedby="inputGroup-sizing-default"
                      disabled
                      value={heroi.id}
                    />
                  </div>

                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Name
                      </span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      aria-describedby="inputGroup-sizing-default"
                      disabled
                      value={heroi.name}
                    />
                  </div>

                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      aria-describedby="inputGroup-sizing-default"
                      disabled
                      value="PowerStats"
                    />
                  </div>
                  <div>
                    {heroi.powerstats
                      ? Object.entries(heroi.powerstats).map((power) => (
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span
                                class="input-group-text"
                                id="inputGroup-sizing-default"
                              >
                                {power[0]}
                              </span>
                            </div>
                            <input
                              type="text"
                              class="form-control"
                              aria-describedby="inputGroup-sizing-default"
                              disabled
                              value={power[1]}
                            />
                          </div>
                        ))
                      : ""}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </body>
    );
  }
}

export default App;
