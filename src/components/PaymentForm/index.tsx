import { Formik, FormikProps, FormikValues } from 'formik';
import * as Yup from 'yup';
import { Button } from '#components/Button';

type Props = {
  onClickSubmitAction: (values: any) => void
}

export function PaymentForm ({ onClickSubmitAction }: Props) {

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
  });

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
      <form className="grid gap-y-[14px]"
        autoComplete="off"
      >
        <div>
          <label>
            <span className="block leading-[28px] cursor-pointer">Email:</span>
            <input className="inline-block
                w-full leading-[32px] px-[12px]
                text-[var(--color-black-1)] rounded-[6px]
                border-solid border-[1px] border-[var(--color-black-1)]
                bg-[var(--color-white-2)] overflow-hidden
                outline-none

                disabled:cursor-not-allowed
                disabled:bg-[var(--color-gray)]
                disabled:opacity-50
              "
              name="email"
              type="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              // isNoValid={touched.email && !!errors.email}
              // isValid={!!values.email && !errors.email}
            />
          </label>
          
          {touched.email
          && errors.email
          && <p className="mt-[6px] text-[12px] text-[var(--color-red)]">{`${errors.email}`}</p>}
        </div>

        <div>
          <label>
            <span className="block leading-[28px] cursor-pointer">Name:</span>
            <input className="inline-block
                w-full leading-[32px] px-[12px]
                text-[var(--color-black-1)] rounded-[6px]
                border-solid border-[1px] border-[var(--color-black-1)]
                bg-[var(--color-white-2)] overflow-hidden
                outline-none

                disabled:cursor-not-allowed
                disabled:bg-[var(--color-gray)]
                disabled:opacity-50
              "
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              // isNoValid={touched.name && !!errors.name}
              // isValid={!!values.name && !errors.name}
              // enable only if previous field is valid
              disabled={!values.email || !!errors.email}
            />
          </label>
          
          {touched.name
          && errors.name
          && <p className="mt-[6px] text-[12px] text-[var(--color-red)]">{`${errors.name}`}</p>}
        </div>

        <div>
          <label>
            <span className="block leading-[28px] cursor-pointer">Lastname:</span>
            <input className="inline-block
                w-full leading-[32px] px-[12px]
                text-[var(--color-black-1)] rounded-[6px]
                border-solid border-[1px] border-[var(--color-black-1)]
                bg-[var(--color-white-2)] overflow-hidden
                outline-none

                disabled:cursor-not-allowed
                disabled:bg-[var(--color-gray)]
                disabled:opacity-50
              "
              name="lastname"
              type="text"
              value={values.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
              // isNoValid={touched.lastname && !!errors.lastname}
              // isValid={!!values.lastname && !errors.lastname}
              // enable only if previous field is valid
              disabled={!values.name || !!errors.name}
            />
          </label>
          {touched.lastname
          && errors.lastname
          && <p className="mt-[6px] text-[12px] text-[var(--color-red)]">{`${errors.lastname}`}</p>}
        </div>

        <div>
          <label>
            <span className="block leading-[28px] cursor-pointer">Address:</span>
            <textarea className="inline-block
                min-w-full max-w-full leading-[32px] px-[12px]
                text-[var(--color-black-1)] rounded-[6px]
                border-solid border-[1px] border-[var(--color-black-1)]
                bg-[var(--color-white-2)] overflow-hidden
                outline-none

                disabled:cursor-not-allowed
                disabled:bg-[var(--color-gray)]
                disabled:opacity-50
              "
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              // isNoValid={touched.address && !!errors.address}
              // isValid={!!values.address && !errors.address}
              // enable only if previous field is valid
              disabled={!values.lastname || !!errors.lastname}
            />
          </label>
          {touched.address
          && errors.address
          && <p className="mt-[6px] text-[12px] text-[var(--color-red)]">{`${errors.address}`}</p>}
        </div>

        <div>
          <label className="block leading-[28px]">Payment Method:</label>
          <div className="flex justify-start gap-x-[28px]">
            <label className="leading-[28px]">
              <input name="paymentMethod"
                type="radio"
                value={paymentMethod[0]}
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.paymentMethod === paymentMethod[0]}
                disabled={!values.address || !!errors.address}
              />
              {` ${paymentMethod[0]}`}
            </label>

            <label className="leading-[28px]">
              <input name="paymentMethod"
                type="radio"
                value={paymentMethod[1]}
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.paymentMethod === paymentMethod[1]}
                disabled={!values.address || !!errors.address}
              />
              {` ${paymentMethod[1]}`}

            </label>
          </div>
        </div>

        <Button className="w-full"
          onClick={() => handleSubmit()}
          // enable only if previous field is valid
          disabled={!values.address || !!errors.address}
        >
          PAY
        </Button>
      </form>
    )}
    </Formik>
  );
}