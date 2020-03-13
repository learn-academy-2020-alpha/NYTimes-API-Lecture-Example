import React, { Component } from "react"
import './App.css'
import { Jumbotron, Container, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap'

class App extends Component{
  constructor(){
    super()
    this.state = {
      search: "",
      articles: []
    }
  }

  getArticles = (query) => {
    let apiKey = process.env.REACT_APP_NYT_KEY
    let searchUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${apiKey}`

    fetch(searchUrl)
    .then((response) => {
      return response.json()
    })
    .then((payload) => {
      let articles = payload.response.docs
      this.setState({ articles: articles })
      console.log(articles)
    })
  }

  search = () => {
    this.getArticles(this.state.search)
  }


  render(){
    return(
      <React.Fragment>

      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">NY Times Articles</h1>
          <p className="lead">Search for articles here.</p>
        </Container>
      </Jumbotron>

      <InputGroup>
        <Input
          placeholder="search articles here"
          type="text"
          value={ this.state.search }
          onChange={ (event) => this.setState({ search: event.target.value })}
        />
        <InputGroupAddon addonType="append">
          <InputGroupText onClick={ this.search }>Search</InputGroupText>
        </InputGroupAddon>
      </InputGroup>

      <div>
        { this.state.articles.map((article, index) => {
          return(
            <div key={ index }>
              <a href={ article.web_url }>
                { article.abstract }
              </a>
            </div>
          )
        })}
      </div>

      </React.Fragment>
    )
  }
}
export default App
