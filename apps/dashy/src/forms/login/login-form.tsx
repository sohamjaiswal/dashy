import { Form, SubmitInput, TextInput, Typography } from '@dashy/dashy-components'
import React, { useState } from 'react'
import { login } from '../../services/login.service';
import { ILoginForm } from './login-form.types';
import { SyntheticEvent } from 'react';

export const LoginForm = ({heading, eMail, password, submit}: ILoginForm) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const res = await login(email, pass)
    console.log(res)
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Typography label={heading} weight={900} size={4} />
      <TextInput required label={email} onChange={setEmail} placeholder={ eMail } maxLength={50} />
      <TextInput required label={pass} onChange={setPass} placeholder={password} maxLength={50} type={'password'} />
      <SubmitInput button={{typography: {label: submit}, onClick: () => null}} />
    </Form>
  )
}
