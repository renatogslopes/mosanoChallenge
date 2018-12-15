import React, { Component } from "react";

/* Import Components */
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: {
        name: "",
        surname: "",
        birthday: "",
        country: ""
      },

      genderOptions: ["Male", "Female", "Others"],
      skillOptions: ["Programming", "Development", "Design", "Testing"]
    };
    this.handleName = this.handleName.bind(this);
    this.handleSurname = this.handleSurname.bind(this);
    this.handleBirthday = this.handleBirthday.bind(this);
    this.handleCountry = this.handleCountry.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */

  handleName(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          name: value
        }
      }),
      () => console.log(this.state.newUser)
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
      }),
      () => console.log(this.state.newUser)
    );
  }

  handleBirthday(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          birthday: value
        }
      }),
      () => console.log(this.state.newUser)
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
      }),
      () => console.log(this.state.newUser)
    );
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          [name]: value
        }
      }),
      () => console.log(this.state.newUser)
    );
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newUser;

    fetch("http://example.com", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        console.log("Successful" + data);
      });
    });
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      newUser: {
        name: "",
        surname: "",
        birthday: "",
        country: ""
      }
    });
  }

  render() {
    return (
      <form className="container-fluid" onSubmit={this.handleFormSubmit}>
        <Input
          inputType={"text"}
          title={"Name"}
          name={"name"}
          value={this.state.newUser.name}
          placeholder={"Enter your name"}
          handleChange={this.handleInput}
        />

        <Input
          inputType={"text"}
          title={"Surname"}
          name={"name"}
          value={this.state.newUser.surname}
          placeholder={"Enter your surname"}
          handleChange={this.handleInput}
        />

        <Select
          title={"Countries"}
          name={"country"}
          options={this.state.genderOptions}
          value={this.state.newUser.country}
          placeholder={"Select your country"}
          handleChange={this.handleInput}
        />

        <Input
          inputType={"text"}
          title={"Full Name"}
          name={"name"}
          value={this.state.newUser.name}
          placeholder={"Enter your name"}
          handleChange={this.handleInput}
        />

        <Button
          action={this.handleFormSubmit}
          type={"primary"}
          title={"Submit"}
        />

        <Button
          action={this.handleClearForm}
          type={"secondary"}
          title={"Clear"}
        />

      </form>
    );
  }
}


export default MainContainer;
