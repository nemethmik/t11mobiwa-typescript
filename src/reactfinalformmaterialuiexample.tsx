import * as React from 'react'
import { render } from 'react-dom'
import { Form, Field } from 'react-final-form'
import {TextField, Checkbox, Radio, Input, Select} from 'final-form-material-ui';
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import {FieldRenderProps} from 'react-final-form'

const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms))
const onSubmit = async (values:any) => {
  await sleep(300)
  window.alert(JSON.stringify(values, null, 2))
}
const validate = (values:any) => {
  const errors:any = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  }
  if (!values.lastName) {
    errors.lastName = 'Required'
  }
  if (!values.email) {
    errors.email = 'Required'
  }
  return errors
}

export const ReactFinalFormMaterialUIApp = () => (
  <>
    <h1>🏁 React Final Form</h1>
    <h2>Material UI Example</h2>
    <a href="https://github.com/erikras/react-final-form#-react-final-form">Read Docs</a>
    <p>This example demonstrates using{' '}
      <a href="https://material-ui.com/api/form-control/#formcontrol">Material UI</a> form controls.
    </p>
    <Form
      onSubmit={onSubmit}
      initialValues={{ employed: true, stooge: 'larry', someData:'' }}
      validate={validate}
      render={({ handleSubmit, reset, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name</label>
            <Field name="firstName" component={TextField} type="text" label="First Name"/>
          </div>
          <div>
            <label>Last Name</label>
            <Field name="lastName" component={TextField} type="text" label="Last Name"/>
          </div>
          <div>
            <label>Email</label>
            <Field name="email"  component={TextField} type="email" label="Email" />
          </div>
          <div>
            <label>Employed?</label>
            <Field name="employed" component={Checkbox} type="checkbox" />
          </div>
          <div>
            <label>Best Stooge?</label>
            <div>
              <label>
                <Field  name="stooge"  component={Radio} type="radio" value="larry"/>{' '} Larry
              </label>
              <label>
                <Field name="stooge"  component={Radio} type="radio" value="moe" />{' '} Moe
              </label>
              <label>
                <Field name="stooge" component={Radio} type="radio" value="curly"/>{' '} Curly
              </label>
            </div>
          </div>
          <div>
            <label>Sauces</label>
            <div>
              <label>
                <Field name="sauces" component={Checkbox} type="checkbox" value="ketchup"/>{' '} Ketchup
              </label>
              <label>
                <Field name="sauces" component={Checkbox}type="checkbox" value="mustard"/>{' '} Mustard
              </label>
              <label>
                <Field name="sauces" component={Checkbox} type="checkbox" value="salsa"/>{' '} Salsa
              </label>
              <label>
                <Field name="sauces" component={Checkbox} type="checkbox" value="guacamole"/>{' '}
                Guacamole 🥑
              </label>
            </div>
          </div>
          <div>
            <label>Notes</label><Field name="notes" component={TextField} multiline label="Notes"/>
          </div>
          <div>
            <label>Password</label>
            <Field name="password" component={Input} className="input" type="password"
              placeholder="Password" endAdornment={<InputAdornment position="end">
                  <a href="/forgot">Forgot password?</a>
                </InputAdornment>
                }
            />
          </div>
          <div>
            <Field name="city" label="Select a City" component={Select as any} formControlProps={{fullWidth:true}}>
                <MenuItem value="London">London</MenuItem>
                <MenuItem value="Paris">Paris</MenuItem>
            </Field>
          </div>
          <div className="buttons">
            <button type="submit" disabled={submitting || pristine}>Submit</button>
            <button type="button" onClick={reset} disabled={submitting || pristine}>Reset</button>
          </div>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </form>
      )}
    />
  </>
)

