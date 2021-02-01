import './App.css';
import React from 'react';
import Bilder from './bilder.js'
import TopList from './toplist.js'
const urltillbilder = 'http://localhost:3001/helloman'
const urltillupdaterELO = 'http://localhost:3001/updateraelo'
const urlELOTOP = 'http://localhost:3001/top10'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      randombild1: "",
      randombild2: "",
      elo1: Number,
      elo2: Number,
      onechance: Number,
      twochance: Number,
      id1: Number,
      id2: Number,
      topList1: "",
      topList2: "",
      topList3: "",
      topList4: "",
      topList5: "",
    };
  }


  getRiksdagensBilder(){
    fetch(urltillbilder)
    .then(response => {
      if(!response.ok){
        return;
      }
      return response.json()
      .then(allData => {
        this.setState({data: allData});
        var random = allData[Math.floor(Math.random()*this.state.data.length)]
        var random2 = allData[Math.floor(Math.random()*this.state.data.length)]
        this.setState({randombild1:random.bild_url, randombild2:random2.bild_url, elo1:random.elo_rating, elo2:random2.elo_rating, id1:random._id, id2:random2._id});
      })
      .catch(err => {
        throw Error(err.message);
      });
    });
  }



  onewins(){
    var elo1 = this.state.elo1 
    var elo2 = this.state.elo2
    var onechance = (1.0 / (1.0 + Math.pow(10, ((elo2 - elo1) / 400))));
    var twochance = (1.0 / (1.0 + Math.pow(10, ((elo1 - elo2) / 400))));
    var Newelo1 = elo1 + 30 * (1 - onechance);
    var Newelo2 = elo2 + 30 * (0 - twochance);
    console.log(Newelo1,Newelo2)
    this.setState({elo1:Newelo1, elo2:Newelo2}, function () {
      this.updateraELO(this.state.id1, this.state.elo1)
      this.updateraELO(this.state.id2, this.state.elo2)
      this.taframrandombild();
  });  
}

  twowins(){
    var elo1 = this.state.elo1 
    var elo2 = this.state.elo2
    var onechance = (1.0 / (1.0 + Math.pow(10, ((elo2 - elo1) / 400))));
    var twochance = (1.0 / (1.0 + Math.pow(10, ((elo1 - elo2) / 400))));
    var Newelo1 = elo1 + 30 * (0 - onechance);
    var Newelo2 = elo2 + 30 * (1 - twochance);
    this.setState({elo1:Newelo1, elo2:Newelo2}, function () {
      this.updateraELO(this.state.id1, this.state.elo1)
      this.updateraELO(this.state.id2, this.state.elo2)
      this.taframrandombild();
  });;
}


   updateraELO(id,elo){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("_id", id);
    urlencoded.append("newELO", elo);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch(urltillupdaterELO, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  getTOPLIST(){
    fetch(urlELOTOP)
    .then(response => {
      if(!response.ok){
        return;
      }
      return response.json()
      .then(data => {
        this.setState({topList1: data[0].bild_url,topList2: data[1].bild_url,topList3: data[2].bild_url,topList4: data[3].bild_url,topList5: data[4].bild_url});
      })
      .catch(err => {
        throw Error(err.message);
      });
    });
  }

  taframrandombild(){
        var random = this.state.data[Math.floor(Math.random()*this.state.data.length)]
        var random2 = this.state.data[Math.floor(Math.random()*this.state.data.length)]
        this.setState({randombild1:random.bild_url, randombild2:random2.bild_url, elo1:random.elo_rating, elo2:random2.elo_rating, id1:random._id, id2:random2._id});
        this.getTOPLIST();
  }


 componentDidMount(){
  this.getTOPLIST();
  this.getRiksdagensBilder();
}

  render() {
    return (
      <div className="centerscreen">     
          <Bilder poster1={this.state.randombild1} poster2={this.state.randombild2}/>
        <button style={{margin:10}} onClick={() =>this.onewins()}>one wins</button>
        <button style={{margin:10}} onClick={() =>this.twowins()}>two wins</button>

        <TopList poster1={this.state.topList1} poster2={this.state.topList2} poster3={this.state.topList3} poster4={this.state.topList4} poster5={this.state.topList5}></TopList>

      </div>
    
  )} 
};

export default App;