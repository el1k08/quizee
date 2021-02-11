import React from 'react';
import classes from './Auth.module.scss'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
import UserService from '../../Services/UserService'

class Auth extends React.Component {
  
  state = { 
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        error: 'Введите коректный email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        error: 'Введите коректный password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
   }

  loginHandler = async () => {
    try {

      const authData = {
        email: this.state.formControls.email.value,
        password: this.state.formControls.email.value,
        returnSecureToken: true
      }
  
      const { data } = await UserService.signInUser(authData)
      console.log('Response data: ',data)
    } catch(e) {
      console.log(e)
    }
  }

  registerHandler = async () => {

    try {

      const authData = {
        email: this.state.formControls.email.value,
        password: this.state.formControls.email.value,
        returnSecureToken: true
      }
  
      const { data } = await UserService.signUpUser(authData)
      console.log('Response data: ',data)
    } catch(e) {
      console.log(e)
    }
  }

  submitHandler = event => {
    event.preventDefault()
  }

  onChangeHandler = (event, controlName) => {
    const formControls = {...this.state.formControls}
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control
    
    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls,
      isFormValid
    })
  }

  validateControl(value, validation) {
    if(!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
      isValid = is.above(value.length, validation.minLength)  && isValid
    }

    return isValid
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Input 
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          error={control.error}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  render() { 
    return ( 
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            
            { this.renderInputs() }

            <Button 
              type="success" 
              onClick={this.loginHandler} 
              disabled={!this.state.isFormValid}
            >Войти</Button>
            <Button 
              type="primary" 
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >Регистрация</Button>
          </form>
        </div>
      </div>
     );
  }
}
 
export default Auth;