import React, {Component} from 'react'
import Table from './Table'
import Form from "./Form";
import axios from "axios";

class App extends Component {
    state = {
        characters: []
    };

    makePostCall(character) {
        return axios.post('http://localhost:5000/users', character)
            .then(function (response) {
                console.log(response);
                console.log(response.data.added)
                return (response.status === 201);
            })
            .catch(function (error) {
                console.log(error);
                return false;
            });
    }

    handleSubmit = character => {
        this.makePostCall(character).then(callResult => {
            if (callResult === true) {
                this.setState({characters: [...this.state.characters, character]});
            }
        });
    }

    deleteCharacterCall = characterID => {
        console.log('http://localhost:5000/users/' + characterID)
        axios.delete('http://localhost:5000/users/' + characterID)
            .then(function (response) {
                console.log(response);
                return (response.status === 200);
            })
            .catch(function (error) {
                console.log(error);
                return false;
            });
    }


    removeCharacter = index => {
        const {characters} = this.state

        let characterID = ''

        this.setState({
            characters: characters.filter((character, i) => {
                characterID = character.id
                return i !== index
            }),
        })

        this.deleteCharacterCall(characterID);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users')
            .then(res => {
                const characters = res.data.users_list;
                this.setState({characters});
            })
            .catch(function (error) {
                //Not handling the error. Just logging into the console.
                console.log(error);
            });
    }

    render() {
        const {characters} = this.state;

        return (
            <div className="container">
                <Table characterData={characters} removeCharacter={this.removeCharacter}/>
                <Form handleSubmit={this.handleSubmit}/>
            </div>
        );
    }


}

export default App