import React, { FC } from 'react';
import * as Yup from 'yup';
import MainButton from '../MainButton';
import { Formik, FormikProps, FormikValues } from 'formik';
import {
  ButtonWrapper,
  ErrorMessage,
  FormInput,
  FormLabel,
  FormTextArea,
  RadioOptions,
  StyledPaymentForm,
} from './styles';

type PaymentFormProps = {
  onClickSubmitAction: (values: any) => void
}

const PaymentForm: FC<PaymentFormProps> = (props) => {

  const { onClickSubmitAction } = props;

  const formSchema: any = Yup.object().shape({
    email: Yup.string()
      .email('No valid email')
      .required('Required'),
    name: Yup.string()
      .required('Required'),
    lastname: Yup.string()
      .required('Required'),
    address: Yup.string()
      .required('Required'),
  })

  const paymentMethod: object = {
    '0': 'Credit Card',
    '1': 'Crypto'
  }

  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        lastname: '',
        address: '',
        paymentMethod: paymentMethod[0]
      }}

      validationSchema={formSchema}

      onSubmit={onClickSubmitAction}
    >
    {({
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit
    }: FormikProps<FormikValues>) => (
      <StyledPaymentForm autoComplete="off">
        <div>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <FormInput id="email"
            name="email"
            type="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            isNoValid={touched.email && !!errors.email}
            isValid={!!values.email && !errors.email}
          />
          {touched.email
          && errors.email
          && <ErrorMessage>{errors.email}</ErrorMessage>}
        </div>

        <div>
          <FormLabel htmlFor="name">Name:</FormLabel>
          <FormInput id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            isNoValid={touched.name && !!errors.name}
            isValid={!!values.name && !errors.name}
            // enable only if previous field is valid
            disabled={!values.email || !!errors.email}
          />
          {touched.name
          && errors.name
          && <ErrorMessage>{errors.name}</ErrorMessage>}
        </div>

        <div>
          <FormLabel htmlFor="lastname">Lastname:</FormLabel>
          <FormInput id="lastname"
            name="lastname"
            type="text"
            value={values.lastname}
            onChange={handleChange}
            onBlur={handleBlur}
            isNoValid={touched.lastname && !!errors.lastname}
            isValid={!!values.lastname && !errors.lastname}
            // enable only if previous field is valid
            disabled={!values.name || !!errors.name}
          />
          {touched.lastname
          && errors.lastname
          && <ErrorMessage>{errors.lastname}</ErrorMessage>}
        </div>

        <div>
          <FormLabel htmlFor="address">Address:</FormLabel>
          <FormTextArea id="address"
            name="address"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            isNoValid={touched.address && !!errors.address}
            isValid={!!values.address && !errors.address}
            // enable only if previous field is valid
            disabled={!values.lastname || !!errors.lastname}
          />
          {touched.address
          && errors.address
          && <ErrorMessage>{errors.address}</ErrorMessage>}
        </div>

        <div>
          <FormLabel>Payment Method:</FormLabel>
          <RadioOptions>
            <FormLabel>
              <input name="paymentMethod"
                type="radio"
                value={paymentMethod[0]}
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.paymentMethod === paymentMethod[0]}
                disabled={!values.address || !!errors.address}
              />
              {` ${paymentMethod[0]}`}
            </FormLabel>

            <FormLabel>
              <input name="paymentMethod"
                type="radio"
                value={paymentMethod[1]}
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.paymentMethod === paymentMethod[1]}
                disabled={!values.address || !!errors.address}
              />
              {` ${paymentMethod[1]}`}
            </FormLabel>
          </RadioOptions>
        </div>

        <ButtonWrapper>
          <MainButton
            type="button"
            onClickAction={handleSubmit}
            // enable only if previous field is valid
            disabled={!values.address || !!errors.address}
          >
            PAY
          </MainButton>
        </ButtonWrapper>
      </StyledPaymentForm>
    )}
    </Formik>
  )
}

export default PaymentForm;