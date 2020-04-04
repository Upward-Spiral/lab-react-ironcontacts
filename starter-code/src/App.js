import React, { Component } from 'react';
import './App.css';
import contacts from './contacts.json';
import Contact from "./components/contact.js";

class App extends Component {
  state = {
    ironContacts: contacts,
    showedContacts: contacts.slice(0,5)
  }

  pushRandom = ()=>{
    let tempList = [...this.state.showedContacts];
    tempList.push(this.state.ironContacts[Math.ceil(Math.random()*this.state.ironContacts.length)])
    this.setState({showedContacts: tempList })
  }

  sortContacts = ()=>{
    let tempList = [...this.state.showedContacts];
    tempList.sort();
    this.setState({showedContacts: tempList })
  }

  dynamicSort= (property)=> {
      var sortOrder = 1;

      if(property[0] === "-") {
          sortOrder = -1;
          property = property.substr(1);
      }

      return function (a,b) {
          if(sortOrder === -1){
              return b[property].localeCompare(a[property]);
          }else{
              return a[property].localeCompare(b[property]);
          }        
      }
  }

  sortContactsByName = ()=> {
    let showedArray = [...this.state.showedContacts]
    showedArray.sort(this.dynamicSort("name"));

    console.log(showedArray);
    this.setState({showedContacts:showedArray})

  }

  sortContactsByPopularity = ()=> {
    let showedArray = [...this.state.showedContacts]
    // showedArray.sort(this.dynamicSort("popularity"));
    showedArray.sort((contactA, contactB)=> contactB.popularity - contactA.popularity);

    console.log(showedArray);
    this.setState({showedContacts:showedArray})
  }

  deleteContact = (Ix)=> {
    let tempShowedList = [...this.state.showedContacts];
    // let tempIronList = [...this.state.ironContacts];
    // let Ix2 = tempIronList.findIndex((item)=>item.name===tempShowedList[Ix].name);
    // tempIronList.splice(Ix2,1);
    tempShowedList.splice(Ix,1);
    this.setState({
      showedContacts: tempShowedList, 
      // ironContacts: tempIronList 
    })
  }

  render() {
    debugger
    return (
      <div className="App">
        <header className="App-header">
        <h1 className="App-title">IronContacts</h1>
        </header>
        <div class="buttonSelectors">
        <button onClick={this.pushRandom}>Add Random contact</button>
        <button onClick={this.sortContactsByName}>Sort by Name</button>
        <button onClick={this.sortContactsByPopularity}>Sort by popularity</button>
        </div>
        <div className="col">
          {this.state.showedContacts.map((contact,index)=> (
                <Contact 
                    name = {contact.name} 
                    popularity={contact.popularity}
                    pictureUrl={contact.pictureUrl}
                    deleteContact={this.deleteContact}
                    index={index} />
            ))}
        </div>
        
      </div>
    );
  }
}

export default App;
