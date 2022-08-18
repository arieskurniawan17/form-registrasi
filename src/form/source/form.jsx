import React from "react";
import * as Validator from 'validatorjs';

const Input = ({label, type, name, onChange}) => {
    return (
        <div>
        <label>
            {label}:
        </label>
        <br />
        <input type={type} name={name} onChange={e => onChange(e.target.value)} />
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
        nama: '',
        alamat: '',
        email: '',
        password: '',
        errors: []
    }

    handleSubmit = event => {
        event.preventDefault();
        const {nama,alamat,email,password} = this.state;

        //pake validator js

        const data = {nama,alamat,email,password};

        const rules = {
        nama: 'min:3|required',
        alamat: 'min:8|required',
        email: 'required|email',
        password: 'min:8|required',
        };

        const validation = new Validator(data,rules);
        validation.passes();
        this.setState({
            errors: [
                ...validation.errors.get('nama'),
                ...validation.errors.get('alamat'),
                ...validation.errors.get('email'),
                ...validation.errors.get('password'),
            ]
        }) 

        if(validation) {
            alert(` 
                    nama: ${this.state.nama}
                    alamat: ${this.state.alamat}
                    email: ${this.state.email}
                    jurusan: ${this.state.password} 
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
                    <Input type="nama" name="nama" label="Nama" 
                    onChange={value => this.setState({nama: value})} />
                    <Input type="alamat" name="alamat" label="Alamat" 
                    onChange={value => this.setState({alamat: value})} />
                    <Input type="email" name="email" label="Email" 
                    onChange={value => this.setState({email: value})} />
                    <Input type="password" name="password" label="Password" 
                    onChange={value => this.setState({password: value})} />
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Validation;