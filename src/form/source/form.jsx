import React from "react";
import * as Validator from 'validatorjs';

const Input = ({label, type, nama, onChange, alamat, name}) => {
    return (
        <div>
        <label>
            {label}:
        </label>
        <br />
        <input type={type} nama={nama} onChange={e => onChange(e.target.value)} />
        <br />
        </div>
    )
}

const ShowErrors = ({errors}) => {
    return(
        <ul style={{color:'red', marginLeft: '-20px'}}>
            {
                errors.map((error, i) => <li key={i}>{error}</li>)
            }
        </ul>
    )
}

class Validation extends React.Component {
    state = {
        email: '',
        password: '',
        alamat: '',
        name: '',
        errors: []
    }

    handleSubmit = event => {
        event.preventDefault();
        const {email, password, alamat, name} = this.state;

        //pake validator js

        const data = {email,password,alamat, name};

        const rules = {
        email: 'required|email',
        password: 'min:8|required',
        alamat: 'min:8|required',
        name: 'required|name'
        };

        const validation = new Validator(data,rules);
        validation.passes();
        this.setState({
            errors: [
                ...validation.errors.get('email'),
                ...validation.errors.get('password'),
                ...validation.errors.get('alamat'),
                ...validation.errors.get('name')
            ]
        }) 

        if(validation) {
            alert(` 
                    email: ${this.state.email}
                    jurusan: ${this.state.password}
                    alamat: ${this.state.alamat}
                    name: ${this.state.name}
                `);
            }
    }

    render(){
        const style = {
            width: '900px',
            margin: '20px auto 0',
            border: '2px solid black',
            padding: '10px',
            paddingBottom: '35px'
        }
        return(
            <div style={style}>
                {
                    this.state.errors && <ShowErrors errors={this.state.errors} />
                }
                <h4>Form Registrasi</h4>
                <form onSubmit={this.handleSubmit}>
                    <Input type="name" name="name" label="Name" 
                    onChange={value => this.setState({name: value})} />
                    <Input type="alamat" name="alamat" label="Alamat" 
                    onChange={value => this.setState({alamat: value})} />
                    <Input type="email" name="email" label="Email" 
                    onChange={value => this.setState({email: value})} />
                    <Input type="password" name="password" label="Password" 
                    onChange={value => this.setState({password: value})} />
                    <br />
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}

export default Validation;