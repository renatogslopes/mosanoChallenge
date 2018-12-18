import React, { Component } from "react";

/* Import Style */
import '../index.scss';

/* Import Components */
import Button from "../components/Button";
import Input from "../components/Input";
import DatesPicker from "../components/DatesPicker";
import Select from "../components/Select";
import Loading from '../components/Loading'

/* Import API Countries */
import RequestService from "../providers/api";

/* Import Language */
import Language from "../providers/language";
 
class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: {
        name: "",
        surname: "",
        birthday: new Date(),
        country: ""
      },
      aOldEntries: [],
      aCountriesOptions: [],
      dTodayDate: new Date(),
      bLoadingSpinner: true,
      bShowHideMessage: false,
      bShowHideEntry: false,
      sEntryNameToShow: ''
    };

    this.handleName = this.handleName.bind(this);
    this.handleSurname = this.handleSurname.bind(this);
    this.handleBirthday = this.handleBirthday.bind(this);
    this.handleCountry = this.handleCountry.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.loadingCountries = this.loadingCountries.bind(this);
    this.loadingOldEntries = this.loadingOldEntries.bind(this);
    this.showTableEntry = this.showTableEntry.bind(this);
    this.ClearAllEntries = this.ClearAllEntries.bind(this);
    this.changeToEN = this.changeToEN.bind(this);
    this.changeToPT = this.changeToPT.bind(this);
  }

  componentDidMount() {
    // Loading countries to select component.
    this.loadingCountries();
    // Loading oldEntries
    this.loadingOldEntries();
  }

  loadingCountries() {
    let aArrayTemp = [];
    RequestService.getCountries().then(data => {
      for (let i = 0; i < data.length; i++) {
        aArrayTemp.push(data[i].name);
      }
      this.setState({
        aCountriesOptions: aArrayTemp
      });
    });
    aArrayTemp = [];
  }

  loadingOldEntries() {
    let jJsonTemp = localStorage.getItem('dataObject');
    //Already exist on localStorage
    if (jJsonTemp) {
      this.setState({
        aOldEntries: JSON.parse('[' + jJsonTemp + ']')
      });
    }
    
    setTimeout(() => {
      this.setState({
        bLoadingSpinner: false
      });        
    }, 2000);
    
    jJsonTemp = '';
  }

  handleName(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          name: value
        }
      })
    );
  }

  handleSurname(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          surname: value
        }
      })
    );
  }

  handleBirthday(date) {
    let value = date;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          birthday: value
        }
      })
    );
  }

  handleCountry(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          country: value
        }
      })
    );
  }

  handleSubmitForm(e) {
    e.preventDefault();
    let jJsonTemp = localStorage.getItem('dataObject');

    //Already exist on localStorage
    if (jJsonTemp) {
      //add new data
      jJsonTemp = jJsonTemp + ', ' + (JSON.stringify(this.state.newUser));
      //Save on LocalStorage
      localStorage.setItem('dataObject', jJsonTemp);
    } else {
      //add new data
      jJsonTemp = JSON.stringify(this.state.newUser);
      //Save on LocalStorage
      localStorage.setItem('dataObject', jJsonTemp);

    }

    this.setState({
      bShowHideMessage: true,
      aOldEntries: JSON.parse('[' + jJsonTemp + ']')
    });

    /* //Hide again
    setTimeout(()=>{ 
      this.setState({
        bShowHideMessage: false
      });
    }, 5000); */

  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      newUser: {
        name: "",
        surname: "",
        birthday: new Date(),
        country: ""
      },
      bShowHideMessage: false
    });
  }

  showTableEntry(e, item) {
    this.setState({
      bShowHideEntry: true,
      sEntryNameToShow: item.name + ' ' + item.surname
    });
  }

  ClearAllEntries() {
    if (window.confirm(Language.iClearAllEntries)) {
      localStorage.removeItem('dataObject');
      this.setState({
        aOldEntries: []
      });
    }    
  }

  changeToEN(){
    Language.setLanguage('en');
    this.setState({});
  }

  changeToPT(){
    Language.setLanguage('pt');
    this.setState({});
  }
 
  render() {
    return (
      <div className="container">
        <h1 className="m-3 colorBlueText centerH">Mosano Challenge</h1>
        <Loading message={Language.sLoading} classMain={this.state.bLoadingSpinner ? 'loading ' : 'loading hideElement'} name='folding-cube' color='steelblue' overrideSpinnerClassName='centerImg' spanClass='centerMessage' />
        <div align='right'>
          <Button
            action={this.changeToEN}
            type={Language.getLanguage() === 'en' ? "btn colorBlueButton": "btn colorWhiteButton"}
            title={"EN"}
            style={{ margin: '10px' }}
          />
          <Button
            action={this.changeToPT}
            type={Language.getLanguage() === 'pt' ? "btn colorBlueButton": "btn colorWhiteButton"}
            title={"PT"}
            style={{ margin: '10px' }}
          />
        </div>
        <div className="row">
          <div className="col border shadow rounded mr-1 p-3">
            <form className="container-fluid" onSubmit={this.handleSubmitForm}>
              <Input
                type={"text"}
                title={Language.fName}
                name={"name"}
                value={this.state.newUser.name}
                placeholder={Language.phName}
                onChange={this.handleName}
              />

              <Input
                type={"text"}
                title={Language.fSurname}
                name={"surname"}
                value={this.state.newUser.surname}
                placeholder={Language.phSurname}
                onChange={this.handleSurname}
              />

              <Select
                title={Language.fCountry}
                name={"country"}
                options={this.state.aCountriesOptions}
                value={this.state.newUser.phCountry}
                placeholder={Language.phCountry}
                handleChange={this.handleCountry}
              />

              <DatesPicker
                name={"Birthday"}
                title={Language.fBirthday}
                selected={this.state.newUser.birthday}
                onChange={this.handleBirthday}
                dateFormat={"dd/MMM/YYYY"}
              />

              <Button
                action={this.handleSubmitForm}
                type={"btn colorBlueButton"}
                title={Language.bSave}
                style={{ margin: '2px' }}
              />

              <Button
                action={this.handleClearForm}
                type={"btn btn-secondary"}
                title={Language.bClear}
                style={{ margin: '2px' }}
              />
            </form>
            <div className="alert alert-success mt-3" role="alert" style={this.state.bShowHideMessage ? { display: 'block' } : { display: 'none' }}>
              <h4 className="alert-heading">{Language.iSaveMessageHead}</h4>
              <span>{Language.iSaveMessageBodyP1} {this.state.newUser.name + ' ' + this.state.newUser.surname +', '+ Language.iSaveMessageBodyP2 +''+ this.state.newUser.country}.
               {Language.iSaveMessageBodyP3 +''+ this.state.newUser.birthday.toLocaleString().substr(0, 2)}, {this.state.newUser.birthday.toLocaleString("en-GB", { month: "long" }) +''+Language.iSaveMessageBodyP4} {Number(this.state.newUser.birthday.toLocaleString().substr(6, 4)) + (this.state.newUser.birthday.getTime() - this.state.dTodayDate.getTime() > 0 ? 1 : 0) +''+ Language.iSaveMessageBodyP5} {Number(this.state.dTodayDate.getFullYear()) - (Number(this.state.newUser.birthday.toLocaleString().substr(6, 4)) + (this.state.newUser.birthday.getTime() - this.state.dTodayDate.getTime() > 0 ? 1 : 0)) +''+ Language.iSaveMessageBodyP6} 
              </span>
            </div>

          </div>
          <div className="col border shadow rounded p-3">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th scope="col">{Language.thName}</th>
                  <th scope="col">{Language.thCountry}</th>
                  <th scope="col">{Language.thBirthday}</th>
                </tr>
              </thead>
              <tbody>
                {this.state.aOldEntries.map(item => (
                  <tr key={item.birthday} className="mouse" onClick={e => this.showTableEntry(e, item)}>
                    <td>{item.name}</td>
                    <td>{item.country}</td>
                    <td>{item.birthday.toLocaleString().substr(0, 10)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3" className="centerH" style={this.state.aOldEntries.length === 0 ? {} : { display: 'none' }}>{Language.tbNodata}</td>
                </tr>
              </tbody>              
            </table>
            <Button
                action={this.ClearAllEntries}
                type={"btn btn-secondary"}
                title={Language.bClearAllEntries}
                style={{ margin: '2px', float: 'right' }}
              />
          </div>
        </div>
        <h3 className="mt-4 rightH" style={this.state.bShowHideEntry ? {} : { display: 'none' }}> {Language.tbNodata} <span className="colorBlueText">{this.state.sEntryNameToShow}</span> {Language.iEntrySelectedP2} </h3>
      </div>
    );
  }
}

export default MainContainer;
